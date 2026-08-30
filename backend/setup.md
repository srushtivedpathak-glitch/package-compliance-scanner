# schema table layout 

1. scans table :

```sql

CREATE TABLE scans (
    scan_id INT AUTO_INCREMENT PRIMARY KEY,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

```