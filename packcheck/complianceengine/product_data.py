# ============================================================
# PackCheck - Product Data
# ============================================================
#
# This file represents the output received from Person 1
# (OCR + information extraction module).
#
# Later, this data can come directly from the OCR system.
# ============================================================


product = {

    # --------------------------------------------------------
    # OCR extracted fields
    # --------------------------------------------------------

    "product_name": {
        "value": "ABC BISCUITS",
        "confidence": 0.98,
        "detected": True,
        "field_visibility": "clear"
    },

    "net_quantity": {
        "value": "200 g",
        "confidence": 0.97,
        "detected": True,
        "field_visibility": "clear"
    },

    "mrp": {
        "value": "₹50.00",
        "confidence": 0.96,
        "detected": True,
        "field_visibility": "clear"
    },

    "manufacturer": {
        "value": "ABC Foods",
        "confidence": 0.94,
        "detected": True,
        "field_visibility": "clear"
    },

    "packer": {
        "value": None,
        "confidence": None,
        "detected": False,
        "field_visibility": "clear"
    },

    "importer": {
        "value": None,
        "confidence": None,
        "detected": False,
        "field_visibility": "clear"
    },


    # --------------------------------------------------------
    # Product information required by applicability.py
    # --------------------------------------------------------

    "commodity_type": "packaged_commodity",

    "intended_sale": "retail",

    "consumer_type": "retail",

    "package_quantity": 200,

    "package_unit": "g",


    # --------------------------------------------------------
    # Conditional applicability information
    #
    # These can later be determined by Person 1 / Person 2
    # or entered from product context.
    # --------------------------------------------------------

    "dimensions_relevant": False,

    "multi_product_package": False,

    "outside_wrapper_present": False,

    "package_kept_offered_exposed_or_sold": True,

    "quantity_declared": True,

    "specified_textile_commodity": False,

    "sheet_type_commodity": False,

    "container_type_commodity": False,

    "dimensions_or_weight_related_to_price": False,

    "wholesale_package": False,

    "export_package_sold_in_india": False,

    "advertisement_mentions_retail_sale_price": False,


    # --------------------------------------------------------
    # Image quality
    # --------------------------------------------------------

    "image_quality": 0.95
}