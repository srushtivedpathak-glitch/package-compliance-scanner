import { useState } from 'react'

import {
  useNavigate,
  useLocation,
} from 'react-router-dom'

import {
  ArrowLeft,
  FileDown,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import ScanStepper from '../components/scan/ScanStepper'

import ReportHero from '../components/report/ReportHero'
import ReportFindings from '../components/report/ReportFindings'
import RecommendedActions from '../components/report/RecommendedActions'
import ReportSummary from '../components/report/ReportSummary'

import ComplianceDetailDrawer from '../components/compliance/ComplianceDetailDrawer'

import { useComplianceReport } from '../hooks/useComplianceReport'

import { displayValue } from '../utils/complianceUtils'

export default function ComplianceReportPage() {
  const navigate = useNavigate()

  const location = useLocation()

  // ---------------------------------------------------------
  // Get the SAME scan result from Compliance Check
  // ---------------------------------------------------------

  const scanResult =
    location.state?.scanResult

  // ---------------------------------------------------------
  // Generate report from scan result
  // ---------------------------------------------------------

  const {
    report,
    isLoading,
    isExporting,
    exportToast,
    error,
    retry,
    triggerExport,
  } = useComplianceReport(
    scanResult
  )

  const [
    selectedFinding,
    setSelectedFinding,
  ] = useState(null)

  // ---------------------------------------------------------
  // Product name
  // ---------------------------------------------------------

  const productNameDisplay =
    displayValue(
      report?.productName
    )

  // ---------------------------------------------------------
  // No scan result
  // ---------------------------------------------------------

  if (!scanResult) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="space-y-6 pb-12"
      >
        <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-brand-danger">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />

          <span className="text-sm font-medium">
            No scan result found. Please perform a
            new scan first.
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate('/scan')
          }
          className="btn-primary px-5 py-2.5"
        >
          Go to Scan
        </button>
      </motion.div>
    )
  }

  // ---------------------------------------------------------
  // Timestamp
  // ---------------------------------------------------------

  const timestampDisplay =
    report?.generatedAt
      ? new Date(
          report.generatedAt
        ).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Generated just now'

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-6 lg:space-y-7 pb-14"
    >

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
            STEP 04 / 04
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            Compliance report
          </h1>

          <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium">
            Inspection summary for{' '}
            <span className="font-bold text-navy">
              {productNameDisplay}
            </span>

            {' • '}

            {timestampDisplay}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-sidebar border border-brand-border text-xs font-bold text-navy">
          <span className="text-teal-primary">
            04
          </span>

          <span className="text-navy/40">
            /
          </span>

          <span className="text-navy/60">
            04
          </span>
        </div>
      </div>

      {/* Stepper */}

      <div>
        <ScanStepper currentStep={4} />
      </div>

      {/* Error */}

      {error && !isLoading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-brand-danger text-xs sm:text-sm">

          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />

            <span>
              {error}
            </span>
          </div>

          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-xl font-bold hover:bg-red-100/50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />

            Retry
          </button>
        </div>
      )}

      {/* Report Hero */}

      <div>
        <ReportHero
          report={
            report || {}
          }
          onExport={
            triggerExport
          }
          isExporting={
            isExporting
          }
          isLoading={
            isLoading
          }
        />
      </div>

      {/* Findings + Recommendations */}

      <div className="grid grid-cols-1 lg:grid-cols-[1.38fr_1fr] gap-5 lg:gap-6 items-stretch">

        {/* Findings */}

        <div className="w-full">
          <ReportFindings
            findings={
              report?.findings || []
            }
            totalChecks={
              report?.totalChecks || 0
            }
            onFindingClick={
              setSelectedFinding
            }
            isLoading={
              isLoading
            }
          />
        </div>

        {/* Recommendations */}

        <div className="w-full">
          <RecommendedActions
            recommendations={
              report?.recommendations ||
              []
            }
            overallStatus={
              report?.overallStatus
            }
            isLoading={
              isLoading
            }
          />
        </div>

      </div>

      {/* Summary */}

      <div>
        <ReportSummary
          report={
            report || {}
          }
          isLoading={
            isLoading
          }
        />
      </div>

      {/* Bottom Actions */}

      <div className="flex items-center justify-between pt-4 border-t border-brand-border gap-4 flex-wrap">

        {/* Back */}

        <button
          type="button"
          onClick={() =>
            navigate(
              '/compliance-check',
              {
                state: {
                  scanResult,
                },
              }
            )
          }
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm font-semibold text-navy hover:bg-gray-100 transition-colors active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-navy/60 transition-transform group-hover:-translate-x-1" />

          Back
        </button>

        {/* Export */}

        <button
          type="button"
          onClick={() =>
            triggerExport('pdf')
          }
          disabled={
            isExporting ||
            isLoading
          }
          className="btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          aria-label="Export compliance report as PDF"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />

              <span>
                Preparing report...
              </span>
            </>
          ) : (
            <>
              <span>
                Export report
              </span>

              <FileDown className="w-4 h-4" />
            </>
          )}
        </button>

      </div>

      {/* Finding Detail Drawer */}

      <ComplianceDetailDrawer
        isOpen={
          !!selectedFinding
        }
        check={
          selectedFinding
        }
        onClose={() =>
          setSelectedFinding(null)
        }
      />

      {/* Export Toast */}

      <AnimatePresence>
        {exportToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border ${
              exportToast.type ===
              'success'
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-red-500 text-white border-red-400'
            }`}
          >
            {exportToast.type ===
            'success' ? (
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />
            )}

            <span>
              {exportToast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}