/**
 * complianceService.js
 *
 * Async service layer for Legal Metrology rule engine evaluation.
 * Aligned with PACKCHECK database schema (8 core declaration checks).
 *
 * ARCHITECTURE:
 *   Frontend never decides legal pass/fail logic.
 *   Backend rule engine provides authoritative status, remarks, and applicability.
 */

const DELAY_MS = 600
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 8 Core Legal Metrology Declaration Checks (Matching PACKCHECK schema)
 */
export const PACKCHECK_RULES = [
  {
    id: 'check-1',
    key: 'manufacturer',
    category: 'Mandatory Declarations',
    title: 'Manufacturer / Packer',
    ruleReference: 'Rule 6(1)(a)',
    description: 'Name and complete address of the manufacturer or packer.',
    applicability: 'Mandatory',
    extractedValue: 'ABC Foods, Industrial Area, Phase II',
    status: 'compliant',
    remarks: 'Name and complete address detected with valid jurisdiction particulars.',
    confidence: 96,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: false,
  },
  {
    id: 'check-2',
    key: 'product-name',
    category: 'Mandatory Declarations',
    title: 'Product Name',
    ruleReference: 'Rule 6(1)(b)',
    description: 'Common or generic name of the packaged commodity.',
    applicability: 'Mandatory',
    extractedValue: 'ABC BISCUITS',
    status: 'compliant',
    remarks: 'Generic identity of commodity clearly declared on principal display panel.',
    confidence: 98,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: false,
  },
  {
    id: 'check-3',
    key: 'net-quantity',
    category: 'Net Quantity & Measurement',
    title: 'Net Quantity',
    ruleReference: 'Rule 6(1)(c)',
    description: 'Net quantity declared in terms of standard metric units.',
    applicability: 'Mandatory',
    extractedValue: '250 g',
    status: 'compliant',
    remarks: 'Quantity declared with standard weight specification.',
    confidence: 94,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: false,
  },
  {
    id: 'check-4',
    key: 'mrp',
    category: 'Pricing & Tax',
    title: 'MRP (Inclusive of all taxes)',
    ruleReference: 'Rule 6(1)(e)',
    description: 'Maximum Retail Price declaration inclusive of all taxes.',
    applicability: 'Mandatory',
    extractedValue: '₹ 45.00 (Incl. of all taxes)',
    status: 'compliant',
    remarks: 'All-inclusive retail sale price format verified.',
    confidence: 92,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: false,
  },
  {
    id: 'check-5',
    key: 'mfg-date',
    category: 'Mandatory Declarations',
    title: 'Manufacture Date',
    ruleReference: 'Rule 6(1)(d)',
    description: 'Month and year of manufacture or pre-packing.',
    applicability: 'Mandatory',
    extractedValue: 'PKD 08/2026',
    status: 'requires-review',
    remarks: 'Date format detected but requires verification of expiry/best-before compliance.',
    confidence: 76,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: true,
  },
  {
    id: 'check-6',
    key: 'consumer-contact',
    category: 'Consumer Protection',
    title: 'Consumer Contact',
    ruleReference: 'Rule 6(2)',
    description: 'Name, address, phone number, and email ID for consumer grievance redressal.',
    applicability: 'Mandatory',
    extractedValue: 'care@abcfoods.com, 1800-XXX-XXXX',
    status: 'requires-review',
    remarks: 'Consumer support email detected; phone helpline requires clarity verification.',
    confidence: 72,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: true,
  },
  {
    id: 'check-7',
    key: 'quantity-unit',
    category: 'Net Quantity & Measurement',
    title: 'Quantity Unit',
    ruleReference: 'Rule 12',
    description: 'Standard metric unit symbol according to Legal Metrology provisions.',
    applicability: 'Mandatory',
    extractedValue: 'g (grams)',
    status: 'requires-review',
    remarks: 'Symbol format partially non-standard; verify absence of prohibited abbreviations.',
    confidence: 70,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: true,
  },
  {
    id: 'check-8',
    key: 'unit-format',
    category: 'Packaging & Display',
    title: 'Unit Format & Font Height',
    ruleReference: 'Rule 13 & Rule 7',
    description: 'Numeral sizing, spacing, and legal representation on principal display panel.',
    applicability: 'Mandatory',
    extractedValue: 'Height ~ 3.2 mm',
    status: 'requires-review',
    remarks: 'Font height proportional assessment needs officer visual verification.',
    confidence: 68,
    evidence: [],
    autoEvaluated: true,
    officerReviewRequired: true,
  },
]

/**
 * Fetch compliance evaluation results for a scan.
 * By default before evaluation runs / before backend returns:
 * returns 0 checks and 0 / null metrics.
 *
 * @param {string} [scanId]
 * @param {boolean} [evaluated=false]
 * @returns {Promise<ComplianceResponse>}
 */
export async function getComplianceResult(scanId = 'latest', evaluated = false) {
  await delay(DELAY_MS)

  if (!evaluated) {
    return {
      product: null,
      overallResult: null,
      summary: {
        totalChecks: 0,
        compliant: 0,
        compliantPercentage: 0,
        requiresReview: 0,
        requiresReviewPercentage: 0,
        nonCompliant: 0,
        nonCompliantPercentage: 0,
        notApplicable: 0,
        notApplicablePercentage: 0,
      },
      checks: [],
    }
  }

  // When evaluated against PACKCHECK results:
  return {
    product: {
      name: 'ABC BISCUITS',
      brand: 'ABC Foods',
    },
    overallResult: 'NEEDS VERIFICATION',
    summary: {
      totalChecks: 8,
      compliant: 4,
      compliantPercentage: 50,
      requiresReview: 4,
      requiresReviewPercentage: 50,
      nonCompliant: 0,
      nonCompliantPercentage: 0,
      notApplicable: 0,
      notApplicablePercentage: 0,
    },
    checks: PACKCHECK_RULES,
  }
}

/**
 * Trigger backend rule engine to run compliance evaluation on extracted label data.
 *
 * @param {string} scanId
 * @param {Object} extractedData
 * @returns {Promise<ComplianceResponse>}
 */
export async function runComplianceCheck(scanId, extractedData) {
  await delay(1000)
  return getComplianceResult(scanId, true)
}

/**
 * Retry compliance check.
 *
 * @param {string} scanId
 * @returns {Promise<ComplianceResponse>}
 */
export async function retryComplianceCheck(scanId) {
  return runComplianceCheck(scanId, {})
}

/**
 * Save an officer's manual review confirmation/decision for a specific check.
 *
 * @param {string} scanId
 * @param {string} checkId
 * @param {Object} reviewData
 * @returns {Promise<{ success: boolean }>}
 */
export async function submitOfficerReview(scanId, checkId, reviewData) {
  await delay(300)
  return { success: true }
}
