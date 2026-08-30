import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import cors from "cors";

import uploadFile from "../services/storage.service.js";
import { saveComplianceScan } from "../db/Scan.repository.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

const OCR_ENGINE_URL = process.env.OCR_ENGINE_URL || "http://localhost:8001";
const COMPLIANCE_ENGINE_URL = process.env.COMPLIANCE_ENGINE_URL || "http://localhost:8000";

app.post("/api/scans", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        // 1. Store the image for display later
        const uploadResult = await uploadFile(req.file.buffer);

        // 2. Send the SAME image to the OCR service for extraction
        const ocrForm = new FormData();
        ocrForm.append("file", req.file.buffer, {
            filename: req.file.originalname || "scan.jpg",
            contentType: req.file.mimetype
        });

        const ocrResponse = await axios.post(`${OCR_ENGINE_URL}/extract`, ocrForm, {
            headers: ocrForm.getHeaders()
        });
        const ocrData = ocrResponse.data;

        // 3. Send OCR output to the compliance engine (it adapts the shape internally)
        const complianceResponse = await axios.post(
            `${COMPLIANCE_ENGINE_URL}/check/from-ocr`,
            { ocr_data: ocrData }
        );
        const complianceResult = complianceResponse.data;

        // 4. Persist product + scan + extracted fields + rule results
        const { productId, scanId } = await saveComplianceScan({
            imageUrl: uploadResult.url,
            complianceResult
        });

        // 5. Return everything the frontend needs to display, in one response
        res.status(201).json({
            success: true,
            scan_id: scanId,
            product_id: productId,
            image_url: uploadResult.url,
            product: complianceResult.product,
            applicability: complianceResult.applicability,
            overall_status: complianceResult.overall_status,
            summary: complianceResult.summary,
            rule_results: complianceResult.rule_results
        });

    } catch (error) {
        console.error("Scan error:", error.response?.data || error.message);

        if (error.code === "ECONNREFUSED") {
            return res.status(502).json({
                success: false,
                message: "OCR or compliance engine is not reachable. Check both uvicorn servers are running.",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Scan failed",
            error: error.response?.data || error.message
        });
    }
});

export default app;