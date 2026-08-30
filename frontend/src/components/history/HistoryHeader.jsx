import { RefreshCw, ClipboardList, Clock, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

/**
 * HistoryHeader
 *
 * Page title header with refresh action and decorative inspection history graphic.
 */
export default function HistoryHeader({ onRefresh, isRefreshing = false }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Description */}
      <div>
        <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
          HISTORY &amp; RECORDS
        </span>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            History &amp; Records
          </h1>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/40 hover:text-teal-primary hover:bg-teal-50 transition-colors active:scale-95 disabled:opacity-50"
              aria-label="Refresh history records"
              title="Refresh history"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-teal-primary' : ''}`}
              />
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium max-w-xl">
          View and manage all your inspection history and compliance reports.
        </p>
      </div>

      {/* Lightweight Decorative Inspection Clipboard on Desktop */}
      <div className="hidden md:flex items-center gap-2 select-none pointer-events-none pr-1" aria-hidden="true">
        <div className="relative w-16 h-18 rounded-2xl bg-teal-50/70 border border-teal-primary/20 p-2 flex flex-col justify-between shadow-2xs">
          <div className="w-6 h-1.5 bg-teal-primary/30 rounded-full mx-auto" />
          <div className="space-y-1 my-auto">
            <div className="h-1 bg-teal-primary/20 rounded w-full" />
            <div className="h-1 bg-teal-primary/30 rounded w-4/5" />
            <div className="h-1 bg-teal-primary/20 rounded w-3/4" />
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-primary" />
            <div className="w-4 h-4 rounded-full bg-teal-primary text-white flex items-center justify-center">
              <Clock className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

