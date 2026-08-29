# ============================================================
# PackCheck - Compliance Checker
# ============================================================

import json
import re
from pathlib import Path


# ============================================================
# Rules file
# ============================================================

RULES_FILE = (
    Path(__file__).parent
    / "rules"
    / "rules.json"
)


# ============================================================
# Thresholds
# ============================================================

IMAGE_QUALITY_THRESHOLD = 0.60

OCR_CONFIDENCE_THRESHOLD = 0.60


# ============================================================
# Load rules
# ============================================================

def load_rules():

    with open(
        RULES_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


# ============================================================
# Get field information
# ============================================================

def get_field_info(
    product,
    field
):

    value = product.get(field)

    # --------------------------------------------------------
    # OCR object
    # --------------------------------------------------------

    if isinstance(value, dict):

        return {
            "value": value.get("value"),
            "confidence": value.get("confidence"),
            "detected": value.get("detected"),
            "field_visibility": value.get(
                "field_visibility",
                "uncertain"
            )
        }


    # --------------------------------------------------------
    # Simple value
    # --------------------------------------------------------

    if value is not None:

        return {
            "value": value,
            "confidence": 1.0,
            "detected": True,
            "field_visibility": "clear"
        }


    # --------------------------------------------------------
    # Missing
    # --------------------------------------------------------

    return {
        "value": None,
        "confidence": None,
        "detected": False,
        "field_visibility": "uncertain"
    }


# ============================================================
# Check image quality
# ============================================================

def image_is_reliable(product):

    quality = product.get(
        "image_quality"
    )

    if quality is None:

        return False

    try:

        return float(quality) >= (
            IMAGE_QUALITY_THRESHOLD
        )

    except (
        TypeError,
        ValueError
    ):

        return False


# ============================================================
# Check evidence reliability
# ============================================================

def evidence_is_reliable(
    product,
    field_info
):

    # Image
    if not image_is_reliable(product):

        return False


    # Visibility
    if field_info[
        "field_visibility"
    ] == "uncertain":

        return False


    # Confidence
    confidence = field_info[
        "confidence"
    ]

    if confidence is not None:

        try:

            if float(confidence) < (
                OCR_CONFIDENCE_THRESHOLD
            ):

                return False

        except (
            TypeError,
            ValueError
        ):

            return False


    return True


# ============================================================
# Validate MRP
# ============================================================

def validate_mrp(value):

    if value is None:

        return False

    text = str(value).strip()

    if not text:

        return False


    # OCR uncertainty
    if "?" in text:

        return False

    if "..." in text:

        return False


    # Examples:
    #
    # ₹50
    # ₹50.00
    # Rs 50
    # Rs. 50
    # INR 50

    pattern = (
        r"(₹|Rs\.?|INR)?\s*"
        r"\d+(?:\.\d{1,2})?"
    )

    return bool(
        re.fullmatch(
            pattern,
            text,
            flags=re.IGNORECASE
        )
    )


# ============================================================
# Validate generic field
# ============================================================

def validate_field(
    field,
    value
):

    if value is None:

        return False


    text = str(value).strip()

    if not text:

        return False


    if field == "mrp":

        return validate_mrp(value)


    return True


# ============================================================
# Check one rule
# ============================================================

def check_rule(
    product,
    rule
):

    field = rule.get(
        "field"
    )

    field_info = get_field_info(
        product,
        field
    )

    value = field_info[
        "value"
    ]

    confidence = field_info[
        "confidence"
    ]

    detected = field_info[
        "detected"
    ]

    visibility = field_info[
        "field_visibility"
    ]


    # ========================================================
    # STEP 1
    # Evidence is unreliable
    # ========================================================

    if not evidence_is_reliable(
        product,
        field_info
    ):

        return {
            "rule_id": rule["rule_id"],
            "rule_number": rule["rule_number"],
            "field": field,
            "status": "NEEDS_VERIFICATION",
            "value": value,
            "confidence": confidence,
            "reason": (
                "Image/OCR evidence is insufficient "
                "to reliably determine compliance."
            )
        }


    # ========================================================
    # STEP 2
    # Information detected
    # ========================================================

    if detected is True:

        if validate_field(
            field,
            value
        ):

            return {
                "rule_id": rule["rule_id"],
                "rule_number": rule["rule_number"],
                "field": field,
                "status": "PASS",
                "value": value,
                "confidence": confidence,
                "reason": (
                    "Required information was clearly "
                    "detected and passed validation."
                )
            }


        return {
            "rule_id": rule["rule_id"],
            "rule_number": rule["rule_number"],
            "field": field,
            "status": "NEEDS_VERIFICATION",
            "value": value,
            "confidence": confidence,
            "reason": (
                "Information was detected, but the "
                "value could not be reliably validated."
            )
        }


    # ========================================================
    # STEP 3
    # Information definitely absent
    # ========================================================

    if detected is False:

        # Only treat as definite absence if the
        # field was actually visible/clear.

        if visibility == "clear":

            return {
                "rule_id": rule["rule_id"],
                "rule_number": rule["rule_number"],
                "field": field,
                "status": "FAIL",
                "value": None,
                "confidence": confidence,
                "reason": (
                    "The required information was "
                    "clearly absent from the visible label."
                )
            }


    # ========================================================
    # STEP 4
    # Unknown situation
    # ========================================================

    return {
        "rule_id": rule["rule_id"],
        "rule_number": rule["rule_number"],
        "field": field,
        "status": "NEEDS_VERIFICATION",
        "value": value,
        "confidence": confidence,
        "reason": (
            "Available evidence is insufficient "
            "to determine compliance."
        )
    }


# ============================================================
# Check applicable rules
# ============================================================

def check_product(
    product,
    applicability_result
):

    rules_data = load_rules()

    results = []


    applicable_rule_ids = (
        applicability_result.get(
            "applicable_rule_ids",
            []
        )
    )


    for rule in rules_data.get(
        "rules",
        []
    ):

        if rule["rule_id"] in (
            applicable_rule_ids
        ):

            result = check_rule(
                product,
                rule
            )

            results.append(
                result
            )


    return results


# ============================================================
# Overall result
# ============================================================

def get_overall_status(results):

    # --------------------------------------------------------
    # FAIL has highest priority
    # --------------------------------------------------------

    for result in results:

        if result["status"] == "FAIL":

            return "FAIL"


    # --------------------------------------------------------
    # Verification second
    # --------------------------------------------------------

    for result in results:

        if result["status"] == (
            "NEEDS_VERIFICATION"
        ):

            return "NEEDS_VERIFICATION"


    # --------------------------------------------------------
    # Everything passed
    # --------------------------------------------------------

    if results:

        return "PASS"


    return "NEEDS_VERIFICATION"