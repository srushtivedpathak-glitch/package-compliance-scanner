import { motion } from 'framer-motion'

/**
 * ScanLabelIllustration
 *
 * Professional Legal Metrology label-inspection illustration designed specifically
 * for the Scan Label upload / drop-zone area.
 * Visual sequence: Package Label -> Scan/Inspect -> Extract Declarations -> Compliance Check.
 */
export default function ScanLabelIllustration({ isDragActive = false }) {
  return (
    <div
      className={`relative w-full max-w-[320px] sm:max-w-[370px] aspect-[16/10] select-none flex items-center justify-center mb-4 sm:mb-5 transition-opacity duration-200 ${
        isDragActive ? 'opacity-50' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* ─── Layer 0: Background Decor (Soft Mint Leaves & Dot Grid) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft mint leaves behind clipboard and box */}
        <svg
          viewBox="0 0 200 200"
          className="absolute left-[12%] top-[8%] w-36 h-36 text-teal-primary/15 transform -rotate-12 pointer-events-none"
          fill="currentColor"
        >
          <path d="M40,160 Q80,60 160,40 Q140,120 40,160 Z" className="opacity-80" />
          <path d="M60,170 Q10,100 40,50 Q90,90 60,170 Z" className="opacity-60" />
          <path d="M50,165 Q110,130 150,110 Q110,160 50,165 Z" className="opacity-70" />
        </svg>

        {/* Top-Right Dot Grid */}
        <div className="absolute right-[10%] top-[10%] grid grid-cols-4 gap-1.5 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-primary" />
          ))}
        </div>

        {/* Soft Ambient Radial Blur */}
        <div className="absolute inset-x-8 top-6 bottom-2 bg-gradient-to-tr from-teal-500/10 via-emerald-500/5 to-transparent rounded-full blur-xl pointer-events-none" />
      </div>

      {/* ─── Layer 1: Inspection Clipboard (Center-Back) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[10%] sm:right-[12%] top-[2%] w-[190px] sm:w-[215px] z-10"
      >
        {/* Clipboard Frame */}
        <div className="relative bg-[#334155] rounded-2xl p-2.5 sm:p-3 pt-5 sm:pt-6 shadow-xl border-2 border-[#1E293B]">
          {/* Metal Hanging Clip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-18 sm:w-20 h-6 bg-[#475569] rounded-lg border-2 border-[#1E293B] flex items-center justify-center shadow-md">
            <div className="w-6 h-1.5 rounded-full bg-[#1E293B]/60" />
          </div>

          {/* White Checklist Document Sheet */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100 flex flex-col gap-1.5">
            {/* Header Banner */}
            <div className="bg-[#0F8F83] text-white py-1 px-2 rounded-md text-center shadow-2xs">
              <span className="text-[8.5px] sm:text-[9.5px] font-extrabold tracking-wider uppercase block leading-none">
                LABEL INSPECTION
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-1.5 pt-0.5">
              {[
                'Mandatory Declarations',
                'Net Quantity',
                'MRP',
                'Mfg. / Pkd. Date',
                'Manufacturer Details',
                'Consumer Care Info',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5] stroke-current fill-none"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold text-[#1E293B] truncate leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Layer 2: Neutral Cardboard Commodity Package (Front-Left) ─── */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[6%] sm:left-[10%] bottom-[4%] w-[160px] sm:w-[185px] z-20"
      >
        {/* Cardboard Box Body */}
        <div className="relative bg-[#D4A373] rounded-xl shadow-xl border-t-2 border-l-2 border-[#E6BA8E] border-r-2 border-b-2 border-[#B07D4F] p-2.5 pb-3">
          {/* Top Tape Crease */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#C18E5E]/70 rounded-b" />

          {/* White Declaration Label */}
          <div className="relative bg-white rounded-lg p-2 sm:p-2.5 shadow-sm border border-gray-200/80 overflow-hidden">
            {/* Animated Laser Scanning Line */}
            <motion.div
              animate={{ y: [0, 60, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.8,
              }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-primary to-transparent opacity-40 pointer-events-none"
            />

            {/* Label Fields */}
            <div className="space-y-1 text-[7px] sm:text-[8px] font-bold text-navy">
              {/* Row 1: Net Quantity */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-0.5">
                <span className="text-navy/50 text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-tight">
                  NET QUANTITY
                </span>
                <span className="font-extrabold text-navy">1 kg</span>
              </div>

              {/* Row 2: MRP */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-0.5">
                <div>
                  <span className="text-navy/50 text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-tight block leading-none">
                    MRP
                  </span>
                  <span className="text-[5.5px] text-navy/40 font-semibold block leading-tight">
                    (INCL. OF ALL TAXES)
                  </span>
                </div>
                <span className="font-extrabold text-navy leading-none mt-0.5">₹120.00</span>
              </div>

              {/* Row 3: Mfg Date */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-0.5">
                <span className="text-navy/50 text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-tight">
                  MFG. DATE
                </span>
                <span className="font-extrabold text-navy">12/04/2024</span>
              </div>

              {/* Row 4: Batch No */}
              <div className="flex items-center justify-between">
                <span className="text-navy/50 text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-tight">
                  BATCH NO.
                </span>
                <span className="font-extrabold text-navy">BR120424</span>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-1 flex items-center justify-center gap-[1.5px] opacity-80" aria-hidden="true">
                <div className="w-[1px] h-3 bg-navy rounded-full" />
                <div className="w-[2px] h-3 bg-navy rounded-full" />
                <div className="w-[1px] h-3 bg-navy rounded-full" />
                <div className="w-[2px] h-3 bg-navy rounded-full" />
                <div className="w-[1px] h-3 bg-navy rounded-full" />
                <div className="w-[2.5px] h-3 bg-navy rounded-full" />
                <div className="w-[1px] h-3 bg-navy rounded-full" />
                <div className="w-[1.5px] h-3 bg-navy rounded-full" />
                <div className="w-[1px] h-3 bg-navy rounded-full" />
                <div className="w-[2.5px] h-3 bg-navy rounded-full" />
                <div className="w-[1px] h-3 bg-navy rounded-full" />
                <div className="w-[1.5px] h-3 bg-navy rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Layer 3: Magnifying Glass (Right Foreground) ─── */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[4%] sm:right-[8%] top-[22%] z-30 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Glass Rim and Lens */}
          <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white/90 border-[5px] sm:border-[6px] border-[#334155] shadow-xl flex items-center justify-center overflow-hidden backdrop-blur-xs">
            {/* Inner Refraction Ring */}
            <div className="absolute inset-0 rounded-full border border-sky-200/50 bg-gradient-to-tr from-sky-400/10 via-transparent to-white/40 pointer-events-none" />

            {/* Stylized QR Code Matrix Graphic inside Lens */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 grid grid-cols-5 gap-0.5 sm:gap-1 p-1 bg-white/80 rounded-md shadow-inner opacity-75">
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
          <div className="absolute -bottom-5 -right-4 w-4 h-9 sm:w-5 sm:h-11 bg-[#1E293B] rounded-full transform -rotate-45 shadow-lg border-t border-[#475569]" />
        </motion.div>
      </motion.div>

      {/* ─── Layer 4: Compliance Shield with Checkmark (Bottom-Right) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.22 }}
        className="absolute right-[16%] sm:right-[18%] bottom-[4%] z-40"
      >
        <div className="relative w-11 h-13 sm:w-13 sm:h-15 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#10B981] to-[#059669] p-1 shadow-xl flex items-center justify-center border-2 border-emerald-300">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3.5] stroke-white fill-none drop-shadow-sm"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

