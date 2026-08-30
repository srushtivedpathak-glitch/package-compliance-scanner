import { Lightbulb, FileText, CheckCircle2 } from 'lucide-react'

/**
 * ReviewInfoCard
 *
 * Informative banner highlighting that all extracted fields can be verified
 * and edited prior to triggering the legal compliance engine.
 */
export default function ReviewInfoCard() {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-brand-sidebar/80 border border-brand-border/90 p-4 sm:p-5 flex items-center justify-between gap-4 overflow-hidden relative shadow-xs">
      <div className="flex items-start sm:items-center gap-3.5 max-w-xl z-10">
        <div className="w-10 h-10 rounded-2xl bg-teal-primary/10 text-teal-primary flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 shadow-xs">
          <Lightbulb className="w-5 h-5" strokeWidth={2} />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-navy">
            You can edit any field
          </h4>
          <p className="text-[11px] sm:text-xs text-navy/60 leading-relaxed mt-0.5 font-medium">
            Review the extracted information and correct any missing or incorrect values before proceeding.
          </p>
        </div>
      </div>

      {/* Decorative Clipboard / Inspection Graphic on Desktop */}
      <div className="hidden md:flex items-center gap-2 pr-2 opacity-80 pointer-events-none select-none z-10" aria-hidden="true">
        <div className="w-14 h-16 rounded-xl bg-white border border-brand-border shadow-sm p-1.5 flex flex-col justify-between">
          <div className="w-6 h-1.5 bg-teal-primary/30 rounded-full mx-auto" />
          <div className="space-y-1">
            <div className="h-1 bg-gray-200 rounded w-full" />
            <div className="h-1 bg-teal-primary/40 rounded w-3/4" />
            <div className="h-1 bg-gray-200 rounded w-4/5" />
          </div>
          <div className="flex justify-end">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-primary" />
          </div>
        </div>
      </div>

      {/* Background soft glow */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-teal-primary/5 blur-2xl pointer-events-none" aria-hidden="true" />
    </div>
  )
}

