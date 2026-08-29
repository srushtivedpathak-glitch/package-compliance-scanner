import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ComplianceMetricCard from './ComplianceMetricCard'

/**
 * ComplianceSummary
 *
 * 5-card grid summarizing legal compliance results.
 */
export default function ComplianceSummary({ summary = {}, isLoading = false }) {
  const cards = [
    {
      id: 'total',
      label: 'Total Checks',
      value: summary.totalChecks ?? null,
      subtext: 'Declarations evaluated',
      icon: ShieldCheck,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-primary',
      borderColor: 'border-teal-primary/20',
    },
    {
      id: 'compliant',
      label: 'Compliant',
      value: summary.compliant ?? null,
      percentage: summary.compliantPercentage ?? null,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-brand-success',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'requires-review',
      label: 'Requires Review',
      value: summary.requiresReview ?? null,
      percentage: summary.requiresReviewPercentage ?? null,
      icon: AlertTriangle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-brand-warning',
      borderColor: 'border-amber-100',
    },
    {
      id: 'non-compliant',
      label: 'Non-Compliant',
      value: summary.nonCompliant ?? null,
      percentage: summary.nonCompliantPercentage ?? null,
      icon: XCircle,
      iconBg: 'bg-red-50',
      iconColor: 'text-brand-danger',
      borderColor: 'border-red-100',
    },
    {
      id: 'not-applicable',
      label: 'Not Applicable',
      value: summary.notApplicable ?? null,
      percentage: summary.notApplicablePercentage ?? null,
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className={index === 4 ? 'col-span-2 md:col-span-1' : ''}
        >
          <ComplianceMetricCard
            label={card.label}
            value={card.value}
            percentage={card.percentage}
            subtext={card.subtext}
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

