/**
 * reportService.js
 *
 * Async service layer for Legal Metrology compliance report generation and export.
 * Returns null / placeholder state by default until real backend data is fetched.
 */

const DELAY_MS = 600
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch the compliance report summary and findings.
 *
 * @param {string} [scanId='latest']
 * @returns {Promise<ComplianceReportResponse>}
 */
export async function getComplianceReport(scanId = 'latest') {
  await delay(DELAY_MS)

  return {
    productName: null,
    score: null,
    overallStatus: null, // 'compliant' | 'needs-review' | 'non-compliant' | 'pending' | null
    totalChecks: null,
    applicableChecks: null,
    compliant: null,
    requiresReview: null,
    nonCompliant: null,
    notApplicable: null,
    compliantPercentage: null,
    reviewPercentage: null,
    nonCompliantPercentage: null,
    findings: [],
    recommendations: [],
    generatedAt: null,
  }
}

/**
 * Trigger export of the compliance inspection report.
 *
 * @param {string} scanId
 * @param {'pdf'|'docx'} [format='pdf']
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function exportReport(scanId, format = 'pdf') {
  await delay(1000)
  return {
    success: true,
    message: `Report exported successfully as ${format.toUpperCase()}`,
  }
}

/**
 * @typedef {Object} FindingItem
 * @property {string} id
 * @property {string} title
 * @property {string} ruleReference
 * @property {'compliant'|'needs-review'|'non-compliant'|'not-applicable'|'not-detected'|null} status
 * @property {string|null} extractedValue
 * @property {string|null} remarks
 * @property {number|null} confidence
 * @property {Array<any>} [evidence]
 */

/**
 * @typedef {Object} RecommendationItem
 * @property {string} id
 * @property {'info'|'review'|'critical'} severity
 * @property {string} title
 * @property {string} description
 * @property {string} [relatedCheckId]
 * @property {string} [actionType]
 */

/**
 * @typedef {Object} ComplianceReportResponse
 * @property {string|null} productName
 * @property {number|null} score
 * @property {'compliant'|'needs-review'|'non-compliant'|'pending'|null} overallStatus
 * @property {number|null} totalChecks
 * @property {number|null} applicableChecks
 * @property {number|null} compliant
 * @property {number|null} requiresReview
 * @property {number|null} nonCompliant
 * @property {number|null} notApplicable
 * @property {number|null} compliantPercentage
 * @property {number|null} reviewPercentage
 * @property {number|null} nonCompliantPercentage
 * @property {FindingItem[]} findings
 * @property {RecommendationItem[]} recommendations
 * @property {string|null} generatedAt
 */

