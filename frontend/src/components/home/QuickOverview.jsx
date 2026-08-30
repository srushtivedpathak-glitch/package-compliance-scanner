import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ScanLine,
  ShieldCheck,
  ShieldAlert,
  FileBarChart,
  ChevronDown,
  Calendar,
} from 'lucide-react'
import MetricCard from './MetricCard'
import ErrorState from '../common/ErrorState'

/** Time period options — extend as needed */
const TIME_PERIODS = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'quarter', label: 'This Quarter' },
  { id: 'year', label: 'This Year' },
]

/**
 * QuickOverview
 *
 * Dashboard statistics card with time period selector and 4 MetricCards.
 *
 * Props:
 *   stats         - DashboardStats object (null values → "----")
 *   isLoading     - show skeleton for all metrics
 *   error         - error message string
 *   onRetry       - retry callback
 */
export default function QuickOverview({ stats, isLoading, error, onRetry }) {
  const [period, setPeriod] = useState('month')
  const [periodOpen, setPeriodOpen] = useState(false)

  const currentPeriod = TIME_PERIODS.find((p) => p.id === period)

  const metrics = [
    {
      label: 'Scans Completed',
      value: stats?.scansCompleted ?? null,
      trendValue: stats?.scansGrowth != null ? `${stats.scansGrowth > 0 ? '+' : ''}${stats.scansGrowth}%` : null,
      trendLabel: 'from last month',
      trendDir: stats?.scansGrowth > 0 ? 'up' : stats?.scansGrowth < 0 ? 'down' : 'neutral',
      icon: ScanLine,
      iconBg: 'bg-teal-light',
      iconColor: 'text-teal-primary',
    },
    {
      label: 'Compliant',
      value: stats?.compliant ?? null,
      trendValue: stats?.compliantPercentage != null ? `${stats.compliantPercentage}%` : null,
      trendLabel: 'of total scans',
      trendDir: stats?.compliantPercentage > 70 ? 'up' : 'neutral',
      icon: ShieldCheck,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Non-Compliant',
      value: stats?.nonCompliant ?? null,
      trendValue: stats?.nonCompliantPercentage != null ? `${stats.nonCompliantPercentage}%` : null,
      trendLabel: 'of total scans',
      trendDir: stats?.nonCompliantPercentage > 20 ? 'down' : 'neutral',
      icon: ShieldAlert,
      iconBg: 'bg-red-50',
      iconColor: 'text-brand-danger',
    },
    {
      label: 'Reports Generated',
      value: stats?.reportsGenerated ?? null,
      trendValue: stats?.reportsGrowth != null ? `${stats.reportsGrowth > 0 ? '+' : ''}${stats.reportsGrowth}%` : null,
      trendLabel: 'from last month',
      trendDir: stats?.reportsGrowth > 0 ? 'up' : stats?.reportsGrowth < 0 ? 'down' : 'neutral',
      icon: FileBarChart,
      iconBg: 'bg-blue-50',
      iconColor: 'text-brand-info',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-brand-border flex-shrink-0">
        <h2 className="text-[15px] font-semibold text-navy">Quick overview</h2>

        {/* Period selector */}
        <div className="relative">
          <button
            onClick={() => setPeriodOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-border
                       text-xs font-semibold text-navy/70 hover:border-teal-primary/40 hover:text-navy
                       transition-all duration-150 bg-white shadow-sm"
            aria-haspopup="listbox"
            aria-expanded={periodOpen}
            aria-label={`Time period: ${currentPeriod?.label}`}
          >
            <Calendar className="w-3.5 h-3.5 text-navy/50" />
            {currentPeriod?.label}
            <ChevronDown
              className={`w-3 h-3 text-navy/40 transition-transform duration-150 ${periodOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {periodOpen && (
            <div
              className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-card-hover
                         border border-brand-border py-1 z-20 min-w-[140px]"
              role="listbox"
              aria-label="Select time period"
            >
              {TIME_PERIODS.map((p) => (
                <button
                  key={p.id}
                  role="option"
                  aria-selected={p.id === period}
                  onClick={() => { setPeriod(p.id); setPeriodOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors duration-100
                    ${p.id === period
                      ? 'text-teal-primary bg-teal-50'
                      : 'text-navy/60 hover:text-navy hover:bg-gray-50'
                    }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-center">
        {error ? (
          <ErrorState message={error} onRetry={onRetry} compact />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-2 sm:gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-brand-bg/60 rounded-xl border border-brand-border/60 min-w-0"
              >
                <MetricCard {...m} isLoading={isLoading} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
