/**
 * extractionService.js
 *
 * Async service layer for OCR / label extraction data.
 * Aligned with the PACKCHECK database schema (8 core fields):
 *   - manufacturer
 *   - productName
 *   - netQuantity
 *   - mrp
 *   - mfgDate
 *   - consumerContact
 *   - quantityUnit
 *   - unitFormat
 */

const DELAY_MS = 600
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetch OCR extracted data for a given scan ID.
 *
 * @param {string} [scanId]
 * @returns {Promise<ExtractionResponse>}
 */
export async function getExtraction(scanId = 'latest') {
  await delay(DELAY_MS)

  return {
    extraction: {
      manufacturer: null,
      productName: null,
      netQuantity: null,
      mrp: null,
      mfgDate: null,
      consumerContact: null,
      quantityUnit: null,
      unitFormat: null,
    },
    confidence: {
      manufacturer: null,
      productName: null,
      netQuantity: null,
      mrp: null,
      mfgDate: null,
      consumerContact: null,
      quantityUnit: null,
      unitFormat: null,
    },
    identifiedFields: null,
    totalFields: null,
    overallConfidence: null,
    originalImage: null,
  }
}

/**
 * Update a single extracted field value.
 *
 * @param {string} scanId
 * @param {string} fieldName
 * @param {any} value
 * @returns {Promise<{ success: boolean }>}
 */
export async function updateExtractedField(scanId, fieldName, value) {
  await delay(300)
  return { success: true }
}

/**
 * @typedef {Object} ExtractionResponse
 * @property {Record<string, string|null>} extraction
 * @property {Record<string, number|null>} confidence
 * @property {number|null} identifiedFields
 * @property {number|null} totalFields
 * @property {number|null} overallConfidence
 * @property {string|null} originalImage
 */
