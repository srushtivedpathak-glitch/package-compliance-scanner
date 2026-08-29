/**
 * historyService.js
 *
 * Async service layer for retrieving saved Legal Metrology inspection history
 * and compliance reports from the database.
 */

const DELAY_MS = 600
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch paginated inspection history records.
 *
 * @param {Object} params
 * @param {string} [params.search='']
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 * @returns {Promise<HistoryResponse>}
 */
export async function getHistory({ search = '', page = 1, limit = 10 } = {}) {
  await delay(DELAY_MS)

  // Real database/API will replace this. Returns empty records by default.
  return {
    records: [],
    pagination: {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      totalRecords: 0,
      totalPages: 0,
    },
  }
}

/**
 * Fetch overall history summary statistics.
 *
 * @returns {Promise<HistorySummaryResponse>}
 */
export async function getHistorySummary() {
  await delay(DELAY_MS)

  return {
    total: null,
    compliant: null,
    needsReview: null,
    nonCompliant: null,
    notApplicable: null,
  }
}

/**
 * Request report download for a specific history record.
 *
 * @param {string} recordId
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function downloadHistoryReport(recordId) {
  await delay(900)
  return {
    success: true,
    message: 'Inspection report prepared for download.',
  }
}

/**
 * @typedef {Object} HistoryRecord
 * @property {string} id
 * @property {string} productName
 * @property {number|null} score
 * @property {boolean} [reportAvailable]
 */

/**
 * @typedef {Object} HistoryPagination
 * @property {number} page
 * @property {number} limit
 * @property {number} totalRecords
 * @property {number} totalPages
 */

/**
 * @typedef {Object} HistoryResponse
 * @property {HistoryRecord[]} records
 * @property {HistoryPagination} pagination
 */

/**
 * @typedef {Object} HistorySummaryResponse
 * @property {number|null} total
 * @property {number|null} compliant
 * @property {number|null} needsReview
 * @property {number|null} nonCompliant
 * @property {number|null} notApplicable
 */

