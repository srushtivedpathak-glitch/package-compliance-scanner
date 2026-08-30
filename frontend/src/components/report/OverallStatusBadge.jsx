import { CheckCircle2, AlertTriangle, XCircle, Loader2, Minus } from 'lucide-react'
import { cn } from '../../utils/cn'

const STATUS_CONFIG = {
  compliant: {
    label: 'Compliant',
    icon: CheckCircle2,
    bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    dot: 'bg-emerald-400',
  },
  'needs-review': {
    label: 'Needs review',
    icon: AlertTriangle,
    bg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    dot: 'bg-amber-400',
  },
  'non-compliant': {
    label: 'Non-compliant',
    icon: XCircle,
    bg: 'bg-red-500/20 text-red-300 border-red-400/30',
    dot: 'bg-red-400',
  },
  pending: {
    label: 'Processing',
    icon: Loader2,
    bg: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
    dot: 'bg-teal-400',
  },
  unavailable: {
    label: '--',
    icon: Minus,
    bg: 'bg-white/10 text-white/70 border-white/15',
    dot: 'bg-amber-400',
  },
}

/**
 * OverallStatusBadge
 *
 * Badge placed inside the Report Hero banner for high-contrast visibility.
 */
export default function OverallStatusBadge({ status = null }) {
  const key = status || 'unavailable'
  const config = STATUS_CONFIG[key] ?? STATUS_CONFIG.unavailable
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-xs select-none shadow-sm',
        config.bg
      )}
      aria-label={`Overall Status: ${config.label}`}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', config.dot)} aria-hidden="true" />
      <span className="leading-tight">{config.label}</span>
    </span>
  )
}

