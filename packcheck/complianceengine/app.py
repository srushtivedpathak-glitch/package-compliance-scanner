# ============================================================
# PackCheck - FastAPI wrapper around the compliance engine
# ============================================================
#
# This exposes the existing applicability.py + checker.py logic
# over HTTP so Node can call it. No file writes, no DB access —
# pure function in, JSON out. Node owns persistence.
# ============================================================

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, Optional

from applicability import determine_applicability
from checker import check_product, get_overall_status

# For local testing only, until real OCR output replaces it
from product_data import product as stub_product


app = FastAPI(title="PackCheck Compliance Engine")


# ============================================================
# Request / response contract
# ============================================================
#
# Node sends the OCR-extracted product dict in this exact shape
# (same shape as product_data.py). Using Dict[str, Any] here
# because OCR fields are either {value, confidence, detected,
# field_visibility} dicts or plain scalars — see product_data.py.

class ComplianceRequest(BaseModel):
    product: Dict[str, Any]


# ============================================================
# Core logic (lifted straight from main.py, minus print/save)
# ============================================================

def build_compliance_result(product, applicability_result, results, overall_status):
    product_result = {
        "product_name": product["product_name"]["value"],
        "net_quantity": product["net_quantity"]["value"],
        "mrp": product["mrp"]["value"],
        "manufacturer": product["manufacturer"]["value"]
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
    """
    Real endpoint Node will call once OCR is wired in.
    Body: { "product": { ...OCR fields... } }
    """
    return run_compliance_check(payload.product)


@app.get("/check/stub")
def check_stub():
    """
    Test endpoint using the hardcoded product_data.py stub.
    Use this to verify the Node <-> FastAPI pipeline works
    before OCR exists.
    """
    return run_compliance_check(stub_product)