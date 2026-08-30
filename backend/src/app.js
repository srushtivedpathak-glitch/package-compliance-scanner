import express from "express";
import multer from "multer";
import uploadFile from "../services/storage.service.js";
import db from "../db/db.js";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
    storage: multer.memoryStorage()
});

app.post("/api/scans", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        console.log(req.file);

        // 1. Upload image to ImageKit
        const result = await uploadFile(req.file.buffer);

        console.log("ImageKit result:", result);

        // 2. Store ImageKit URL in MySQL
        const [dbResult] = await db.query(
            "INSERT INTO scans (image_url) VALUES (?)",
            [result.url]
        );

        console.log("Database result:", dbResult);

        // 3. Send ONE response
        res.status(201).json({
            success: true,
            message: "Image uploaded and URL stored successfully",
            scan_id: dbResult.insertId,
            image_url: result.url
        });

    } catch (error) {
        console.error("Scan error:", error);

        res.status(500).json({
            success: false,
            message: "Scan failed",
            error: error.message
        });
    }
});

export default app;