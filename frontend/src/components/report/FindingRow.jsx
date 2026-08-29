import { ChevronRight, CheckCircle2, AlertTriangle, XCircle, Info, Minus } from 'lucide-react'
import { displayValue } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

const STATUS_CONFIG = {
  compliant: {
    icon: CheckCircle2,
    iconColor: 'text-brand-success',
    badgeText: 'text-brand-success',
    label: 'Passed',
  },
  'needs-review': {
    icon: AlertTriangle,
    iconColor: 'text-brand-warning',
    badgeText: 'text-brand-warning',
    label: 'Needs review',
  },
  'requires-review': {
    icon: AlertTriangle,
    iconColor: 'text-brand-warning',
    badgeText: 'text-brand-warning',
    label: 'Needs review',
  },
  'non-compliant': {
    icon: XCircle,
    iconColor: 'text-brand-danger',
    badgeText: 'text-brand-danger',
    label: 'Non-compliant',
  },
  'not-applicable': {
    icon: Info,
    iconColor: 'text-brand-info',
    badgeText: 'text-brand-info',
    label: 'Not applicable',
  },
  'not-detected': {
    icon: Minus,
    iconColor: 'text-navy/40',
    badgeText: 'text-navy/40',
    label: 'Not detected',
  },
  unavailable: {
    icon: Minus,
    iconColor: 'text-navy/35',
    badgeText: 'text-navy/40 font-mono',
    label: '--',
  },
}

/**
 * FindingRow
 *
 * Single finding row inside the Findings card.
 */
export default function FindingRow({ finding, onClick }) {
  const statusKey = finding?.status || 'unavailable'
  const config = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.unavailable
  const Icon = config.icon

  return (
    <button
      type="button"
      onClick={() => onClick && onClick(finding)}
      className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-gray-50/70 border-b border-brand-border last:border-0 transition-colors group cursor-pointer"
      aria-label={`View details for ${finding.title}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Icon className={cn('w-4 h-4 flex-shrink-0', config.iconColor)} strokeWidth={2.2} />
        <span className="text-xs sm:text-[13px] font-bold text-navy whitespace-normal break-words leading-snug">
          {finding.title}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={cn('text-xs font-semibold select-none', config.badgeText)}>
          {displayValue(finding.status ? config.label : null)}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-navy/30 group-hover:text-teal-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </button>
  )
}

