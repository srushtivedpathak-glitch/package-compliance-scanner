import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Eye,
  Tag,
  Scale,
  IndianRupee,
  CalendarDays,
  Building2,
  Headphones,
  Type,
  LayoutGrid,
  Eye as EyeIcon,
  Hash,
} from 'lucide-react'
import ComplianceStatusBadge from './ComplianceStatusBadge'
import { displayValue } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

const ICON_MAP = {
  'common-name': Tag,
  'net-quantity': Scale,
  mrp: IndianRupee,
  'mfg-date': CalendarDays,
  'manufacturer-packer': Building2,
  'consumer-care': Headphones,
  'font-size': Type,
  'declaration-placement': LayoutGrid,
  'legibility-contrast': EyeIcon,
  'unit-format': Hash,
}

/**
 * ComplianceResultCard
 *
 * Mobile expandable accordion card for a single rule check result.
 */
export default function ComplianceResultCard({ check, onViewDetails, onOpenRuleModal }) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = ICON_MAP[check.key] || Tag

  return (
    <div className="card border border-brand-border bg-white overflow-hidden shadow-2xs">
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-gray-50/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-teal-light text-teal-primary flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-navy truncate">
              {check.title}
            </h4>
            <span className="text-[11px] font-mono text-teal-primary block mt-0.5">
              {check.ruleReference}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <ComplianceStatusBadge status={check.status} />
          <ChevronDown
            className={cn(
              'w-4 h-4 text-navy/40 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Accordion Expanded Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-brand-border bg-gray-50/40 p-4 space-y-3"
          >
            {/* Applicability & Extracted Value */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-brand-border">
                <span className="text-[10px] text-navy/50 font-semibold block mb-0.5">
                  Applicability
                </span>
                <span className="font-bold text-navy">
                  {displayValue(check.applicability)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-brand-border">
                <span className="text-[10px] text-navy/50 font-semibold block mb-0.5">
                  Extracted Value
                </span>
                <span className="font-bold text-navy truncate block">
                  {displayValue(check.extractedValue)}
                </span>
              </div>
            </div>

            {/* Remarks */}
            <div className="p-2.5 rounded-lg bg-white border border-brand-border text-xs text-navy/70 leading-relaxed">
              <span className="text-[10px] text-navy/50 font-semibold block mb-0.5">
                Evaluation Remarks
              </span>
              <p>{displayValue(check.remarks)}</p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => onOpenRuleModal && onOpenRuleModal(check.ruleReference)}
                className="text-[11px] font-semibold text-teal-primary hover:underline"
              >
                View rule details →
              </button>

              <button
                type="button"
                onClick={() => onViewDetails(check)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-border text-xs font-bold text-navy hover:bg-gray-100 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-teal-primary" />
                <span>Full Details</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

