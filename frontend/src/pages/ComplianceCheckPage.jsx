import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
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
 * Step 3 of 4: Legal Metrology Compliance Evaluation
 * Displays evaluated checks against Legal Metrology (Packaged Commodities) Rules, 2011,
 * rule references, evidence crops, and officer confirmation actions.
 */
export default function ComplianceCheckPage() {
  const navigate = useNavigate()
  const {
    complianceChecks,
    complianceSummary,
    isLoading,
    isEvaluating,
    error,
    retry,
    updateOfficerDecision,
  } = useCompliance('latest')

  // Filter & Search states
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals & Drawers
  const [activeCheck, setActiveCheck] = useState(null)
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
  const [selectedRuleRef, setSelectedRuleRef] = useState(null)
  const [isProceeding, setIsProceeding] = useState(false)

  // Extract distinct categories from checks
  const availableCategories = useMemo(() => {
    const cats = new Set()
    complianceChecks.forEach((c) => {
      if (c.category) cats.add(c.category)
    })
    return Array.from(cats)
  }, [complianceChecks])

  // Memoized search & filter logic
  const filteredChecks = useMemo(() => {
    return complianceChecks.filter((c) => {
      // 1. Status Filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'not-detected' && c.status !== 'not-detected') return false
        if (statusFilter !== 'not-detected' && c.status !== statusFilter) return false
      }

      // 2. Category Filter
      if (categoryFilter !== 'All Categories' && c.category !== categoryFilter) {
        return false
      }

      // 3. Search Query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase()
        const matchTitle = c.title?.toLowerCase().includes(q)
        const matchRule = c.ruleReference?.toLowerCase().includes(q)
        const matchDesc = c.description?.toLowerCase().includes(q)
        const matchRemarks = c.remarks?.toLowerCase().includes(q)
        const matchVal = c.extractedValue?.toLowerCase().includes(q)
        if (!matchTitle && !matchRule && !matchDesc && !matchRemarks && !matchVal) {
          return false
        }
      }

      return true
    })
  }, [complianceChecks, statusFilter, categoryFilter, searchQuery])

  // Proceed to Step 4 (Report)
  const handleProceed = () => {
    setIsProceeding(true)
    setTimeout(() => {
      setIsProceeding(false)
      navigate('/compliance-report')
    }, 850)
  }

  const handleOpenRuleModal = (ruleRef = null) => {
    setSelectedRuleRef(ruleRef)
    setIsRuleModalOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 lg:space-y-7 pb-12"
    >
      {/* ─── Page Header & Step Counter ─── */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
            STEP 03 / 04
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            Compliance check
          </h1>
          <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium max-w-2xl">
            We have evaluated the extracted information against applicable provisions.
          </p>
        </div>

        {/* Step Badge */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-sidebar border border-brand-border text-xs font-bold text-navy">
          <span className="text-teal-primary">03</span>
          <span className="text-navy/40">/</span>
          <span className="text-navy/60">04</span>
        </div>
      </div>

      {/* ─── Workflow Stepper ─── */}
      <div>
        <ScanStepper currentStep={3} />
      </div>

      {/* ─── Error Alert ─── */}
      {error && !isLoading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-brand-danger text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={retry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-xl font-bold hover:bg-red-100/50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* ─── Compliance Summary Cards ─── */}
      <div>
        <ComplianceSummary
          summary={complianceSummary}
          isLoading={isLoading || isEvaluating}
        />
      </div>

      {/* ─── Rule Reference Banner ─── */}
      <div>
        <RuleReferenceBanner onViewRules={() => handleOpenRuleModal(null)} />
      </div>

      {/* ─── Filter & Search Toolbar ─── */}
      <div>
        <ComplianceFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={availableCategories}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      </div>

      {/* ─── Detailed Results Table / Mobile Stack ─── */}
      <div>
        <ComplianceResultsTable
          checks={filteredChecks}
          isLoading={isLoading}
          onOpenRuleModal={handleOpenRuleModal}
          onRunEvaluation={() => runEvaluation({})}
          />
      </div>

      {/* ─── Bottom Actions Bar ─── */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-border gap-4 flex-wrap">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/extracted')}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm font-semibold text-navy hover:bg-gray-100 transition-colors active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-navy/60 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Proceed to Report Button */}
        <button
          type="button"
          onClick={handleProceed}
          disabled={isLoading || isEvaluating || isProceeding}
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

      {/* ─── Compliance Detail Slide-over Drawer ─── */}
      <ComplianceDetailDrawer
        isOpen={!!activeCheck}
        check={activeCheck}
        onClose={() => setActiveCheck(null)}
        onSaveOfficerReview={updateOfficerDecision}
        onOpenRuleModal={(ref) => {
          setActiveCheck(null)
          handleOpenRuleModal(ref)
        }}
      />

      {/* ─── Rule Reference Modal ─── */}
      <RuleReferenceModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
        initialRule={selectedRuleRef}
      />
    </motion.div>
  )
}

