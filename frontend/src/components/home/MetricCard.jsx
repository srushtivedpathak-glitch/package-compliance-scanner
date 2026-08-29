import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../utils/cn'
import SkeletonLoader from '../common/SkeletonLoader'

/**
 * MetricCard
 *
 * Displays a single dashboard statistic with icon, value, label, and trend.
 * Layout matches the reference design:
 *   Row 1: [Circular Icon]  [Large Value / "----"]
 *   Row 2: [Label, e.g. "Scans Completed"]
 *   Row 3: [Trend, e.g. "↗ ---- from last month"]
 *
 * Designed with defensive CSS (min-w-0, responsive typography, flex-wrap)
 * to prevent any overlapping on laptop or mobile screens.
 */
export default function MetricCard({
  label,
  value,
  trendValue,
  trendLabel,
  trendDir = 'neutral',
  icon: Icon,
  iconBg = 'bg-teal-light',
  iconColor = 'text-teal-primary',
  isLoading = false,
}) {
  if (isLoading) {
    return <SkeletonLoader.MetricCard />
  }

  const displayValue = value != null ? value.toLocaleString('en-IN') : '----'
  const displayTrend = trendValue != null ? trendValue : '----'

  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: 'text-brand-success',
    },
    down: {
      icon: TrendingDown,
      color: 'text-brand-danger',
    },
    neutral: {
      icon: Minus,
      color: 'text-navy/40',
    },
  }

  const trend = trendConfig[trendDir] ?? trendConfig.neutral
  const TrendIcon = trend.icon

  return (
    <div
      className="flex flex-col justify-between p-3.5 sm:p-4 min-w-0 w-full rounded-xl transition-colors hover:bg-gray-50/50"
      aria-label={`${label}: ${displayValue}`}
    >
      {/* Row 1: Icon + Value side by side */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div
          className={cn(
            'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm',
            iconBg
          )}
          aria-hidden="true"
        >
          <Icon className={cn('w-4 h-4 sm:w-[18px] sm:h-[18px]', iconColor)} strokeWidth={2} />
        </div>
        <span
          className={cn(
            'text-xl sm:text-2xl xl:text-2xl 2xl:text-3xl font-bold tracking-tight leading-none truncate',
            value != null ? 'text-navy' : 'text-navy/60 font-mono'
          )}
        >
          {displayValue}
        </span>
      </div>

      {/* Row 2: Metric Label */}
      <div className="mt-2.5 sm:mt-3 min-w-0">
        <p className="text-xs sm:text-[13px] font-semibold text-navy/70 truncate leading-snug">
          {label}
        </p>
      </div>

      {/* Row 3: Trend indicator */}
      {trendLabel && (
        <div className="flex items-center gap-1 mt-1 min-w-0 text-[10px] sm:text-[11px] leading-tight text-navy/45">
          <TrendIcon
            className={cn('w-3 h-3 flex-shrink-0', value != null ? trend.color : 'text-navy/35')}
            aria-hidden="true"
          />
          <span
            className={cn(
              'font-semibold flex-shrink-0',
              value != null ? trend.color : 'text-navy/40'
            )}
          >
            {displayTrend}
          </span>
          <span className="truncate">{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
