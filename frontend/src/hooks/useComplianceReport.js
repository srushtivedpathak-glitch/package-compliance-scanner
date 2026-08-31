import { useState, useEffect, useCallback } from 'react'

/**
 * Converts backend rule status into the status
 * expected by the report components.
 */
const normalizeStatus = (status) => {
  switch (status) {
    case 'PASS':
      return 'compliant'

    case 'NEEDS_VERIFICATION':
      return 'needs-review'

    case 'FAIL':
      return 'non-compliant'

    case 'NOT_APPLICABLE':
      return 'not-applicable'

    default:
      return 'not-detected'
  }
}

/**
 * Build the frontend report from the actual scan response.
 */
const buildReport = (scanResult) => {
  if (!scanResult) {
    return null
  }

  const product = scanResult.product || {}

  const summary = scanResult.summary || {}

  const ruleResults =
    scanResult.rule_results || []

  const totalChecks =
    summary.total_rules ??
    ruleResults.length

  const compliant =
    summary.passed ?? 0

  const requiresReview =
    summary.needs_verification ?? 0

  const nonCompliant =
    summary.failed ?? 0

  const notApplicable =
    ruleResults.filter(
      (rule) =>
        rule.status === 'NOT_APPLICABLE'
    ).length

  const applicableChecks =
    totalChecks - notApplicable

  const compliantPercentage =
    totalChecks > 0
      ? (compliant / totalChecks) * 100
      : 0

  const reviewPercentage =
    totalChecks > 0
      ? (requiresReview / totalChecks) * 100
      : 0

  const nonCompliantPercentage =
    totalChecks > 0
      ? (nonCompliant / totalChecks) * 100
      : 0

  /**
   * Convert every backend rule into a report finding.
   */
  const findings = ruleResults.map(
    (rule, index) => ({
      id:
        rule.rule_id ||
        `finding-${index + 1}`,

      key:
        rule.field ||
        `rule-${index + 1}`,

      title:
        rule.field
          ? rule.field
              .replaceAll('_', ' ')
              .replace(/\b\w/g, (char) =>
                char.toUpperCase()
              )
          : `Rule ${index + 1}`,

      ruleReference:
        rule.rule_number ||
        rule.rule_id ||
        'Legal Metrology Rule',

      description:
        rule.reason ||
        'Compliance requirement evaluated against the extracted information.',

      status:
        normalizeStatus(
          rule.status
        ),

      extractedValue:
        rule.value ?? null,

      remarks:
        rule.reason ?? null,

      confidence:
        typeof rule.confidence === 'number'
          ? rule.confidence
          : null,

      evidence: [],
    })
  )

  /**
   * Recommendations are generated from the
   * actual NEEDS_VERIFICATION / FAIL results.
   */
  const recommendations = []

  ruleResults
    .filter(
      (rule) =>
        rule.status ===
          'NEEDS_VERIFICATION' ||
        rule.status === 'FAIL'
    )
    .forEach((rule, index) => {
      recommendations.push({
        id:
          `recommendation-${index + 1}`,

        severity:
          rule.status === 'FAIL'
            ? 'critical'
            : 'review',

        title:
          rule.status === 'FAIL'
            ? 'Compliance issue requires attention'
            : 'Verify declaration',

        description:
          rule.reason ||
          `Review ${rule.field || 'this declaration'} before finalizing the inspection.`,

        relatedCheckId:
          rule.rule_id,

        actionType:
          'manual-review',
      })
    })

  /**
   * If everything passed, show a positive recommendation.
   */
  if (
    recommendations.length === 0 &&
    compliant === totalChecks
  ) {
    recommendations.push({
      id: 'recommendation-success',

      severity: 'info',

      title:
        'All evaluated declarations passed',

      description:
        'All applicable compliance checks passed successfully.',

      actionType:
        'complete-review',
    })
  }

  /**
   * Score:
   * passed rules / total rules × 100
   *
   * NEEDS_VERIFICATION is intentionally not
   * treated as a pass.
   */
  const score =
    totalChecks > 0
      ? Math.round(
          (compliant / totalChecks) * 100
        )
      : 0

  return {
    productName:
      product.product_name ?? null,

    score,

    overallStatus:
      scanResult.overall_status ===
      'COMPLIANT'
        ? 'compliant'
        : scanResult.overall_status ===
            'NON_COMPLIANT'
          ? 'non-compliant'
          : 'needs-review',

    totalChecks,

    applicableChecks,

    compliant,

    requiresReview,

    nonCompliant,

    notApplicable,

    compliantPercentage,

    reviewPercentage,

    nonCompliantPercentage,

    findings,

    recommendations,

    generatedAt:
      new Date().toISOString(),
  }
}

export function useComplianceReport(
  scanResult = null
) {
  const [report, setReport] =
    useState(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isGenerating, setIsGenerating] =
    useState(false)

  const [isExporting, setIsExporting] =
    useState(false)

  const [exportToast, setExportToast] =
    useState(null)

  const [error, setError] =
    useState(null)

  /**
   * Generate report from the scan result.
   */
  const loadReport =
    useCallback(async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!scanResult) {
          throw new Error(
            'No scan result found. Please perform a new scan.'
          )
        }

        const generatedReport =
          buildReport(scanResult)

        setReport(
          generatedReport
        )
      } catch (err) {
        console.error(
          '[useComplianceReport] Failed:',
          err
        )

        setError(
          err.message ||
            'Unable to generate compliance report.'
        )
      } finally {
        setIsLoading(false)
      }
    }, [scanResult])

  useEffect(() => {
    loadReport()
  }, [loadReport])

  /**
   * Export currently remains a frontend confirmation.
   *
   * Your current backend does not expose a report
   * export endpoint, so we do not pretend to call one.
   */
  const triggerExport =
    async (format = 'pdf') => {
      setIsExporting(true)
      setExportToast(null)

      try {
        await new Promise(
          (resolve) =>
            setTimeout(resolve, 800)
        )

        setExportToast({
          type: 'success',

          message:
            `Report ready for ${format.toUpperCase()} export.`,
        })
      } catch (err) {
        console.error(
          '[useComplianceReport] Export failed:',
          err
        )

        setExportToast({
          type: 'error',

          message:
            'Unable to export report. Please try again.',
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

    retry:
      loadReport,

    triggerExport,
  }
}