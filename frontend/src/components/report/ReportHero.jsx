import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import ComplianceScoreRing from './ComplianceScoreRing'
import OverallStatusBadge from './OverallStatusBadge'
import ExportReportMenu from './ExportReportMenu'
import { displayValue } from '../../utils/complianceUtils'

/**
 * ReportHero
 *
 * Primary high-impact compliance banner containing score ring,
 * status badge, summary evaluation description, and export action.
 */
export default function ReportHero({
  report = {},
  onExport,
  isExporting = false,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="rounded-3xl bg-[#0B2638] p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6" aria-busy="true">
        <div className="flex items-center gap-6">
          <div className="skeleton w-24 h-24 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="skeleton h-5 w-24 rounded-full bg-white/10" />
            <div className="skeleton h-6 w-48 rounded bg-white/10" />
            <div className="skeleton h-4 w-64 rounded bg-white/10" />
          </div>
        </div>
        <div className="skeleton h-10 w-36 rounded-xl bg-white/10" />
      </div>
    )
  }

  // Determine dynamic title and description
  const getStatusTitle = () => {
    if (report.overallStatus === 'compliant') return 'Compliance checks passed'
    if (report.overallStatus === 'needs-review') return 'Potential issues found'
    if (report.overallStatus === 'non-compliant') return 'Non-compliance detected'
    if (report.overallStatus === 'pending') return 'Preparing compliance report'
    return 'Overall compliance score'
  }

  const applicableTotal = report.applicableChecks ?? report.totalChecks ?? null
  const applicablePassed = report.compliant ?? null

  const descriptionText =
    applicablePassed !== null && applicableTotal !== null
      ? `${applicablePassed} out of ${applicableTotal} applicable checks evaluated.`
      : '-- out of -- applicable checks evaluated.'

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0B2638] via-[#0E354A] to-[#0A4B56] p-6 sm:p-7 border border-white/10 shadow-xl overflow-hidden text-white">
      {/* Background radial highlight */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-teal-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left + Center Content Group */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 min-w-0 flex-1">
          {/* Circular Score Meter */}
          <ComplianceScoreRing
            score={report.score}
            status={report.overallStatus}
            size={104}
          />

          {/* Status & Description Block */}
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <OverallStatusBadge status={report.overallStatus} />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {getStatusTitle()}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
              <span className="font-bold text-white block sm:inline">
                {displayValue(report.score !== null ? `${report.score}%` : null)}
              </span>{' '}
              {descriptionText} Please review the details below.
            </p>
          </div>
        </div>

        {/* Decorative Inspection Shield Graphic on Desktop */}
        <div className="hidden lg:flex items-center gap-2 pr-2 opacity-90 select-none pointer-events-none" aria-hidden="true">
          <div className="relative w-16 h-20 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-2 flex flex-col justify-between shadow-lg">
            <div className="w-6 h-1.5 bg-teal-300/40 rounded-full mx-auto" />
            <div className="space-y-1">
              <div className="h-1 bg-white/30 rounded w-full" />
              <div className="h-1 bg-teal-300/60 rounded w-3/4" />
              <div className="h-1 bg-white/30 rounded w-4/5" />
            </div>
            <div className="flex justify-end">
              <div className="w-5 h-5 rounded-full bg-teal-400 text-[#0B2638] flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Export Button */}
        <div className="flex-shrink-0 self-start sm:self-auto w-full sm:w-auto">
          <ExportReportMenu
            onExport={onExport}
            isExporting={isExporting}
            variant="hero"
          />
        </div>
      </div>
    </div>
  )
}

