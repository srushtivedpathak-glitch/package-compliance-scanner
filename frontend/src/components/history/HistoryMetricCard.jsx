import { motion } from 'framer-motion'
import { displayValue } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

/**
 * HistoryMetricCard
 *
 * Displays a single summary card for inspection history statistics.
 */
export default function HistoryMetricCard({
  label,
  value = null,
  icon: Icon,
  iconBg = 'bg-teal-50',
  iconColor = 'text-teal-primary',
  borderColor = 'border-brand-border/80',
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="card p-3.5 sm:p-5 flex items-center gap-3.5 min-h-[82px] bg-white border" aria-busy="true">
        <div className="skeleton w-9 h-9 rounded-xl flex-shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="skeleton h-6 w-12 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      </div>
    )
  }

  const formattedValue = displayValue(value)

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className={cn(
        'card p-3.5 sm:p-4 xl:p-5 flex items-center gap-3.5 transition-all duration-200',
        'hover:shadow-card-hover hover:border-teal-primary/30 min-w-0 bg-white h-full border',
        borderColor
      )}
    >
      <div
        className={cn(
          'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs',
          iconBg
        )}
        aria-hidden="true"
      >
        <Icon className={cn('w-4 h-4 sm:w-5 sm:h-5', iconColor)} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={cn(
            'text-xl sm:text-2xl font-extrabold tracking-tight leading-none block',
            value !== null ? 'text-navy' : 'text-navy/60 font-mono'
          )}
        >
          {formattedValue}
        </span>
        <p className="text-xs sm:text-[13px] font-semibold text-navy/65 mt-1 leading-snug whitespace-normal break-words">
          {label}
        </p>
      </div>
    </motion.div>
  )
}

