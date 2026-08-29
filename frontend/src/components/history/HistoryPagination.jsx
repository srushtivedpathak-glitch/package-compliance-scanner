import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * HistoryPagination
 *
 * Server-side pagination controls with page numbers, range counter, and rows-per-page selector.
 */
export default function HistoryPagination({
  pagination = {},
  onPageChange,
  onLimitChange,
  isLoading = false,
}) {
  const { page = 1, limit = 10, totalRecords = 0, totalPages = 0 } = pagination

  if (totalRecords === 0 && !isLoading) {
    return null
  }

  const startRecord = totalRecords > 0 ? (page - 1) * limit + 1 : 0
  const endRecord = Math.min(page * limit, totalRecords)

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages = []
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (page >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs font-semibold text-navy/60">
      {/* Left: Range Counter */}
      <div className="order-2 sm:order-1 text-center sm:text-left">
        {totalRecords > 0 ? (
          <span>
            Showing <span className="font-bold text-navy">{startRecord}</span> to{' '}
            <span className="font-bold text-navy">{endRecord}</span> of{' '}
            <span className="font-bold text-navy">{totalRecords}</span> inspections
          </span>
        ) : (
          <span>-- of -- inspections</span>
        )}
      </div>

      {/* Center: Pagination Controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Prev Button */}
        <button
          type="button"
          onClick={() => onPageChange && onPageChange(page - 1)}
          disabled={page <= 1 || isLoading}
          className="w-8 h-8 rounded-xl border border-brand-border bg-white flex items-center justify-center text-navy/60 hover:bg-gray-50 hover:text-navy disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-navy/40">
                ...
              </span>
            )
          }

          const isCurrent = p === page
          return (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => onPageChange && onPageChange(p)}
              disabled={isLoading}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                isCurrent
                  ? 'bg-teal-primary text-white shadow-2xs'
                  : 'bg-white border border-brand-border text-navy/70 hover:bg-gray-50 hover:text-navy'
              }`}
              aria-label={`Go to page ${p}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {p}
            </button>
          )
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange && onPageChange(page + 1)}
          disabled={page >= totalPages || isLoading}
          className="w-8 h-8 rounded-xl border border-brand-border bg-white flex items-center justify-center text-navy/60 hover:bg-gray-50 hover:text-navy disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Rows per page selector */}
      <div className="flex items-center gap-2 order-3">
        <span className="text-navy/50">Rows per page</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange && onLimitChange(Number(e.target.value))}
          disabled={isLoading}
          className="px-2.5 py-1.5 rounded-xl border border-brand-border bg-white text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-teal-primary/20"
          aria-label="Select rows per page"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}

