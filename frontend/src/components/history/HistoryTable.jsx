import { Link } from 'react-router-dom'
import { ClipboardList, SearchX, ScanLine, X } from 'lucide-react'
import HistoryRow from './HistoryRow'
import HistoryMobileCard from './HistoryMobileCard'

const SKELETON_ROWS = 6

/**
 * HistoryTable
 *
 * Responsive container rendering a 3-column table on desktop:
 * | PRODUCT DETAILS | SCORE | ACTIONS |
 * and stacked cards on mobile.
 */
export default function HistoryTable({
  records = [],
  isLoading = false,
  searchQuery = '',
  onClearSearch,
  onViewRecord,
  onDownloadRecord,
  isDownloadingId = null,
}) {
  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="card overflow-hidden bg-white border border-brand-border" aria-busy="true">
        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <div className="bg-gray-50/70 border-b border-brand-border px-5 py-3.5 flex justify-between">
            <div className="skeleton h-4 w-36 rounded" />
            <div className="skeleton h-4 w-16 rounded" />
            <div className="skeleton h-4 w-20 rounded" />
          </div>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <div
              key={i}
              className="px-5 py-4 border-b border-brand-border last:border-0 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 flex-1">
                <div className="skeleton w-9 h-9 rounded-xl flex-shrink-0" />
                <div className="skeleton h-4 w-48 rounded" />
              </div>
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-24 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden p-3.5 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border border-brand-border rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="skeleton w-9 h-9 rounded-xl" />
                  <div className="skeleton h-4 w-36 rounded" />
                </div>
                <div className="skeleton h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 2. Search Empty State (search query has no matches)
  if (searchQuery.trim().length > 0 && records.length === 0) {
    return (
      <div className="card p-10 sm:p-12 bg-white border border-brand-border text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3.5">
          <SearchX className="w-6 h-6" />
        </div>
        <h4 className="text-sm sm:text-base font-bold text-navy mb-1">
          No products found
        </h4>
        <p className="text-xs sm:text-sm text-navy/50 max-w-sm mb-5 leading-relaxed">
          No inspection records match &ldquo;<span className="font-semibold text-navy">{searchQuery}</span>&rdquo;.
        </p>
        <button
          type="button"
          onClick={onClearSearch}
          className="btn-primary text-xs sm:text-sm px-4 py-2 flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          <span>Clear search</span>
        </button>
      </div>
    )
  }

  // 3. General Database Empty State (no inspections saved yet)
  if (records.length === 0) {
    return (
      <div className="card p-10 sm:p-14 bg-white border border-brand-border text-center flex flex-col items-center justify-center">
        <div className="w-13 h-13 rounded-2xl bg-teal-50 text-teal-primary flex items-center justify-center mb-3.5 shadow-2xs">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-navy mb-1">
          No inspection history yet
        </h4>
        <p className="text-xs sm:text-sm text-navy/50 max-w-md mb-6 leading-relaxed">
          Completed commodity label inspections and legal metrology verification reports will appear here.
        </p>
        <Link
          to="/scan"
          className="btn-primary text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2 shadow-md"
        >
          <ScanLine className="w-4 h-4" />
          <span>Scan your first label</span>
        </Link>
      </div>
    )
  }

  // 4. Populated History Table
  return (
    <div className="card overflow-hidden bg-white border border-brand-border shadow-xs">
      {/* ── Desktop Table (md+) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left" role="table" aria-label="Inspection history records">
          <thead>
            <tr className="border-b border-brand-border bg-gray-50/70 text-[11px] font-bold text-navy/50 uppercase tracking-wider">
              <th className="px-5 py-3.5 w-[55%] whitespace-nowrap">PRODUCT DETAILS</th>
              <th className="px-5 py-3.5 w-[20%] whitespace-nowrap">SCORE</th>
              <th className="px-5 py-3.5 w-[25%] text-right whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <HistoryRow
                key={record.id}
                record={record}
                onView={onViewRecord}
                onDownload={onDownloadRecord}
                isDownloading={isDownloadingId === record.id}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Stack (< md) ── */}
      <div className="md:hidden p-3 space-y-2.5">
        {records.map((record) => (
          <HistoryMobileCard
            key={record.id}
            record={record}
            onView={onViewRecord}
            onDownload={onDownloadRecord}
            isDownloading={isDownloadingId === record.id}
          />
        ))}
      </div>
    </div>
  )
}

