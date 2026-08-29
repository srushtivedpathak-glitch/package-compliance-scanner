/**
 * confidenceUtils.js
 *
 * Helper utilities for Legal Metrology OCR confidence score evaluation
 * and null-safe value display formatting.
 */

/**
 * Categorize a numeric confidence percentage into a standard status level.
 *
 * @param {number|null|undefined} confidence - Confidence score 0-100
 * @returns {'high'|'medium'|'low'|'unknown'}
 */
export function getConfidenceLevel(confidence) {
  if (confidence === null || confidence === undefined || confidence === '') {
    return 'unknown'
  }
  const score = Number(confidence)
  if (isNaN(score)) return 'unknown'
  if (score >= 90) return 'high'
  if (score >= 70) return 'medium'
  return 'low'
}

/**
 * Display helper that prevents falsy values like `0` from displaying as `--`,
 * while treating `null`, `undefined`, and `""` as empty (`--`).
 *
 * @param {any} value
 * @returns {string}
 */
export function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '--'
  }
  return String(value)
}

/**
 * Format confidence score for display.
 *
 * @param {number|null|undefined} confidence
 * @returns {string}
 */
export function displayConfidence(confidence) {
  if (confidence === null || confidence === undefined || confidence === '') {
    return '--%'
  }
  return `${confidence}%`
}

