import { Info } from 'lucide-react'

/**
 * LegalNotice
 *
 * Informational footer notice clarifying the assistant role of the Nirikshan application.
 */
export default function LegalNotice() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-brand-border/90 flex items-start sm:items-center gap-3.5 text-navy/70 shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-primary flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
        <Info className="w-4 h-4" strokeWidth={2.2} />
      </div>

      <div className="space-y-0.5 text-xs leading-relaxed">
        <p className="font-semibold text-navy">
          Nirikshan is designed to assist Legal Metrology Officers in performing faster and rule-aware packaged commodity inspections.
        </p>
        <p className="text-navy/55 font-medium">
          Final enforcement decisions should follow official procedures and applicable statutory provisions of the Legal Metrology Act, 2011.
        </p>
      </div>
    </div>
  )
}
