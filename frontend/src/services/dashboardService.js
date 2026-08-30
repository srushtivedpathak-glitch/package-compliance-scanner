/**
 * dashboardService.js
 *
 * Async service layer for dashboard data.
 * Currently returns null/empty to signal "no data yet" (database not connected).
 *
 * FUTURE INTEGRATION:
 *   Replace the body of each function with the appropriate API call:
 *   const res = await fetch('/api/dashboard/stats', { headers: authHeaders() })
 *   return res.json()
 */

/** Simulated network delay for realistic UX testing (ms) */
const MOCK_DELAY = 800

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch aggregate dashboard statistics.
 * @returns {Promise<DashboardStats|null>}
 */
export async function fetchDashboardStats() {
  await delay(MOCK_DELAY)

  // Return null to indicate no data yet (DB not connected).
  // Replace with: return apiClient.get('/dashboard/stats')
  return null
}

/**
 * Fetch the most recent inspection actions.
 * @param {number} limit - Maximum number of records to return
 * @returns {Promise<RecentAction[]>}
 */
export async function fetchRecentActions(limit = 5) {
  await delay(MOCK_DELAY)

  // Return empty array to trigger skeleton/empty state.
  // Replace with: return apiClient.get(`/inspections/recent?limit=${limit}`)
  return []
}

/**
 * @typedef {Object} DashboardStats
 * @property {number|null} scansCompleted
 * @property {number|null} compliant
 * @property {number|null} nonCompliant
 * @property {number|null} reportsGenerated
 * @property {number|null} scansGrowth       - % growth from previous period
 * @property {number|null} compliantPercentage
 * @property {number|null} nonCompliantPercentage
 * @property {number|null} reportsGrowth
 */

/**
 * @typedef {Object} RecentAction
 * @property {string} id
 * @property {string} productName
 * @property {string} dateTime          - ISO string
 * @property {'compliant'|'non-compliant'|'partial'|'pending'} status
 * @property {number|null} score        - 0-100
 * @property {string} [batchNumber]
 * @property {string} [officerId]
 */

