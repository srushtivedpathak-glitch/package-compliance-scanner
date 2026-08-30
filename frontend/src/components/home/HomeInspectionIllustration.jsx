import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * HomeInspectionIllustration
 *
 * Professional Legal Metrology inspection illustration for the Home hero section.
 * Visual sequence: Product Package -> Label Inspection -> Mandatory Checklist -> Compliance Shield.
 */
export default function HomeInspectionIllustration() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[560px] mx-auto aspect-[16/11] select-none flex items-center justify-center"
      aria-hidden="true"
    >
      {/* ─── Layer 0: Background Decor (Leaves & Dot Grid) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft mint leaves behind the box and clipboard */}
        <svg
          viewBox="0 0 200 200"
          className="absolute left-[16%] top-[10%] w-44 h-44 text-teal-primary/15 transform -rotate-12 pointer-events-none"
          fill="currentColor"
        >
          {/* Leaf 1 */}
          <path d="M40,160 Q80,60 160,40 Q140,120 40,160 Z" className="opacity-80" />
          {/* Leaf 2 */}
          <path d="M60,170 Q10,100 40,50 Q90,90 60,170 Z" className="opacity-60" />
          {/* Leaf 3 */}
          <path d="M50,165 Q110,130 150,110 Q110,160 50,165 Z" className="opacity-70" />
        </svg>

        {/* Dot Matrix Pattern (Top Right) */}
        <div className="absolute right-[8%] top-[12%] grid grid-cols-4 gap-2 opacity-25">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-primary" />
          ))}
        </div>

        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-x-12 top-10 bottom-4 bg-gradient-to-tr from-teal-500/10 via-emerald-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* ─── Layer 1: Inspection Clipboard (Center-Right Background) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[8%] sm:right-[10%] top-[4%] w-[250px] sm:w-[270px] z-10"
      >
        {/* Clipboard Body */}
        <div className="relative bg-[#334155] rounded-3xl p-3 sm:p-3.5 pt-7 shadow-2xl border-2 border-[#1E293B]">
          {/* Metal Hanging Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#475569] rounded-xl border-2 border-[#1E293B] flex items-center justify-center shadow-md">
            <div className="w-8 h-2 rounded-full bg-[#1E293B]/60" />
          </div>

          {/* White Paper Document */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-gray-100 flex flex-col gap-2.5">
            {/* Header Banner */}
            <div className="bg-[#0F8F83] text-white py-1.5 px-3 rounded-lg text-center shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase block leading-none">
                LABEL INSPECTION
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-1">
              {[
                'Mandatory Declarations',
                'Net Quantity',
                'MRP',
                'Mfg. / Pkd. Date',
                'Manufacturer Details',
                'Consumer Care Info',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3.5] stroke-current fill-none"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#1E293B] truncate leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Layer 2: Neutral Cardboard Commodity Package (Center-Left Foreground) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[4%] sm:left-[8%] bottom-[6%] w-[210px] sm:w-[235px] z-20"
      >
        {/* 3D-styled Cardboard Box */}
        <div className="relative bg-[#D4A373] rounded-2xl shadow-2xl border-t-2 border-l-2 border-[#E6BA8E] border-r-2 border-b-2 border-[#B07D4F] p-3.5 pb-4">
          {/* Top tape/crease line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#C18E5E]/70 rounded-b" />

          {/* White Declaration Label with Subtle Scanner Line */}
          <div className="relative bg-white rounded-xl p-3 shadow-md border border-gray-200/80 overflow-hidden">
            {/* Animated Laser Scanning Line */}
            <motion.div
              animate={{ y: [0, 80, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.8,
              }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-primary to-transparent opacity-40 pointer-events-none"
            />

            {/* Label Content Rows */}
            <div className="space-y-1.5 text-[8.5px] sm:text-[9.5px] font-bold text-navy">
              {/* Row 1: Net Quantity */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                <span className="text-navy/50 text-[7.5px] sm:text-[8px] font-extrabold uppercase tracking-tight">
                  NET QUANTITY
                </span>
                <span className="font-extrabold text-navy">1 kg</span>
              </div>

              {/* Row 2: MRP */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-1">
                <div>
                  <span className="text-navy/50 text-[7.5px] sm:text-[8px] font-extrabold uppercase tracking-tight block leading-none">
                    MRP
                  </span>
                  <span className="text-[6.5px] text-navy/40 font-semibold block leading-tight">
                    (INCL. OF ALL TAXES)
                  </span>
                </div>
                <span className="font-extrabold text-navy leading-none mt-0.5">₹120.00</span>
              </div>

              {/* Row 3: Mfg Date */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                <span className="text-navy/50 text-[7.5px] sm:text-[8px] font-extrabold uppercase tracking-tight">
                  MFG. DATE
                </span>
                <span className="font-extrabold text-navy">12/04/2024</span>
              </div>

              {/* Row 4: Batch No */}
              <div className="flex items-center justify-between">
                <span className="text-navy/50 text-[7.5px] sm:text-[8px] font-extrabold uppercase tracking-tight">
                  BATCH NO.
                </span>
                <span className="font-extrabold text-navy">BR120424</span>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-1.5 flex items-center justify-center gap-[2px] opacity-80" aria-hidden="true">
                <div className="w-[1.5px] h-4 bg-navy rounded-full" />
                <div className="w-[3px] h-4 bg-navy rounded-full" />
                <div className="w-[1px] h-4 bg-navy rounded-full" />
                <div className="w-[2.5px] h-4 bg-navy rounded-full" />
                <div className="w-[1px] h-4 bg-navy rounded-full" />
                <div className="w-[3px] h-4 bg-navy rounded-full" />
                <div className="w-[1.5px] h-4 bg-navy rounded-full" />
                <div className="w-[2px] h-4 bg-navy rounded-full" />
                <div className="w-[1px] h-4 bg-navy rounded-full" />
                <div className="w-[3.5px] h-4 bg-navy rounded-full" />
                <div className="w-[1px] h-4 bg-navy rounded-full" />
                <div className="w-[2px] h-4 bg-navy rounded-full" />
                <div className="w-[1px] h-4 bg-navy rounded-full" />
                <div className="w-[2.5px] h-4 bg-navy rounded-full" />
                <div className="w-[1.5px] h-4 bg-navy rounded-full" />
                <div className="w-[3px] h-4 bg-navy rounded-full" />
                <div className="w-[1px] h-4 bg-navy rounded-full" />
                <div className="w-[2px] h-4 bg-navy rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Layer 3: Magnifying Glass (Right Foreground) ─── */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[4%] sm:right-[6%] top-[28%] z-30 pointer-events-none"
      >
        <motion.div
          animate={isHovered ? { x: -6, y: 4, scale: 1.04 } : { y: [0, -4, 0] }}
          transition={
            isHovered
              ? { duration: 0.25 }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative"
        >
          {/* Glass Rim and Lens */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/90 border-[7px] border-[#334155] shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-xs">
            {/* Inner Refraction Ring */}
            <div className="absolute inset-0 rounded-full border border-sky-200/50 bg-gradient-to-tr from-sky-400/10 via-transparent to-white/40 pointer-events-none" />

            {/* Stylized QR Code Matrix Graphic inside Lens */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 grid grid-cols-5 gap-1 p-1 bg-white/80 rounded-lg shadow-inner opacity-75">
              <div className="bg-[#334155] rounded-xs col-span-2 row-span-2" />
              <div className="bg-[#334155] rounded-xs" />
              <div className="bg-[#334155] rounded-xs col-span-2 row-span-2" />
              <div className="bg-[#334155] rounded-xs" />
              <div className="bg-[#334155] rounded-xs" />
              <div className="bg-[#334155] rounded-xs" />
              <div className="bg-[#334155] rounded-xs col-span-2 row-span-2" />
              <div className="bg-[#334155] rounded-xs" />
              <div className="bg-[#334155] rounded-xs" />
              <div className="bg-[#334155] rounded-xs" />
            </div>
          </div>

          {/* Ergonomic Handle */}
          <div className="absolute -bottom-7 -right-5 w-6 h-12 sm:w-7 sm:h-14 bg-[#1E293B] rounded-full transform -rotate-45 shadow-xl border-t border-[#475569]" />
        </motion.div>
      </motion.div>

      {/* ─── Layer 4: Compliance Shield with Checkmark (Bottom-Right Foreground) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute right-[16%] sm:right-[18%] bottom-[6%] z-40"
      >
        <div className="relative w-14 h-16 sm:w-16 sm:h-18 rounded-2xl bg-gradient-to-b from-[#10B981] to-[#059669] p-1.5 shadow-2xl flex items-center justify-center border-2 border-emerald-300 transform hover:scale-105 transition-transform duration-200">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3.5] stroke-white fill-none drop-shadow-md"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

