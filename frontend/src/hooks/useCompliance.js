import { useState, useEffect, useCallback } from 'react'
import {
  getComplianceResult,
  runComplianceCheck,
  submitOfficerReview,
} from '../services/complianceService'
import { deriveSummaryFromChecks } from '../utils/complianceUtils'

/**
 * useCompliance
 *
 * Custom hook encapsulating data-fetching and state management
 * for the Legal Metrology Compliance Check step.
 *
 * @param {string} [scanId='latest']
 */
export function useCompliance(scanId = 'latest') {
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

  const loadCompliance = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await getComplianceResult(scanId)
      if (res) {
        setComplianceChecks(res.checks || [])
        // If backend summary is provided, use it; otherwise derive from checks
        const summary =
          res.summary?.totalChecks !== null
            ? res.summary
            : deriveSummaryFromChecks(res.checks)
        setComplianceSummary(summary)
      }
    } catch (err) {
      console.error('[useCompliance] Failed to load compliance result:', err)
      setError('Unable to complete compliance check.')
    } finally {
      setIsLoading(false)
    }
  }, [scanId])

  useEffect(() => {
    loadCompliance()
  }, [loadCompliance])

  // Trigger evaluation
  const runEvaluation = async (extractedData) => {
    setIsEvaluating(true)
    setError(null)
    try {
      const res = await runComplianceCheck(scanId, extractedData)
      if (res) {
        setComplianceChecks(res.checks || [])
        setComplianceSummary(
          res.summary?.totalChecks !== null
            ? res.summary
            : deriveSummaryFromChecks(res.checks)
        )
      }
    } catch (err) {
      console.error('[useCompliance] Evaluation failed:', err)
      setError('Unable to evaluate compliance.')
    } finally {
      setIsEvaluating(false)
    }
  }

  // Update officer review decision locally & persist
  const updateOfficerDecision = async (checkId, decisionData) => {
    setComplianceChecks((prev) =>
      prev.map((item) =>
        item.id === checkId
          ? {
              ...item,
              officerDecision: decisionData.decision,
              officerRemarks: decisionData.remarks,
              reviewedAt: new Date().toISOString(),
            }
          : item
      )
    )

    try {
      await submitOfficerReview(scanId, checkId, decisionData)
    } catch (err) {
      console.error('[useCompliance] Failed to submit officer review:', err)
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

