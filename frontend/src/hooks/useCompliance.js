import { useState, useEffect, useCallback } from 'react'

import {
  runComplianceCheck,
  submitOfficerReview,
} from '../services/complianceService'

import { deriveSummaryFromChecks } from '../utils/complianceUtils'

/**
 * useCompliance
 *
 * Manages the compliance result that was already generated
 * by the backend during the scan request.
 *
 * Flow:
 *
 * ScanPage
 *    ↓
 * POST /api/scans
 *    ↓
 * OCR
 *    ↓
 * Compliance Engine
 *    ↓
 * scanResult
 *    ↓
 * Extracted Information
 *    ↓
 * Compliance Check
 */
export function useCompliance(scanId = 'latest', scanResult = null) {
  const [complianceChecks, setComplianceChecks] = useState([])

  const [complianceSummary, setComplianceSummary] = useState({
    totalChecks: null,
    compliant: null,
    compliantPercentage: null,
    requiresReview: null,
    requiresReviewPercentage: null,
    nonCompliant: null,
    nonCompliantPercentage: null,
    notApplicable: null,
    notApplicablePercentage: null,
  })

  const [isLoading, setIsLoading] = useState(true)

  const [isEvaluating, setIsEvaluating] = useState(false)

  const [error, setError] = useState(null)

  /**
   * Load the compliance result that came from ScanPage.
   */
  const loadCompliance = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!scanResult) {
        throw new Error(
          'No scan result found. Please perform a new scan first.'
        )
      }

      const res = await runComplianceCheck(
        scanId,
        scanResult
      )

      if (res) {
        setComplianceChecks(res.checks || [])

        const summary =
          res.summary?.totalChecks !== null &&
          res.summary?.totalChecks !== undefined
            ? res.summary
            : deriveSummaryFromChecks(res.checks || [])

        setComplianceSummary(summary)
      }
    } catch (err) {
      console.error(
        '[useCompliance] Failed to load compliance result:',
        err
      )

      setError(
        err.message ||
          'Unable to complete compliance check.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [scanId, scanResult])

  /**
   * Load the existing scan result when the page opens.
   */
  useEffect(() => {
    loadCompliance()
  }, [loadCompliance])

  /**
   * Run evaluation again.
   *
   * At the moment the backend already performs the evaluation
   * inside POST /api/scans.
   *
   * Therefore this uses the existing scan result rather than
   * sending another request to the compliance engine.
   */
  const runEvaluation = async () => {
    setIsEvaluating(true)
    setError(null)

    try {
      if (!scanResult) {
        throw new Error(
          'No scan result available for evaluation.'
        )
      }

      const res = await runComplianceCheck(
        scanId,
        scanResult
      )

      if (res) {
        setComplianceChecks(res.checks || [])

        const summary =
          res.summary?.totalChecks !== null &&
          res.summary?.totalChecks !== undefined
            ? res.summary
            : deriveSummaryFromChecks(res.checks || [])

        setComplianceSummary(summary)
      }
    } catch (err) {
      console.error(
        '[useCompliance] Evaluation failed:',
        err
      )

      setError(
        err.message ||
          'Unable to evaluate compliance.'
      )
    } finally {
      setIsEvaluating(false)
    }
  }

  /**
   * Update officer review decision locally
   * and send it to the review service.
   */
  const updateOfficerDecision = async (
    checkId,
    decisionData
  ) => {
    setComplianceChecks((prev) =>
      prev.map((item) =>
        item.id === checkId
          ? {
              ...item,
              officerDecision:
                decisionData.decision,
              officerRemarks:
                decisionData.remarks,
              reviewedAt:
                new Date().toISOString(),
            }
          : item
      )
    )

    try {
      await submitOfficerReview(
        scanId,
        checkId,
        decisionData
      )
    } catch (err) {
      console.error(
        '[useCompliance] Failed to submit officer review:',
        err
      )
    }
  }

  return {
    complianceChecks,

    complianceSummary,

    isLoading,

    isEvaluating,

    error,

    retry: loadCompliance,

    runEvaluation,

    updateOfficerDecision,
  }
}