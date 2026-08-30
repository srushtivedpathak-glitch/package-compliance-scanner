import { motion } from 'framer-motion'
import { ScanLine, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import HomeInspectionIllustration from './HomeInspectionIllustration'

/** Animation variants */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

const fadeRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
}

/**
 * HeroSection
 *
 * Primary landing hero for Nirikshan dashboard.
 * Left: Workspace title, main headline, description, primary CTA.
 * Right: Professional Legal Metrology package & label inspection illustration.
 */
export default function HeroSection() {
  return (
    <section
      className="relative rounded-3xl bg-white border border-brand-border overflow-hidden
                 shadow-card-hover
                 px-6 sm:px-8 lg:px-10 xl:px-12 py-10 lg:py-12 mb-6 lg:mb-8"
      aria-label="Hero — Nirikshan inspection dashboard"
    >
      {/* Subtle background gradient blob */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full
                   bg-teal-primary/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-4 xl:gap-8">
        {/* ── LEFT: Copy ── */}
        <div className="flex-1 min-w-0 max-w-xl">
          {/* Overline */}
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest
                       uppercase text-teal-primary mb-4"
          >
            <span className="w-4 h-px bg-teal-primary" aria-hidden="true" />
            Digital Inspection Workspace
          </motion.p>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[60px] font-black leading-[1.08]
                       tracking-tight mb-5 text-balance"
          >
            <span className="text-navy block">Inspect labels.</span>
            <span className="text-teal-primary block">Protect consumers.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-[15px] xl:text-base text-navy/60 leading-relaxed mb-7 max-w-md"
          >
            Nirikshan helps legal metrology officers quickly verify packaged product labels
            against mandatory declarations under the Legal Metrology (Packaged Commodities){' '}
            <strong className="text-teal-primary font-semibold">Rules, 2011</strong> and flag
            potential non-compliance.
          </motion.p>

          {/* CTA */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/scan"
                className="btn-primary text-base sm:w-auto w-full justify-center shadow-md hover:shadow-lg"
                aria-label="Start a new label scan"
              >
                <ScanLine className="w-5 h-5" aria-hidden="true" />
                Start a new scan
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Sub-note */}
          <motion.p
            {...fadeUp(0.4)}
            className="flex items-center gap-1.5 mt-4 text-[13px] text-navy/45 font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-teal-primary flex-shrink-0" aria-hidden="true" />
            Scan product labels or upload images to get started
          </motion.p>
        </div>

        {/* ── RIGHT: New Legal Metrology Inspection Illustration ── */}
        <motion.div
          {...fadeRight}
          className="flex-shrink-0 w-full lg:w-[46%] xl:w-[48%] flex items-center justify-center
                     order-first lg:order-last"
          aria-hidden="true"
        >
          <HomeInspectionIllustration />
        </motion.div>
      </div>
    </section>
  )
}
