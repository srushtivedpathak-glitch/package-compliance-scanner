import { useState, useEffect, useCallback } from 'react'
import { getComplianceReport, exportReport } from '../services/reportService'

/**
 * useComplianceReport
 *
 * Custom hook for fetching and managing compliance report data,
 * generation states, and export actions.
 *
 * @param {string} [scanId='latest']
 */
export function useComplianceReport(scanId = 'latest') {
  const [report, setReport] = useState({
    productName: null,
    score: null,
    overallStatus: null,
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
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportToast, setExportToast] = useState(null)
  const [error, setError] = useState(null)

  const loadReport = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await getComplianceReport(scanId)
      if (res) {
        setReport(res)
      }
    } catch (err) {
      console.error('[useComplianceReport] Failed to load report:', err)
      setError('Unable to load compliance report.')
    } finally {
      setIsLoading(false)
    }
  }, [scanId])

  useEffect(() => {
    loadReport()
  }, [loadReport])

  const triggerExport = async (format = 'pdf') => {
    setIsExporting(true)
    setExportToast(null)
    try {
      const res = await exportReport(scanId, format)
      if (res?.success) {
        setExportToast({
          type: 'success',
          message: res.message || 'Report exported successfully',
        })
      } else {
        setExportToast({
          type: 'error',
          message: 'Unable to export report. Please try again.',
        })
      }
    } catch (err) {
      console.error('[useComplianceReport] Export failed:', err)
      setExportToast({
        type: 'error',
        message: 'Unable to export report. Please try again.',
      })
    } finally {
      setIsExporting(false)
      setTimeout(() => {
        setExportToast(null)
      }, 3500)
    }
  }

  return {
    report,
    isLoading,
    isGenerating,
    isExporting,
    exportToast,
    error,
    retry: loadReport,
    triggerExport,
  }
}

