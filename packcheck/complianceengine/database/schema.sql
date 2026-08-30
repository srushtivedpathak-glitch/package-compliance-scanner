CREATE DATABASE IF NOT EXISTS packcheck;

USE packcheck;


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
-- SCANS
-- =========================================

CREATE TABLE IF NOT EXISTS scans (
    scan_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,

    applicability_status VARCHAR(50),
    applicability_reason TEXT,

    overall_status VARCHAR(50),

    total_rules INT DEFAULT 0,
    passed INT DEFAULT 0,
    failed INT DEFAULT 0,
    needs_verification INT DEFAULT 0,

    scan_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
);


-- =========================================
-- EXTRACTED INFORMATION
-- =========================================

CREATE TABLE IF NOT EXISTS extracted_information (
    extracted_id INT AUTO_INCREMENT PRIMARY KEY,

    scan_id INT NOT NULL,

    field VARCHAR(100) NOT NULL,
    value TEXT,
    confidence DECIMAL(5,2),

    FOREIGN KEY (scan_id)
        REFERENCES scans(scan_id)
);


-- =========================================
-- RULES
-- =========================================

CREATE TABLE IF NOT EXISTS rules (
    rule_id VARCHAR(20) PRIMARY KEY,

    rule_number VARCHAR(100),
    field VARCHAR(100),

    requirement TEXT,

    validation_type VARCHAR(100),

    ocr_detectable VARCHAR(20),
    automatic_check VARCHAR(20),

    failure_condition TEXT,

    verification_required BOOLEAN,

    source VARCHAR(255)
);


-- =========================================
-- RULE APPLICABILITY
-- =========================================

CREATE TABLE IF NOT EXISTS rule_applicability (
    applicability_id INT AUTO_INCREMENT PRIMARY KEY,

    rule_id VARCHAR(20) NOT NULL,

    applicability_type VARCHAR(100),
    trigger_condition VARCHAR(255),

    FOREIGN KEY (rule_id)
        REFERENCES rules(rule_id)
);


-- =========================================
-- COMPLIANCE RESULTS
-- =========================================

CREATE TABLE IF NOT EXISTS compliance_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,

    scan_id INT NOT NULL,
    rule_id VARCHAR(20) NOT NULL,

    status VARCHAR(50),

    value TEXT,
    confidence DECIMAL(5,2),

    reason TEXT,

    FOREIGN KEY (scan_id)
        REFERENCES scans(scan_id),

    FOREIGN KEY (rule_id)
        REFERENCES rules(rule_id)
);