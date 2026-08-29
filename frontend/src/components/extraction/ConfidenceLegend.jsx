import { CheckCircle2, AlertTriangle, AlertOctagon, Minus } from 'lucide-react'

const LEGEND_ITEMS = [
  { label: 'High confidence', icon: CheckCircle2, color: 'text-brand-success' },
  { label: 'Medium confidence', icon: AlertTriangle, color: 'text-brand-warning' },
  { label: 'Low confidence', icon: AlertOctagon, color: 'text-brand-danger' },
  { label: 'Not detected', icon: Minus, color: 'text-navy/40' },
]

/**
 * ConfidenceLegend
 *
 * Horizontal legend explaining confidence status icons and levels.
 */
export default function ConfidenceLegend() {
  return (
    <div
      className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs text-navy/60 font-medium py-2 px-3"
      role="note"
      aria-label="Confidence score legend"
    >
      {LEGEND_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="flex items-center gap-1.5">
            <Icon className={`w-3.5 h-3.5 ${item.color}`} strokeWidth={2.2} />
            <span>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

