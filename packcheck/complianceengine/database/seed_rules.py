import json
import mysql.connector
from pathlib import Path


# =========================================
# FILE LOCATION
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

RULES_FILE = (
    BASE_DIR
   
    / "rules"
    / "rules.json"
)


# =========================================
# DATABASE CONNECTION
# =========================================

def get_connection():

    return mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="27062007",
        database="packcheck"
    )


# =========================================
# LOAD RULES JSON
# =========================================

def load_rules():

    with open(RULES_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data


# =========================================
# INSERT RULES
# =========================================

def seed_rules():

    data = load_rules()

    rules = data["rules"]

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO rules (
            rule_id,
            rule_number,
            field,
            requirement,
            validation_type,
            ocr_detectable,
            automatic_check,
            failure_condition,
            verification_required,
            source
        )
        VALUES (
            %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s
        )
        ON DUPLICATE KEY UPDATE
            rule_number = VALUES(rule_number),
            field = VALUES(field),
            requirement = VALUES(requirement),
            validation_type = VALUES(validation_type),
            ocr_detectable = VALUES(ocr_detectable),
            automatic_check = VALUES(automatic_check),
            failure_condition = VALUES(failure_condition),
            verification_required = VALUES(verification_required),
            source = VALUES(source)
    """

    for rule in rules:

        values = (
            rule.get("rule_id"),
            rule.get("rule_number"),
            rule.get("field"),
            rule.get("requirement"),
            rule.get("validation_type"),
            str(rule.get("ocr_detectable")),
            rule.get("automatic_check"),
            rule.get("failure_condition"),
            rule.get("verification_required"),
            rule.get("source")
        )

        cursor.execute(query, values)

    connection.commit()

    print(f"{len(rules)} rules inserted/updated successfully.")

    cursor.close()
    connection.close()


# =========================================
# RUN
# =========================================

if __name__ == "__main__":
    seed_rules()