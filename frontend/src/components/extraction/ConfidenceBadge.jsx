import { CheckCircle2, AlertTriangle, AlertOctagon, Minus } from 'lucide-react'
import { getConfidenceLevel, displayConfidence } from '../../utils/confidenceUtils'
import { cn } from '../../utils/cn'

const BADGE_CONFIG = {
  high: {
    label: 'High confidence',
    icon: CheckCircle2,
    textColor: 'text-brand-success',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  medium: {
    label: 'Medium confidence',
    icon: AlertTriangle,
    textColor: 'text-brand-warning',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  low: {
    label: 'Low confidence',
    icon: AlertOctagon,
    textColor: 'text-brand-danger',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  unknown: {
    label: 'Not detected',
    icon: Minus,
    textColor: 'text-navy/40',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200',
  },
}

/**
 * ConfidenceBadge
 *
 * Renders an accessible icon + text badge for extraction confidence.
 * Defaults to `--% confidence` when score is null.
 */
export default function ConfidenceBadge({ confidence = null, showText = true }) {
  const level = getConfidenceLevel(confidence)
  const config = BADGE_CONFIG[level]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold select-none',
        config.bgColor,
        config.textColor
      )}
      title={`${config.label} (${displayConfidence(confidence)})`}
      aria-label={`${config.label}: ${displayConfidence(confidence)}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.2} />
      {showText && (
        <span className="leading-tight">
          {displayConfidence(confidence)} confidence
        </span>
      )}
    </div>
  )
}

