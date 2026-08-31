import { useState, useMemo } from 'react'
import {
  useNavigate,
  useLocation,
} from 'react-router-dom'

import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'

import { motion } from 'framer-motion'

import ScanStepper from '../components/scan/ScanStepper'
import ComplianceSummary from '../components/compliance/ComplianceSummary'
import RuleReferenceBanner from '../components/compliance/RuleReferenceBanner'
import ComplianceFilters from '../components/compliance/ComplianceFilters'
import ComplianceResultsTable from '../components/compliance/ComplianceResultsTable'
import ComplianceDetailDrawer from '../components/compliance/ComplianceDetailDrawer'
import RuleReferenceModal from '../components/compliance/RuleReferenceModal'

import { useCompliance } from '../hooks/useCompliance'

/**
 * ComplianceCheckPage
 *
 * Step 3 of 4:
 * Legal Metrology Compliance Evaluation
 *
 * Uses the actual compliance result returned by
 * POST /api/scans.
 */
export default function ComplianceCheckPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // ---------------------------------------------------------
  // Get the real scan result from the previous page
  // ---------------------------------------------------------

  const scanResult = location.state?.scanResult

  // ---------------------------------------------------------
  // Compliance hook
  // ---------------------------------------------------------

  const {
    complianceChecks,
    complianceSummary,
    isLoading,
    isEvaluating,
    error,
    retry,
    runEvaluation,
    updateOfficerDecision,
  } = useCompliance(
    scanResult?.scan_id || 'latest',
    scanResult
  )

  // ---------------------------------------------------------
  // Filter states
  // ---------------------------------------------------------

  const [statusFilter, setStatusFilter] =
    useState('all')

  const [categoryFilter, setCategoryFilter] =
    useState('All Categories')

  const [searchQuery, setSearchQuery] =
    useState('')

  // ---------------------------------------------------------
  // Drawer / modal states
  // ---------------------------------------------------------

  const [activeCheck, setActiveCheck] =
    useState(null)

  const [isRuleModalOpen, setIsRuleModalOpen] =
    useState(false)

  const [selectedRuleRef, setSelectedRuleRef] =
    useState(null)

  const [isProceeding, setIsProceeding] =
    useState(false)

  // ---------------------------------------------------------
  // Available categories
  // ---------------------------------------------------------

  const availableCategories = useMemo(() => {
    const categories = new Set()

    complianceChecks.forEach((check) => {
      if (check.category) {
        categories.add(check.category)
      }
    })

    return Array.from(categories)
  }, [complianceChecks])

  // ---------------------------------------------------------
  // Filter compliance checks
  // ---------------------------------------------------------

  const filteredChecks = useMemo(() => {
    return complianceChecks.filter((check) => {

      // Status filter
      if (statusFilter !== 'all') {
        if (
          statusFilter === 'not-detected' &&
          check.status !== 'not-detected'
        ) {
          return false
        }

        if (
          statusFilter !== 'not-detected' &&
          check.status !== statusFilter
        ) {
          return false
        }
      }

      // Category filter
      if (
        categoryFilter !== 'All Categories' &&
        check.category !== categoryFilter
      ) {
        return false
      }

      // Search
      if (searchQuery.trim().length > 0) {
        const q = searchQuery
          .toLowerCase()
          .trim()

        const matchTitle =
          check.title
            ?.toLowerCase()
            .includes(q)

        const matchRule =
          check.ruleReference
            ?.toLowerCase()
            .includes(q)

        const matchDescription =
          check.description
            ?.toLowerCase()
            .includes(q)

        const matchRemarks =
          check.remarks
            ?.toLowerCase()
            .includes(q)

        const matchValue =
          check.extractedValue
            ?.toLowerCase()
            .includes(q)

        if (
          !matchTitle &&
          !matchRule &&
          !matchDescription &&
          !matchRemarks &&
          !matchValue
        ) {
          return false
        }
      }

      return true
    })
  }, [
    complianceChecks,
    statusFilter,
    categoryFilter,
    searchQuery,
  ])

  // ---------------------------------------------------------
  // Open rule reference modal
  // ---------------------------------------------------------

  const handleOpenRuleModal = (
    ruleRef = null
  ) => {
    setSelectedRuleRef(ruleRef)
    setIsRuleModalOpen(true)
  }

  // ---------------------------------------------------------
  // Proceed to Step 4
  // ---------------------------------------------------------

  const handleProceed = () => {
    if (!scanResult) {
      return
    }

    setIsProceeding(true)

    setTimeout(() => {
      setIsProceeding(false)

      navigate('/compliance-report', {
        state: {
          scanResult,
        },
      })
    }, 500)
  }

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
            No scan result found. Please scan a
            product label first.
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/scan')}
          className="btn-primary px-5 py-2.5"
        >
          Go to Scan
        </button>
      </motion.div>
    )
  }

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
      className="space-y-6 lg:space-y-7 pb-12"
    >

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
            STEP 03 / 04
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            Compliance check
          </h1>

          <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium max-w-2xl">
            We have evaluated the extracted information
            against applicable provisions.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-sidebar border border-brand-border text-xs font-bold text-navy">
          <span className="text-teal-primary">
            03
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
        <ScanStepper currentStep={3} />
      </div>

      {/* Error */}

      {error && !isLoading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-brand-danger text-xs sm:text-sm">

          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />

            <span>{error}</span>
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

      {/* Compliance Summary */}

      <div>
        <ComplianceSummary
          summary={complianceSummary}
          isLoading={
            isLoading || isEvaluating
          }
        />
      </div>

      {/* Rule Reference Banner */}

      <div>
        <RuleReferenceBanner
          onViewRules={() =>
            handleOpenRuleModal(null)
          }
        />
      </div>

      {/* Filters */}

      <div>
        <ComplianceFilters
          statusFilter={statusFilter}
          onStatusFilterChange={
            setStatusFilter
          }

          categoryFilter={
            categoryFilter
          }

          onCategoryFilterChange={
            setCategoryFilter
          }

          categories={
            availableCategories
          }

          searchQuery={
            searchQuery
          }

          onSearchQueryChange={
            setSearchQuery
          }
        />
      </div>

      {/* Results Table */}

      <div>
        <ComplianceResultsTable
          checks={filteredChecks}

          isLoading={isLoading}

          isEvaluating={
            isEvaluating
          }

          isFiltered={
            filteredChecks.length !==
            complianceChecks.length
          }

          onViewDetails={
            setActiveCheck
          }

          onOpenRuleModal={
            handleOpenRuleModal
          }

          onRunEvaluation={() =>
            runEvaluation()
          }
        />
      </div>

      {/* Bottom Actions */}

      <div className="flex items-center justify-between pt-4 border-t border-brand-border gap-4 flex-wrap">

        {/* Back */}

        <button
          type="button"
          onClick={() =>
            navigate('/extracted', {
              state: {
                scanResult,
              },
            })
          }
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm font-semibold text-navy hover:bg-gray-100 transition-colors active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-navy/60 transition-transform group-hover:-translate-x-1" />

          Back
        </button>

        {/* Proceed to Report */}

        <button
          type="button"
          onClick={handleProceed}
          disabled={
            isLoading ||
            isEvaluating ||
            isProceeding
          }
          className="btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-md hover:shadow-lg transition-all group"
          aria-label="Proceed to compliance report"
        >
          {isProceeding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />

              Preparing report...
            </>
          ) : (
            <>
              Proceed to report

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      {/* Compliance Detail Drawer */}

      <ComplianceDetailDrawer
        isOpen={!!activeCheck}

        check={activeCheck}

        onClose={() =>
          setActiveCheck(null)
        }

        onSaveOfficerReview={
          updateOfficerDecision
        }

        onOpenRuleModal={(ref) => {
          setActiveCheck(null)

          handleOpenRuleModal(ref)
        }}
      />

      {/* Rule Reference Modal */}

      <RuleReferenceModal
        isOpen={
          isRuleModalOpen
        }

        onClose={() =>
          setIsRuleModalOpen(false)
        }

        initialRule={
          selectedRuleRef
        }
      />

    </motion.div>
  )
}