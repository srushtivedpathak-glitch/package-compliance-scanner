# ============================================================
# PackCheck - Applicability Engine
# ============================================================

import json
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
# Get product value
# ============================================================

def get_product_value(product, field):

    value = product.get(field)

    # OCR object
    if isinstance(value, dict):

        return value.get("value")

    return value


# ============================================================
# Evaluate condition
# ============================================================

def evaluate_condition(product, condition):

    field = condition.get("field")
    operator = condition.get("operator")
    expected = condition.get("value")

    actual = get_product_value(
        product,
        field
    )

    # --------------------------------------------------------
    # Missing value
    # --------------------------------------------------------

    if actual is None:

        return None


    # --------------------------------------------------------
    # Equals
    # --------------------------------------------------------

    if operator == "equals":

        return actual == expected


    # --------------------------------------------------------
    # Greater than
    # --------------------------------------------------------

    if operator == "greater_than":

        try:

            return float(actual) > float(expected)

        except (TypeError, ValueError):

            return None


    # --------------------------------------------------------
    # Less than
    # --------------------------------------------------------

    if operator == "less_than":

        try:

            return float(actual) < float(expected)

        except (TypeError, ValueError):

            return None


    return None


# ============================================================
# Check primary applicability
# ============================================================

def check_primary_scope(
    product,
    applicability
):

    conditions = applicability.get(
        "scope_conditions",
        []
    )

    for condition in conditions:

        result = evaluate_condition(
            product,
            condition
        )

        if result is False:

            return "NOT_APPLICABLE"

        if result is None:

            return "NEEDS_VERIFICATION"

    return "APPLICABLE"


# ============================================================
# Check exclusions
# ============================================================

def check_exclusions(
    product,
    applicability
):

    exclusions = applicability.get(
        "exclusions",
        []
    )

    for exclusion in exclusions:

        result = evaluate_condition(
            product,
            exclusion
        )

        # Definitely excluded
        if result is True:

            return {
                "status": "NOT_APPLICABLE",
                "exclusion_id": exclusion[
                    "exclusion_id"
                ]
            }

        # Cannot determine
        if result is None:

            return {
                "status": "NEEDS_VERIFICATION",
                "exclusion_id": exclusion[
                    "exclusion_id"
                ]
            }

    return {
        "status": "APPLICABLE",
        "exclusion_id": None
    }


# ============================================================
# Check trigger
# ============================================================

def check_trigger(
    product,
    trigger
):

    if trigger is None:

        return True

    value = product.get(trigger)

    # Trigger explicitly true
    if value is True:

        return True

    # Trigger explicitly false
    if value is False:

        return False

    # Trigger unknown
    return None


# ============================================================
# Determine applicability
# ============================================================

def determine_applicability(product):

    rules_data = load_rules()

    applicability = rules_data[
        "applicability"
    ]

    # --------------------------------------------------------
    # STEP 1
    # Primary scope
    # --------------------------------------------------------

    scope_status = check_primary_scope(
        product,
        applicability
    )

    if scope_status != "APPLICABLE":

        return {
            "status": scope_status,
            "applicable_rule_ids": [],
            "reason": (
                "Primary applicability could not "
                "be established."
            )
        }


    # --------------------------------------------------------
    # STEP 2
    # Exclusions
    # --------------------------------------------------------

    exclusion_result = check_exclusions(
        product,
        applicability
    )

    if exclusion_result["status"] != "APPLICABLE":

        return {
            "status": exclusion_result["status"],
            "applicable_rule_ids": [],
            "reason": (
                "An applicability exclusion was "
                "triggered or could not be determined."
            ),
            "exclusion_id": exclusion_result[
                "exclusion_id"
            ]
        }


    # --------------------------------------------------------
    # STEP 3
    # Determine individual rules
    # --------------------------------------------------------

    applicable_rule_ids = []

    verification_rule_ids = []

    prototype_rules = set(
        rules_data.get(
            "prototype_priority_rules",
            []
        )
    )


    for rule in rules_data.get(
        "rules",
        []
    ):

        rule_id = rule["rule_id"]

        # For prototype, only selected rules
        # are checked.

        if rule_id not in prototype_rules:

            continue


        rule_applicability = rule.get(
            "applicability",
            {}
        )

        rule_type = rule_applicability.get(
            "type"
        )


        # ----------------------------------------------------
        # General Chapter II rule
        # ----------------------------------------------------

        if rule_type == "chapter_ii":

            applicable_rule_ids.append(
                rule_id
            )

            continue


        # ----------------------------------------------------
        # Conditional rule
        # ----------------------------------------------------

        if rule_type in (
            "conditional",
            "category_specific"
        ):

            trigger = rule_applicability.get(
                "trigger"
            )

            trigger_result = check_trigger(
                product,
                trigger
            )

            if trigger_result is True:

                applicable_rule_ids.append(
                    rule_id
                )

            elif trigger_result is None:

                verification_rule_ids.append(
                    rule_id
                )

            continue


        # ----------------------------------------------------
        # Other special types
        # ----------------------------------------------------

        if rule_type in (
            "wholesale",
            "advertisement",
            "exemption"
        ):

            trigger = rule_applicability.get(
                "trigger"
            )

            trigger_result = check_trigger(
                product,
                trigger
            )

            if trigger_result is True:

                applicable_rule_ids.append(
                    rule_id
                )

            elif trigger_result is None:

                verification_rule_ids.append(
                    rule_id
                )


    # --------------------------------------------------------
    # Final applicability result
    # --------------------------------------------------------

    return {

        "status": "APPLICABLE",

        "applicable_rule_ids":
            applicable_rule_ids,

        "verification_rule_ids":
            verification_rule_ids,

        "reason": (
            "The product is within the primary "
            "scope and no exclusion was established."
        )
    }