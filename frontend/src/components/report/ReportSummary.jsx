import { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  ChevronDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { displayValue } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

const SUMMARY_ITEMS = [
  {
    id: 'totalChecks',
    label: 'Total Checks',
    icon: ShieldCheck,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-primary',
    border: 'border-teal-primary/20',
  },
  {
    id: 'compliant',
    label: 'Compliant',
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-brand-success',
    border: 'border-emerald-100',
  },
  {
    id: 'requiresReview',
    label: 'Requires Review',
    icon: AlertTriangle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
    border: 'border-amber-100',
  },
  {
    id: 'nonCompliant',
    label: 'Non-Compliant',
    icon: XCircle,
    iconBg: 'bg-red-50',
    iconColor: 'text-brand-danger',
    border: 'border-red-100',
  },
  {
    id: 'notApplicable',
    label: 'Not Applicable',
    icon: Info,
    iconBg: 'bg-blue-50',
    iconColor: 'text-brand-info',
    border: 'border-blue-100',
  },
]

/**
 * ReportSummary
 *
 * "Summary at a glance" section with 5 responsive metric cards.
 * On mobile, supports accordion collapse if needed.
 */
export default function ReportSummary({ report = {}, isLoading = false }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-navy">
          Summary at a glance
        </h3>

        {/* Mobile Accordion Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-100 transition-colors"
          aria-label="Toggle summary cards"
        >
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* 5-Card Metric Grid */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {SUMMARY_ITEMS.map((item, index) => {
              const Icon = item.icon
              const val = report[item.id] ?? null

              return (
                <div
                  key={item.id}
                  className={cn(
                    'card p-4 sm:p-5 flex items-center gap-3.5 bg-white border transition-all duration-200 hover:shadow-card-hover min-w-0',
                    item.border,
                    index === 4 ? 'col-span-2 md:col-span-1' : ''
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs',
                      item.iconBg
                    )}
                  >
                    <Icon className={cn('w-5 h-5', item.iconColor)} strokeWidth={2} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight block leading-none font-mono">
                      {displayValue(val)}
                    </span>
                    <p className="text-xs sm:text-[13px] font-semibold text-navy/65 mt-1 leading-snug whitespace-normal break-words">
                      {item.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

