# ============================================================
# PackCheck - FastAPI wrapper around the compliance engine
# ============================================================

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict

from applicability import determine_applicability
from checker import check_product, get_overall_status
from product_data import product as stub_product

app = FastAPI(title="PackCheck Compliance Engine")


# ============================================================
# Request contracts
# ============================================================

class ComplianceRequest(BaseModel):
    product: Dict[str, Any]


class OcrRequest(BaseModel):
    ocr_data: Dict[str, Any]


# ============================================================
# Adapter: Gemini OCR schema -> flat compliance-engine schema
# ============================================================
#
# OCR (ocr_extraction.py) returns nested objects like:
#   { "mrp_details": { "raw_text": "...", "confidence": 0.9, "detected": true } }
#
# checker.py / applicability.py expect the flat shape used in
# product_data.py:
#   { "mrp": { "value": "...", "confidence": 0.9, "detected": true,
#              "field_visibility": "clear" } }
#
# This function bridges the two so nothing in applicability.py
# or checker.py has to change.

def _field(entity: dict, value_key: str = "raw_text") -> dict:
    if not entity:
        return {"value": None, "confidence": None, "detected": False, "field_visibility": "uncertain"}

    detected = entity.get("detected", False)
    return {
        "value": entity.get(value_key),
        "confidence": entity.get("confidence"),
        "detected": detected,
        "field_visibility": "clear" if detected else "uncertain"
    }


def map_ocr_to_product(ocr_data: dict) -> dict:
    net_qty = ocr_data.get("net_quantity", {}) or {}
    mrp = ocr_data.get("mrp_details", {}) or {}
    manufacture_date = (
        ocr_data.get("date_of_manufacture_or_pack", {}) or {}
    )
    manufacturer = ocr_data.get("manufacturer", {}) or {}
    consumer_care = ocr_data.get("consumer_care", {}) or {}

    # --------------------------------------------------------
    # Consumer care information
    # --------------------------------------------------------

    phone = consumer_care.get("phone", {}) or {}
    email = consumer_care.get("email", {}) or {}

    consumer_contact_parts = []

    if phone.get("detected") and phone.get("raw_text"):
        consumer_contact_parts.append(
            f"Phone: {phone['raw_text']}"
        )

    if email.get("detected") and email.get("raw_text"):
        consumer_contact_parts.append(
            f"Email: {email['raw_text']}"
        )

    consumer_contact_value = (
        ", ".join(consumer_contact_parts)
        if consumer_contact_parts
        else None
    )

    consumer_contact_confidences = [
        item.get("confidence")
        for item in (phone, email)
        if item.get("detected")
        and isinstance(item.get("confidence"), (int, float))
    ]

    consumer_contact_confidence = (
        min(consumer_contact_confidences)
        if consumer_contact_confidences
        else None
    )

    # --------------------------------------------------------
    # Date
    # --------------------------------------------------------

    date_value = manufacture_date.get("raw_text")

    # --------------------------------------------------------
    # Product object used by applicability + checker
    # --------------------------------------------------------

    product = {
        "product_name": _field(
            ocr_data.get("product_name")
        ),

        "net_quantity": _field(
            net_qty
        ),

        "mrp": _field(
            mrp
        ),

        "manufacturer": _field(
            manufacturer,
            value_key="name"
        ),

        "packer": _field(
            ocr_data.get("packer"),
            value_key="name"
        ),

        "importer": _field(
            ocr_data.get("importer"),
            value_key="name"
        ),

        # ----------------------------------------------------
        # Rule 6(1)(d)
        # ----------------------------------------------------

        "manufacture_prepack_import_date": _field(
            manufacture_date
        ),

        # ----------------------------------------------------
        # Rule 6(2)
        # ----------------------------------------------------

        "consumer_complaint_contact": {
            "value": consumer_contact_value,
            "confidence": consumer_contact_confidence,
            "detected": bool(consumer_contact_parts),
            "field_visibility": (
                "clear"
                if consumer_contact_parts
                else "uncertain"
            )
        },

        # ----------------------------------------------------
        # Rule 12
        # ----------------------------------------------------

        "quantity_unit": _field(
            net_qty,
            value_key="unit"
        ),

        # ----------------------------------------------------
        # Rule 13
        #
        # The OCR gives us the declared unit, e.g. "g".
        # The rule engine can then verify whether the
        # declared unit is present.
        # ----------------------------------------------------

        "unit_format": _field(
            net_qty,
            value_key="unit"
        ),

        # ----------------------------------------------------
        # Additional OCR information
        # These are preserved for the frontend/report.
        # ----------------------------------------------------

        "country_of_origin": _field(
            ocr_data.get("country_of_origin")
        ),

        "manufacturer_address": manufacturer.get(
            "address"
        ),

        "manufacturer_pincode": manufacturer.get(
            "pincode"
        ),

        "unit_sale_price": mrp.get(
            "unit_sale_price_raw"
        ),

        # ----------------------------------------------------
        # Context fields
        # ----------------------------------------------------

        "commodity_type": "packaged_commodity",
        "intended_sale": "retail",
        "consumer_type": "retail",

        "package_quantity": net_qty.get(
            "value"
        ),

        "package_unit": net_qty.get(
            "unit"
        ),

        "dimensions_relevant": False,
        "multi_product_package": False,
        "outside_wrapper_present": False,
        "package_kept_offered_exposed_or_sold": True,

        "quantity_declared": bool(
            net_qty.get("detected", False)
        ),

        "specified_textile_commodity": False,
        "sheet_type_commodity": False,
        "container_type_commodity": False,
        "dimensions_or_weight_related_to_price": False,
        "wholesale_package": False,
        "export_package_sold_in_india": False,
        "advertisement_mentions_retail_sale_price": False,

        # Gemini currently doesn't provide image quality.
        "image_quality": 0.9
    }

    return product
# ============================================================
# Core pipeline
# ============================================================

def build_compliance_result(product, applicability_result, results, overall_status):
    product_result = {
    "product_name": product["product_name"]["value"],
    "net_quantity": product["net_quantity"]["value"],
    "mrp": product["mrp"]["value"],
    "manufacturer": product["manufacturer"]["value"],

    "manufacture_date": product[
        "manufacture_prepack_import_date"
    ]["value"],

    "country_of_origin": product[
        "country_of_origin"
    ]["value"],

    "manufacturer_address": product[
        "manufacturer_address"
    ],

    "manufacturer_pincode": product[
        "manufacturer_pincode"
    ],

    "consumer_complaint_contact": product[
        "consumer_complaint_contact"
    ]["value"],

    "unit_sale_price": product[
        "unit_sale_price"
    ],

    "quantity_unit": product[
        "quantity_unit"
    ]["value"],

    "unit_format": product[
        "unit_format"
    ]["value"]
}

    summary = {
        "total_rules": len(results),
        "passed": sum(1 for r in results if r["status"] == "PASS"),
        "failed": sum(1 for r in results if r["status"] == "FAIL"),
        "needs_verification": sum(1 for r in results if r["status"] == "NEEDS_VERIFICATION")
    }

    return {
        "product": product_result,
        "applicability": {
            "status": applicability_result["status"],
            "reason": applicability_result["reason"]
        },
        "overall_status": overall_status,
        "summary": summary,
        "rule_results": results
    }


def run_compliance_check(product: dict) -> dict:
    applicability_result = determine_applicability(product)

    if applicability_result["status"] in ("NOT_APPLICABLE", "NEEDS_VERIFICATION"):
        return {
            "product": {
                "product_name": product.get("product_name", {}).get("value"),
                "net_quantity": product.get("net_quantity", {}).get("value"),
                "mrp": product.get("mrp", {}).get("value"),
                "manufacturer": product.get("manufacturer", {}).get("value"),
            },
            "applicability": applicability_result,
            "overall_status": applicability_result["status"],
            "summary": {"total_rules": 0, "passed": 0, "failed": 0, "needs_verification": 0},
            "rule_results": []
        }

    results = check_product(product, applicability_result)
    overall_status = get_overall_status(results)
    return build_compliance_result(product, applicability_result, results, overall_status)


# ============================================================
# Endpoints
# ============================================================

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/check")
def check(payload: ComplianceRequest):
    """Takes the flat product_data.py-shaped dict directly."""
    return run_compliance_check(payload.product)


@app.post("/check/from-ocr")
def check_from_ocr(payload: OcrRequest):
    """Takes raw Gemini OCR output and adapts it before running the pipeline."""
    product = map_ocr_to_product(payload.ocr_data)
    return run_compliance_check(product)


@app.get("/check/stub")
def check_stub():
    """Test endpoint using the hardcoded product_data.py stub."""
    return run_compliance_check(stub_product)