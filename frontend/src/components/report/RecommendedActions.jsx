import { Link } from 'react-router-dom'
import {
  Lightbulb,
  ShieldCheck,
  Eye,
  Building2,
  FileCheck2,
  ScanLine,
  ArrowRight,
} from 'lucide-react'
import { displayValue } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

// Default checklist items when unpopulated
const DEFAULT_ACTION_ITEMS = [
  {
    id: 'act-1',
    icon: Eye,
    label: 'Review highlighted items',
    value: null,
  },
  {
    id: 'act-2',
    icon: Building2,
    label: 'Verify details if required',
    value: null,
  },
  {
    id: 'act-3',
    icon: FileCheck2,
    label: 'Ensure all mandatory declarations are present',
    value: null,
  },
]

/**
 * RecommendedActions
 *
 * Right-column container rendering recommendations and Scan Another Label CTA.
 */
export default function RecommendedActions({
  recommendations = [],
  overallStatus = null,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="card p-5 sm:p-6 bg-white border border-brand-border h-full flex flex-col justify-between" aria-busy="true">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="skeleton h-5 w-36 rounded" />
            <div className="skeleton h-5 w-14 rounded-full" />
          </div>
          <div className="skeleton h-24 w-full rounded-2xl" />
          <div className="space-y-3 pt-2">
            <div className="skeleton h-8 w-full rounded-xl" />
            <div className="skeleton h-8 w-full rounded-xl" />
          </div>
        </div>
        <div className="skeleton h-11 w-full rounded-xl mt-6" />
      </div>
    )
  }

  const itemsCountLabel =
    recommendations && recommendations.length > 0
      ? `${recommendations.length} items`
      : '-- items'

  const isCompliant = overallStatus === 'compliant'

  return (
    <div className="card p-5 sm:p-6 bg-white border border-brand-border h-full flex flex-col justify-between shadow-xs">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-border flex-shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-navy">
            Recommended action
          </h3>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-navy/60 font-mono">
            {itemsCountLabel}
          </span>
        </div>

        {/* Primary Banner Card */}
        <div className="mt-4">
          {isCompliant ? (
            /* Compliant State Banner */
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-navy flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-success text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-navy">
                  No action required
                </h4>
                <p className="text-[11px] sm:text-xs text-navy/65 leading-relaxed mt-0.5 font-medium">
                  No compliance issues requiring officer attention were identified by the current automated checks.
                </p>
              </div>
            </div>
          ) : (
            /* Default / Needs Review Banner */
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-extrabold text-navy font-mono block">
                  {recommendations[0]?.title || '--'}
                </span>
                <p className="text-[11px] sm:text-xs text-navy/60 leading-relaxed font-mono">
                  {recommendations[0]?.description || '--'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Checkpoints List */}
        <div className="mt-4 space-y-2.5">
          {DEFAULT_ACTION_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-brand-bg/50 border border-brand-border/70 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <span className="font-semibold text-navy/80 truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-navy/40 font-mono text-[11px] font-semibold flex-shrink-0">
                  {displayValue(item.value)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Primary CTA: Scan Another Label */}
      <div className="pt-6">
        <Link
          to="/scan"
          className="btn-primary w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <ScanLine className="w-4 h-4" />
          <span>Scan another label</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

