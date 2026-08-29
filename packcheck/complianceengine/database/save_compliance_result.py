import json
import mysql.connector
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

RESULT_FILE = (
    BASE_DIR
    / "compliance_result.json"
)


def get_connection():

    return mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="27062007",
        database="packcheck"
    )


def load_result():

    with open(RESULT_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_result():

    data = load_result()

    product = data["product"]
    applicability = data["applicability"]
    summary = data["summary"]

    connection = get_connection()
    cursor = connection.cursor()

    # ------------------------------------------------
    # 1. INSERT PRODUCT
    # ------------------------------------------------

    product_query = """
        INSERT INTO products (
            product_name,
            category,
            manufacturer
        )
        VALUES (%s, %s, %s)
    """

    cursor.execute(
        product_query,
        (
            product.get("product_name"),
            "packaged_commodity",
            product.get("manufacturer")
        )
    )

    product_id = cursor.lastrowid

    # ------------------------------------------------
    # 2. INSERT SCAN
    # ------------------------------------------------

    scan_query = """
        INSERT INTO scans (
            product_id,
            applicability_status,
            applicability_reason,
            overall_status,
            total_rules,
            passed,
            failed,
            needs_verification
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(
        scan_query,
        (
            product_id,
            applicability.get("status"),
            applicability.get("reason"),
            data.get("overall_status"),
            summary.get("total_rules"),
            summary.get("passed"),
            summary.get("failed"),
            summary.get("needs_verification")
        )
    )

    scan_id = cursor.lastrowid

    # ------------------------------------------------
    # 3. INSERT EXTRACTED INFORMATION
    # ------------------------------------------------

    extracted_fields = [
        "product_name",
        "net_quantity",
        "mrp",
        "manufacturer"
    ]

    extracted_query = """
        INSERT INTO extracted_information (
            scan_id,
            field,
            value,
            confidence
        )
        VALUES (%s, %s, %s, %s)
    """

    for field in extracted_fields:

        value = product.get(field)

        confidence = None

        for result in data.get("rule_results", []):

            if result.get("field") == field:
                confidence = result.get("confidence")
                break

        cursor.execute(
            extracted_query,
            (
                scan_id,
                field,
                value,
                confidence
            )
        )

    # ------------------------------------------------
    # 4. INSERT COMPLIANCE RESULTS
    # ------------------------------------------------

    compliance_query = """
        INSERT INTO compliance_results (
            scan_id,
            rule_id,
            status,
            value,
            confidence,
            reason
        )
        VALUES (%s, %s, %s, %s, %s, %s)
    """

    for result in data.get("rule_results", []):

        cursor.execute(
            compliance_query,
            (
                scan_id,
                result.get("rule_id"),
                result.get("status"),
                result.get("value"),
                result.get("confidence"),
                result.get("reason")
            )
        )

    connection.commit()

    print("Compliance result saved successfully!")
    print("Product ID:", product_id)
    print("Scan ID:", scan_id)

    cursor.close()
    connection.close()


if __name__ == "__main__":
    save_result()