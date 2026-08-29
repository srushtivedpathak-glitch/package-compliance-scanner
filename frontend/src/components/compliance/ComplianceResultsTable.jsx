import { Play, ClipboardCheck } from 'lucide-react'
import ComplianceResultRow from './ComplianceResultRow'
import ComplianceResultCard from './ComplianceResultCard'

const SKELETON_ROWS = 6

/**
 * ComplianceResultsTable
 *
 * Responsive container rendering a semantic HTML table on desktop (>= md)
 * and expandable accordion cards on mobile (< md).
 */
export default function ComplianceResultsTable({
  checks = [],
  isLoading = false,
  isEvaluating = false,
  isFiltered = false,
  onViewDetails,
  onOpenRuleModal,
  onRunEvaluation,
}) {
  if (isLoading || isEvaluating) {
    return (
      <div className="card overflow-hidden bg-white border border-brand-border" aria-busy="true">
        {/* Desktop skeleton table */}
        <div className="hidden md:block">
          <div className="bg-gray-50/70 border-b border-brand-border px-5 py-3.5 flex justify-between">
            <div className="skeleton h-4 w-40 rounded" />
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-4 w-28 rounded" />
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-4 w-32 rounded" />
            <div className="skeleton h-4 w-12 rounded" />
          </div>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <div
              key={i}
              className="px-5 py-4 border-b border-brand-border last:border-0 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="skeleton w-8 h-8 rounded-xl flex-shrink-0" />
                <div className="space-y-1.5">
                  <div className="skeleton h-4 w-36 rounded" />
                  <div className="skeleton h-3 w-20 rounded" />
                </div>
              </div>
              <div className="skeleton h-4 w-16 rounded" />
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-6 w-24 rounded-full" />
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton w-7 h-7 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Mobile skeleton cards */}
        <div className="md:hidden p-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border border-brand-border rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="skeleton w-8 h-8 rounded-xl" />
                  <div className="skeleton h-4 w-32 rounded" />
                </div>
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Empty state when search or status filter yields 0 matches
  if (isFiltered && checks.length === 0) {
    return (
      <div className="card p-10 bg-white border border-brand-border text-center">
        <p className="text-sm font-bold text-navy mb-1">No matching compliance checks found</p>
        <p className="text-xs text-navy/50">
          Try adjusting your search query or selecting a different status filter.
        </p>
      </div>
    )
  }

  // Initial un-evaluated state: 0 checks run yet
  if (!checks || checks.length === 0) {
    return (
      <div className="card p-8 sm:p-12 bg-white border border-brand-border text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-primary flex items-center justify-center mb-3.5 shadow-2xs">
          <ClipboardCheck className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <h4 className="text-sm sm:text-base font-bold text-navy mb-1">
          No compliance rules evaluated yet
        </h4>
        <p className="text-xs sm:text-sm text-navy/50 max-w-md mb-5 leading-relaxed">
          Run the Legal Metrology rule evaluation engine to check extracted declarations against packaged commodity provisions.
        </p>
        <button
          type="button"
          onClick={onRunEvaluation}
          className="btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-sm hover:shadow"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Run compliance check</span>
        </button>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden bg-white border border-brand-border shadow-xs">
      {/* ─── Desktop Semantic Table (md+) ─── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left" role="table" aria-label="Detailed compliance checks">
          <thead>
            <tr className="border-b border-brand-border bg-gray-50/70 text-[11px] font-bold text-navy/50 uppercase tracking-wider">
              <th className="px-5 py-3.5 whitespace-nowrap">Declaration / Requirement</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Applicability</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Extracted Value</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Status</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Remarks</th>
              <th className="px-4 py-3.5 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((check) => (
              <ComplianceResultRow
                key={check.id}
                check={check}
                onViewDetails={onViewDetails}
                onOpenRuleModal={onOpenRuleModal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile Accordion Stack (< md) ─── */}
      <div className="md:hidden p-3 space-y-2.5">
        {checks.map((check) => (
          <ComplianceResultCard
            key={check.id}
            check={check}
            onViewDetails={onViewDetails}
            onOpenRuleModal={onOpenRuleModal}
          />
        ))}
      </div>
    </div>
  )
}
