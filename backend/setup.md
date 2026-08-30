# schema table layout 



```sql

CREATE DATABASE IF NOT EXISTS compliance_scanner;
USE compliance_scanner;

-- =========================================
-- PRODUCTS
-- =========================================
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    category VARCHAR(100),
    manufacturer VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SCANS  (image_url lives here)
-- =========================================
CREATE TABLE IF NOT EXISTS scans (
    scan_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    image_url VARCHAR(500) NOT NULL,

    applicability_status VARCHAR(50),
    applicability_reason TEXT,

    overall_status VARCHAR(50),

    total_rules INT DEFAULT 0,
    passed INT DEFAULT 0,
    failed INT DEFAULT 0,
    needs_verification INT DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- =========================================
-- EXTRACTED INFORMATION (per OCR field)
-- =========================================
CREATE TABLE IF NOT EXISTS extracted_information (
    extracted_id INT AUTO_INCREMENT PRIMARY KEY,
    scan_id INT NOT NULL,
    field VARCHAR(100) NOT NULL,
    value TEXT,
    confidence DECIMAL(5,2),
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id)
);

-- =========================================
-- COMPLIANCE RESULTS (per rule checked)
-- =========================================
CREATE TABLE IF NOT EXISTS compliance_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    scan_id INT NOT NULL,
    rule_id VARCHAR(20) NOT NULL,
    rule_number VARCHAR(100),
    status VARCHAR(50),
    value TEXT,
    confidence DECIMAL(5,2),
    reason TEXT,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id)
);

```