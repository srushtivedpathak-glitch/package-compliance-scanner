import db from "./db.js";

/**
 * Persists one full compliance scan: product, scan row (with image_url),
 * extracted fields, and every rule result. Node-side equivalent of
 * save_compliance_result.py — done here instead of Python since Node
 * owns all DB writes.
 */
export async function saveComplianceScan({ imageUrl, complianceResult }) {
    const { product, applicability, overall_status, summary, rule_results } = complianceResult;

    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // 1. PRODUCTS
        const [productRes] = await conn.query(
            `INSERT INTO products (product_name, category, manufacturer)
             VALUES (?, ?, ?)`,
            [product.product_name, "packaged_commodity", product.manufacturer]
        );
        const productId = productRes.insertId;

        // 2. SCANS (image_url stored here)
        const [scanRes] = await conn.query(
            `INSERT INTO scans
                (product_id, image_url, applicability_status, applicability_reason,
                 overall_status, total_rules, passed, failed, needs_verification)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                productId,
                imageUrl,
                applicability.status,
                applicability.reason,
                overall_status,
                summary.total_rules,
                summary.passed,
                summary.failed,
                summary.needs_verification
            ]
        );
        const scanId = scanRes.insertId;

        // 3. EXTRACTED INFORMATION
        const extractedFields = ["product_name", "net_quantity", "mrp", "manufacturer"];

        for (const field of extractedFields) {
            const value = product[field];
            const matchingRule = rule_results.find(r => r.field === field);
            const confidence = matchingRule ? matchingRule.confidence : null;

            await conn.query(
                `INSERT INTO extracted_information (scan_id, field, value, confidence)
                 VALUES (?, ?, ?, ?)`,
                [scanId, field, value, confidence]
            );
        }

        // 4. COMPLIANCE RESULTS
        for (const result of rule_results) {
            await conn.query(
                `INSERT INTO compliance_results
                    (scan_id, rule_id, rule_number, status, value, confidence, reason)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    scanId,
                    result.rule_id,
                    result.rule_number,
                    result.status,
                    result.value,
                    result.confidence,
                    result.reason
                ]
            );
        }

        await conn.commit();
        return { productId, scanId };

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}