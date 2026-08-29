import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, CheckCircle2, AlertCircle, Info, Lightbulb, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * GuideAccordion
 *
 * Expandable workflow guide container with step-by-step instructions,
 * tips, and legal context notes.
 */
export default function GuideAccordion({
  guide,
  isOpen = false,
  isHighlighted = false,
  onToggle,
}) {
  return (
    <div
      id={guide.id}
      className={cn(
        'card bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
        isOpen
          ? 'border-teal-primary/50 shadow-sm bg-teal-50/10'
          : 'border-brand-border/90 hover:border-teal-primary/30',
        isHighlighted && 'ring-3 ring-teal-primary/30 border-teal-primary shadow-md'
      )}
    >
      {/* Accordion Header Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`content-${guide.id}`}
        className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
          {/* Number Badge */}
          <span
            className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-colors duration-200',
              isOpen
                ? 'bg-teal-primary text-white shadow-2xs'
                : 'bg-teal-50 text-teal-primary border border-teal-primary/20'
            )}
          >
            {guide.number}
          </span>

          {/* Guide Title */}
          <span className="text-xs sm:text-sm font-bold text-navy whitespace-normal break-words leading-snug">
            {guide.title}
          </span>
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-navy/40 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180 text-teal-primary'
          )}
        />
      </button>

      {/* Accordion Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`content-${guide.id}`}
            role="region"
            aria-labelledby={`heading-${guide.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-brand-border/60 text-xs sm:text-[13px] text-navy/75 leading-relaxed">
              {/* Optional Overview paragraph */}
              {guide.overview && (
                <p className="font-medium text-navy/80 leading-relaxed">
                  {guide.overview}
                </p>
              )}

              {/* Numbered Steps */}
              {guide.steps && guide.steps.length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="font-bold text-navy text-xs uppercase tracking-wider text-[11px]">
                    Step-by-step workflow:
                  </p>
                  <ol className="space-y-2 pl-1">
                    {guide.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="flex-1 font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Visual Checklist (Guide 02) */}
              {guide.checklist && (
                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-brand-border/70 space-y-2">
                  <p className="font-bold text-navy text-xs">Best image quality tips:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {guide.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-navy/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-success flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Definitions (Guide 04) */}
              {guide.statuses && (
                <div className="space-y-2 pt-1">
                  <p className="font-bold text-navy text-xs uppercase tracking-wider text-[11px]">
                    Compliance Status Meanings:
                  </p>
                  <div className="space-y-2">
                    {guide.statuses.map((st, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-brand-border/80 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3"
                      >
                        <span
                          className={cn(
                            'text-xs font-bold px-2.5 py-0.5 rounded-lg border w-fit flex-shrink-0',
                            st.color
                          )}
                        >
                          {st.name}
                        </span>
                        <span className="text-xs text-navy/70 font-medium">
                          {st.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Columns Info (Guide 06) */}
              {guide.columnsInfo && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {guide.columnsInfo.map((col, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-brand-border/70">
                      <p className="text-xs font-bold text-navy">{col.title}</p>
                      <p className="text-[11px] text-navy/60 mt-1 font-medium leading-relaxed">
                        {col.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tip Callout */}
              {guide.tip && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-navy">
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed font-medium">
                    <span className="font-bold text-navy">Tip: </span>
                    {guide.tip}
                  </p>
                </div>
              )}

              {/* Important Legal/Technical Notice */}
              {guide.importantNotice && (
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-navy">
                  <Info className="w-4 h-4 text-brand-info flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed font-medium">
                    <span className="font-bold text-navy">Notice: </span>
                    {guide.importantNotice}
                  </p>
                </div>
              )}

              {/* General Note */}
              {guide.note && (
                <div className="p-3 rounded-xl bg-gray-50 border border-brand-border flex items-start gap-2.5 text-navy/70">
                  <Info className="w-4 h-4 text-navy/40 flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed font-medium">
                    {guide.note}
                  </p>
                </div>
              )}

              {/* Optional CTA Button */}
              {guide.actionButton && (
                <div className="pt-2">
                  <Link
                    to={guide.actionButton.path}
                    className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{guide.actionButton.label}</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

