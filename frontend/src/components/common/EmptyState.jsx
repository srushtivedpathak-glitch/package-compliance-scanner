import { ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * EmptyState
 *
 * Shown when the API returns successfully but with no data.
 * Distinguishable from error state and loading state.
 *
 * Props:
 *   icon        - optional Lucide icon component (defaults to ScanLine)
 *   title       - heading text
 *   description - supporting text
 *   ctaLabel    - button label
 *   onCta       - callback; if omitted and ctaPath provided, navigates to path
 *   ctaPath     - route path for default navigation
 */
export default function EmptyState({
  icon: Icon = ScanLine,
  title = 'No inspection data available yet.',
  description = 'Start scanning packaged product labels to see compliance data here.',
  ctaLabel = 'Start your first scan',
  onCta,
  ctaPath = '/scan',
}) {
  const navigate = useNavigate()

  const handleCta = () => {
    if (onCta) {
      onCta()
    } else {
      navigate(ctaPath)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center py-14 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-teal-light flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-teal-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-semibold text-navy mb-1">{title}</h3>
      <p className="text-sm text-navy/50 max-w-xs mb-5">{description}</p>
      <button
        onClick={handleCta}
        className="btn-primary text-sm px-5 py-2.5"
      >
        {ctaLabel}
      </button>
    </motion.div>
  )
}

