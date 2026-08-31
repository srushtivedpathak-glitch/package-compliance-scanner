/**
 * complianceService.js
 *
 * Frontend service for the Legal Metrology compliance result.
 *
 * The backend already performs:
 * 1. OCR extraction
 * 2. Compliance rule evaluation
 * 3. Database persistence
 *
 * Therefore, the frontend only transforms the backend response
 * into the shape expected by the existing compliance UI.
 */

const BACKEND_URL = 'http://localhost:3000'

/**
 * Convert backend rule status into the status names
 * already used by the frontend components.
 */
function normalizeStatus(status) {
  switch (status) {
    case 'PASS':
      return 'compliant'

    case 'NEEDS_VERIFICATION':
      return 'requires-review'

    case 'FAILED':
      return 'non-compliant'

    case 'NOT_APPLICABLE':
      return 'not-applicable'

    default:
      return 'unknown'
  }
}

/**
 * Convert backend rule field names into the keys
 * expected by the existing frontend components.
 */
function getRuleKey(field) {
  const keyMap = {
    manufacturer: 'manufacturer-packer',
    product_name: 'common-name',
    net_quantity: 'net-quantity',
    mrp: 'mrp',
    manufacture_prepack_import_date: 'mfg-date',
    consumer_complaint_contact: 'consumer-care',
    quantity_unit: 'quantity-unit',
    unit_format: 'unit-format',
  }

  return keyMap[field] || field
}

/**
 * Get a human-readable title for each rule.
 */
function getRuleTitle(field) {
  const titleMap = {
    manufacturer: 'Manufacturer / Packer',
    product_name: 'Product Name',
    net_quantity: 'Net Quantity',
    mrp: 'MRP (Inclusive of all taxes)',
    manufacture_prepack_import_date: 'Manufacture Date',
    consumer_complaint_contact: 'Consumer Contact',
    quantity_unit: 'Quantity Unit',
    unit_format: 'Unit Format',
  }

  return titleMap[field] || field
}

/**
 * Get category for each compliance rule.
 */
function getRuleCategory(field) {
  const categoryMap = {
    manufacturer: 'Mandatory Declarations',
    product_name: 'Mandatory Declarations',
    net_quantity: 'Net Quantity & Measurement',
    mrp: 'Pricing & Tax',
    manufacture_prepack_import_date: 'Mandatory Declarations',
    consumer_complaint_contact: 'Consumer Protection',
    quantity_unit: 'Net Quantity & Measurement',
    unit_format: 'Packaging & Display',
  }

  return categoryMap[field] || 'Legal Metrology'
}

/**
 * Get description for each rule.
 */
function getRuleDescription(field) {
  const descriptionMap = {
    manufacturer:
      'Name and complete address of the manufacturer or packer.',

    product_name:
      'Common or generic name of the packaged commodity.',

    net_quantity:
      'Net quantity declared in terms of standard metric units.',

    mrp:
      'Maximum Retail Price declaration inclusive of all taxes.',

    manufacture_prepack_import_date:
      'Month and year of manufacture or pre-packing.',

    consumer_complaint_contact:
      'Name, address, phone number, and email ID for consumer grievance redressal.',

    quantity_unit:
      'Standard metric unit symbol according to Legal Metrology provisions.',

    unit_format:
      'Unit representation and legal formatting requirements.',
  }

  return descriptionMap[field] || 'Legal Metrology declaration requirement.'
}

/**
 * Convert one backend rule result into the shape
 * expected by ComplianceResultsTable and its child components.
 */
function transformRuleResult(rule, applicability) {
  return {
    id: rule.rule_id,

    key: getRuleKey(rule.field),

    category: getRuleCategory(rule.field),

    title: getRuleTitle(rule.field),

    ruleReference: rule.rule_number,

    description: getRuleDescription(rule.field),

    applicability: applicability?.status || 'Applicable',

    extractedValue:
      rule.value !== null && rule.value !== undefined
        ? String(rule.value)
        : null,

    status: normalizeStatus(rule.status),

    remarks: rule.reason || '--',

    confidence:
      typeof rule.confidence === 'number'
        ? Math.round(rule.confidence * 100)
        : null,

    evidence: [],

    autoEvaluated: true,

    officerReviewRequired:
      rule.status === 'NEEDS_VERIFICATION',

    officerDecision: null,

    officerRemarks: '',
  }
}

/**
 * Convert backend summary into the frontend summary format.
 */
function transformSummary(summary) {
  const total = Number(summary?.total_rules || 0)

  const passed = Number(summary?.passed || 0)

  const failed = Number(summary?.failed || 0)

  const needsVerification = Number(
    summary?.needs_verification || 0
  )

  const percentage = (value) => {
    if (!total) return 0

    return Math.round((value / total) * 100)
  }

  return {
    totalChecks: total,

    compliant: passed,
    compliantPercentage: percentage(passed),

    requiresReview: needsVerification,
    requiresReviewPercentage: percentage(needsVerification),

    nonCompliant: failed,
    nonCompliantPercentage: percentage(failed),

    notApplicable: 0,
    notApplicablePercentage: 0,
  }
}

/**
 * Convert the complete backend response into
 * the structure expected by useCompliance().
 */
function transformComplianceResponse(data) {
  const checks = (data?.rule_results || []).map((rule) =>
    transformRuleResult(rule, data?.applicability)
  )

  return {
    product: data?.product || null,

    overallResult: data?.overall_status || null,

    applicability: data?.applicability || null,

    imageUrl: data?.image_url || null,

    scanId: data?.scan_id || null,

    productId: data?.product_id || null,

    summary: transformSummary(data?.summary),

    checks,
  }
}

/**
 * Fetch the latest compliance result.
 *
 * IMPORTANT:
 * The actual scan has already happened in ScanPage.
 * This function retrieves the saved scan from the backend.
 */
export async function getComplianceResult(scanId = 'latest') {
  const url =
    scanId && scanId !== 'latest'
      ? `${BACKEND_URL}/api/scans/${scanId}`
      : `${BACKEND_URL}/api/scans/latest`

  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))

    throw new Error(
      errorData.message || 'Failed to fetch compliance result'
    )
  }

  const data = await response.json()

  return transformComplianceResponse(data)
}

/**
 * Run compliance evaluation.
 *
 * Your current backend /api/scans endpoint already performs
 * OCR + compliance evaluation in one request.
 *
 * Therefore we do not run another compliance engine request
 * from the frontend.
 *
 * The scan result passed from ScanPage is used directly.
 */
export async function runComplianceCheck(scanId, scanResult) {
  if (!scanResult) {
    throw new Error('No scan result available for compliance check')
  }

  return transformComplianceResponse(scanResult)
}

/**
 * Retry.
 *
 * Since the complete scan is already evaluated by the backend,
 * retry simply uses the existing result.
 */
export async function retryComplianceCheck(scanId, scanResult) {
  return runComplianceCheck(scanId, scanResult)
}

/**
 * Save officer review.
 *
 * This is currently local/frontend functionality because
 * your backend does not expose an officer-review endpoint
 * in the scan API shown above.
 */
export async function submitOfficerReview(
  scanId,
  checkId,
  reviewData
) {
  console.log('Officer review:', {
    scanId,
    checkId,
    reviewData,
  })

  return {
    success: true,
  }
}