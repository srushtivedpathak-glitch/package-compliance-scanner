import { CheckCircle2, ExternalLink } from 'lucide-react'
import { displayConfidence } from '../../utils/confidenceUtils'

/**
 * ExtractionSummary
 *
 * Full-width summary card displaying OCR extraction status,
 * detected fields count, and overall confidence score.
 */
export default function ExtractionSummary({
  identifiedFields = null,
  totalFields = null,
  overallConfidence = null,
  onViewOriginalImage,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="card p-5 bg-teal-50/50 border border-teal-primary/15 flex items-center justify-between flex-wrap gap-4" aria-busy="true">
        <div className="flex items-center gap-3.5">
          <div className="skeleton w-10 h-10 rounded-full" />
          <div className="space-y-1.5">
            <div className="skeleton h-4 w-36 rounded" />
            <div className="skeleton h-3.5 w-48 rounded" />
          </div>
        </div>
        <div className="skeleton h-8 w-36 rounded-xl" />
      </div>
    )
  }

  const identifiedText =
    identifiedFields != null && totalFields != null
      ? `${identifiedFields} of ${totalFields} fields identified.`
      : '-- of -- fields identified.'

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-teal-50/70 border border-teal-primary/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      {/* Left: Status Icon & Details */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-teal-primary text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 sm:mt-0">
          <CheckCircle2 className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-navy">Extraction complete</h3>
            <span className="text-xs sm:text-sm text-navy/60 font-medium hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm text-navy/65 font-semibold">
              {identifiedText}
            </span>
          </div>
          <p className="text-xs text-navy/55 font-medium mt-0.5">
            Confidence score:{' '}
            <span className="text-teal-primary font-bold">
              {displayConfidence(overallConfidence)}
            </span>
          </p>
        </div>
      </div>

      {/* Right: View Original Image Button */}
      <button
        type="button"
        onClick={onViewOriginalImage}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-teal-50/50 border border-teal-primary/30 rounded-xl text-xs font-bold text-teal-primary shadow-xs hover:border-teal-primary transition-all duration-150 active:scale-95 self-start sm:self-auto w-full sm:w-auto"
      >
        <span>View original image</span>
        <ExternalLink className="w-3.5 h-3.5 text-teal-primary" />
      </button>
    </div>
  )
}

