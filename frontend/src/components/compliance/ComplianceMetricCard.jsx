import { motion } from 'framer-motion'
import { displayValue, displayPercentage } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

/**
 * ComplianceMetricCard
 *
 * Displays a single compliance summary metric card.
 * Labels wrap naturally onto the next line on mobile devices without ellipsis clipping.
 */
export default function ComplianceMetricCard({
  label,
  value = null,
  percentage = null,
  subtext = null,
  icon: Icon,
  iconBg = 'bg-teal-50',
  iconColor = 'text-teal-primary',
  borderColor = 'border-brand-border/80',
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div
        className="card p-3.5 sm:p-5 flex flex-col justify-between min-h-[110px]"
        aria-busy="true"
      >
        <div className="flex items-center gap-2">
          <div className="skeleton w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex-shrink-0" />
          <div className="skeleton h-4 w-20 sm:w-24 rounded" />
        </div>
        <div className="skeleton h-7 w-12 sm:w-16 rounded mt-2.5" />
        <div className="skeleton h-3 w-20 sm:w-28 rounded mt-1.5" />
      </div>
    )
  }

  const formattedValue = displayValue(value)
  const formattedSubtext =
    subtext ||
    (percentage !== null
      ? `${displayPercentage(percentage)} of total`
      : '--% of total')

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className={cn(
        'card p-3 sm:p-4 xl:p-5 flex flex-col justify-between transition-all duration-200',
        'hover:shadow-card-hover hover:border-teal-primary/30 min-w-0 bg-white h-full',
        borderColor
      )}
    >
      {/* Top: Icon + Label (wraps down to next line on small screens) */}
      <div className="flex items-start sm:items-center gap-2 sm:gap-2.5 min-w-0">
        <div
          className={cn(
            'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5 sm:mt-0',
            iconBg
          )}
          aria-hidden="true"
        >
          <Icon className={cn('w-3.5 h-3.5 sm:w-4 sm:h-4', iconColor)} strokeWidth={2} />
        </div>
        <span className="text-xs sm:text-[13px] font-bold text-navy leading-snug whitespace-normal break-words flex-1">
          {label}
        </span>
      </div>

      {/* Center: Value */}
      <div className="mt-2 sm:mt-3 min-w-0">
        <span
          className={cn(
            'text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-none block',
            value !== null ? 'text-navy' : 'text-navy/60 font-mono'
          )}
        >
          {formattedValue}
        </span>
      </div>

      {/* Bottom: Subtext / Percentage (wraps down naturally) */}
      <div className="mt-1 sm:mt-1.5 min-w-0">
        <p className="text-[10px] sm:text-[11px] text-navy/45 font-medium leading-tight whitespace-normal break-words">
          {formattedSubtext}
        </p>
      </div>
    </motion.div>
  )
}
