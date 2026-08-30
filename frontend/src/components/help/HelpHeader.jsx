import { CircleHelp, CheckCircle2, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * HelpHeader
 *
 * Page header with overline, title, description, and lightweight vector illustration.
 */
export default function HelpHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      {/* Title & Description */}
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-teal-primary mb-1"
        >
          <CircleHelp className="w-3.5 h-3.5" />
          <span>HELP &amp; GUIDE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight"
        >
          Help &amp; Guide
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="text-xs sm:text-sm text-navy/60 mt-1 font-medium leading-relaxed"
        >
          Find step-by-step guides and best practices to use Nirikshan effectively for legal metrology inspections.
        </motion.p>
      </div>

      {/* Lightweight Decorative Vector Illustration (Desktop / Tablet) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="hidden md:flex items-center justify-center select-none pointer-events-none pr-2"
        aria-hidden="true"
      >
        <div className="relative w-20 h-22 rounded-2xl bg-teal-50/70 border border-teal-primary/20 p-2.5 flex flex-col justify-between shadow-2xs">
          {/* Clipboard top tab */}
          <div className="w-7 h-2 bg-teal-primary/30 rounded-full mx-auto" />

          {/* Center question badge */}
          <div className="w-9 h-9 rounded-full bg-teal-primary text-white flex items-center justify-center mx-auto my-auto shadow-sm">
            <HelpCircle className="w-5 h-5" strokeWidth={2.4} />
          </div>

          {/* Bottom check status */}
          <div className="flex items-center justify-between px-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-primary" />
            <div className="w-5 h-1 bg-teal-primary/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

