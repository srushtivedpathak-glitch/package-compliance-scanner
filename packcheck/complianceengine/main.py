# ============================================================
# PackCheck - Main
# ============================================================

import json

from product_data import product

from applicability import (
    determine_applicability
)

from checker import (
    check_product,
    get_overall_status
)


# ============================================================
# Build structured compliance output
# ============================================================

def build_compliance_result(
    product,
    applicability_result,
    results,
    overall_status
):

    # --------------------------------------------------------
    # Product information
    # --------------------------------------------------------

    product_result = {
        "product_name": product["product_name"]["value"],
        "net_quantity": product["net_quantity"]["value"],
        "mrp": product["mrp"]["value"],
        "manufacturer": product["manufacturer"]["value"]
    }


    # --------------------------------------------------------
    # Summary
    # --------------------------------------------------------

    summary = {

        "total_rules": len(results),

        "passed": sum(
            1
            for result in results
            if result["status"] == "PASS"
        ),

        "failed": sum(
            1
            for result in results
            if result["status"] == "FAIL"
        ),

        "needs_verification": sum(
            1
            for result in results
            if result["status"] == "NEEDS_VERIFICATION"
        )
    }


    # --------------------------------------------------------
    # Final structured result
    # --------------------------------------------------------

    compliance_result = {

        "product": product_result,

        "applicability": {
            "status": applicability_result["status"],
            "reason": applicability_result["reason"]
        },

        "overall_status": overall_status,

        "summary": summary,

        "rule_results": results
    }


    return compliance_result


# ============================================================
# Save JSON
# ============================================================

def save_compliance_result(
    compliance_result
):

    with open(
        "compliance_result.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            compliance_result,
            file,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# Main
# ============================================================

def main():

    print()
    print("=" * 60)
    print("           PackCheck Compliance Engine")
    print("=" * 60)


    # ========================================================
    # STEP 1 — APPLICABILITY
    # ========================================================

    print()
    print("STEP 1 — APPLICABILITY")
    print("-" * 60)


    applicability_result = (
        determine_applicability(
            product
        )
    )


    print(
        "Status:",
        applicability_result["status"]
    )


    print(
        "Reason:",
        applicability_result["reason"]
    )


    # ========================================================
    # If product is not applicable
    # ========================================================

    if applicability_result[
        "status"
    ] == "NOT_APPLICABLE":

        print()
        print(
            "Product is outside the applicable "
            "scope."
        )

        return


    # ========================================================
    # If applicability is uncertain
    # ========================================================

    if applicability_result[
        "status"
    ] == "NEEDS_VERIFICATION":

        print()
        print(
            "Applicability could not be "
            "reliably determined."
        )

        return


    # ========================================================
    # STEP 2 — APPLICABLE RULES
    # ========================================================

    print()
    print("STEP 2 — APPLICABLE RULES")
    print("-" * 60)


    applicable_rules = (
        applicability_result[
            "applicable_rule_ids"
        ]
    )


    for rule_id in applicable_rules:

        print(
            "✓",
            rule_id
        )


    # ========================================================
    # Rules needing applicability verification
    # ========================================================

    verification_rules = (
        applicability_result.get(
            "verification_rule_ids",
            []
        )
    )


    if verification_rules:

        print()

        print(
            "Rules needing applicability "
            "verification:"
        )

        for rule_id in verification_rules:

            print(
                "⚠",
                rule_id
            )


    # ========================================================
    # STEP 3 — CHECKER
    # ========================================================

    print()
    print("STEP 3 — COMPLIANCE CHECKER")
    print("-" * 60)


    results = check_product(
        product,
        applicability_result
    )


    # ========================================================
    # STEP 4 — OVERALL RESULT
    # ========================================================

    overall_status = (
        get_overall_status(
            results
        )
    )


    print()
    print("=" * 60)
    print(
        "OVERALL RESULT:",
        overall_status
    )
    print("=" * 60)


    # ========================================================
    # Individual results
    # ========================================================

    print()
    print("INDIVIDUAL RULE RESULTS")
    print("-" * 60)


    for result in results:

        print()

        print(
            "Rule:",
            result["rule_number"]
        )

        print(
            "Rule ID:",
            result["rule_id"]
        )

        print(
            "Field:",
            result["field"]
        )

        print(
            "Status:",
            result["status"]
        )

        print(
            "Value:",
            result["value"]
        )

        print(
            "Confidence:",
            result["confidence"]
        )

        print(
            "Reason:",
            result["reason"]
        )

        print("-" * 60)


    # ========================================================
    # STEP 5 — CREATE DATABASE INPUT
    # ========================================================

    compliance_result = build_compliance_result(
        product,
        applicability_result,
        results,
        overall_status
    )


    # ========================================================
    # STEP 6 — SAVE DATABASE INPUT
    # ========================================================

    save_compliance_result(
        compliance_result
    )


    print()
    print("=" * 60)
    print(
        "Compliance result saved to:"
    )
    print(
        "compliance_result.json"
    )
    print("=" * 60)


# ============================================================
# Start application
# ============================================================

if __name__ == "__main__":

    main()