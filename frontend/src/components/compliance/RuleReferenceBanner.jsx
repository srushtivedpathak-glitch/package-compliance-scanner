import { Scale, ExternalLink } from 'lucide-react'

/**
 * RuleReferenceBanner
 *
 * Information banner contextualizing compliance evaluation under
 * the Legal Metrology (Packaged Commodities) Rules, 2011.
 */
export default function RuleReferenceBanner({ onViewRules }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-teal-50/70 border border-teal-primary/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-teal-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 shadow-xs">
          <Scale className="w-5 h-5" strokeWidth={2} />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-navy leading-snug">
            Compliance is evaluated as per applicable provisions of the Legal Metrology (Packaged Commodities) Rules, 2011.
          </h4>
          <p className="text-[11px] sm:text-xs text-navy/60 leading-relaxed mt-0.5 font-medium">
            Some declarations may not be applicable depending on product type, package type and other governing laws.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewRules}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-teal-50/60 border border-teal-primary/30 rounded-xl text-xs font-bold text-teal-primary shadow-xs hover:border-teal-primary transition-all duration-150 active:scale-95 flex-shrink-0 self-start sm:self-auto w-full sm:w-auto"
      >
        <span>View rules reference</span>
        <ExternalLink className="w-3.5 h-3.5 text-teal-primary" />
      </button>
    </div>
  )
}

