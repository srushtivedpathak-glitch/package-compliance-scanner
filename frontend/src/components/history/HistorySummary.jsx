import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react'
import { motion } from 'framer-motion'
import HistoryMetricCard from './HistoryMetricCard'

/**
 * HistorySummary
 *
 * 5-card grid summarizing overall database inspection metrics.
 */
export default function HistorySummary({ summary = {}, isLoading = false }) {
  const cards = [
    {
      id: 'total',
      label: 'Total Inspections',
      value: summary.total ?? null,
      icon: ClipboardList,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-primary',
      borderColor: 'border-teal-primary/20',
    },
    {
      id: 'compliant',
      label: 'Compliant',
      value: summary.compliant ?? null,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-brand-success',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'needsReview',
      label: 'Needs Review',
      value: summary.needsReview ?? null,
      icon: AlertTriangle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-brand-warning',
      borderColor: 'border-amber-100',
    },
    {
      id: 'nonCompliant',
      label: 'Non-Compliant',
      value: summary.nonCompliant ?? null,
      icon: XCircle,
      iconBg: 'bg-red-50',
      iconColor: 'text-brand-danger',
      borderColor: 'border-red-100',
    },
    {
      id: 'notApplicable',
      label: 'Not Applicable',
      value: summary.notApplicable ?? null,
      icon: Info,
      iconBg: 'bg-blue-50',
      iconColor: 'text-brand-info',
      borderColor: 'border-blue-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className={index === 4 ? 'col-span-2 md:col-span-1' : ''}
        >
          <HistoryMetricCard
            label={card.label}
            value={card.value}
            icon={card.icon}
            iconBg={card.iconBg}
            iconColor={card.iconColor}
            borderColor={card.borderColor}
            isLoading={isLoading}
          />
        </motion.div>
      ))}
    </div>
  )
}

