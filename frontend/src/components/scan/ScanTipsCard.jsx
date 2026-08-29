import { useState } from 'react'
import { Focus, SunMedium, Maximize2, ShieldCheck, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

const TIPS = [
  {
    icon: Focus,
    text: 'Ensure all text is visible and in focus',
  },
  {
    icon: SunMedium,
    text: 'Avoid glare, shadows or extreme angles',
  },
  {
    icon: Maximize2,
    text: 'Use a minimum resolution of 1000 px',
  },
]

/**
 * ScanTipsCard
 *
 * Displays "For best results" recommendations and the privacy guarantee card.
 * On mobile, supports accordion collapse if desired or clean card stack.
 */
export default function ScanTipsCard() {
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState(true)

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ─── For Best Results Card ─── */}
      <div className="card p-5 xl:p-6 bg-white flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-navy">For best results</h3>

          {/* Mobile Accordion Toggle */}
          <button
            onClick={() => setIsMobileAccordionOpen((prev) => !prev)}
            className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-100 transition-colors"
            aria-label="Toggle best results tips"
          >
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isMobileAccordionOpen && 'rotate-180'
              )}
            />
          </button>
        </div>

        {/* Tips list */}
        <AnimatePresence initial={false}>
          {isMobileAccordionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-4"
            >
              {TIPS.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-light text-teal-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <p className="text-xs sm:text-[13px] text-navy/70 leading-relaxed font-medium">
                      {tip.text}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Privacy Notice Card ─── */}
      <div className="rounded-2xl bg-teal-50/70 border border-teal-primary/20 p-4 xl:p-5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-teal-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <ShieldCheck className="w-4.5 h-4.5" strokeWidth={2} />
        </div>
        <div>
          <h4 className="text-xs sm:text-[13px] font-bold text-navy mb-1">
            Your data stays private
          </h4>
          <p className="text-[11px] sm:text-xs text-navy/60 leading-relaxed">
            Images are used only for this inspection and are not stored beyond the process.
          </p>
        </div>
      </div>
    </div>
  )
}

