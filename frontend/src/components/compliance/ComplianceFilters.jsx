import { useState } from 'react'
import { Search, ChevronDown, Filter } from 'lucide-react'

const STATUS_OPTIONS = [
  { id: 'all', label: 'All Status' },
  { id: 'compliant', label: 'Compliant' },
  { id: 'non-compliant', label: 'Non-Compliant' },
  { id: 'requires-review', label: 'Requires Review' },
  { id: 'not-applicable', label: 'Not Applicable' },
  { id: 'not-detected', label: 'Not Detected' },
]

/**
 * ComplianceFilters
 *
 * Search and filter toolbar above detailed compliance results.
 */
export default function ComplianceFilters({
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories = [],
  searchQuery,
  onSearchQueryChange,
}) {
  const [statusOpen, setStatusOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const currentStatusLabel =
    STATUS_OPTIONS.find((s) => s.id === statusFilter)?.label || 'All Status'

  const categoryOptions = ['All Categories', ...categories]

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-navy">
        Detailed compliance results
      </h3>

      {/* Filter and Search Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        {/* Status Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <button
            type="button"
            onClick={() => {
              setStatusOpen((p) => !p)
              setCategoryOpen(false)
            }}
            className="w-full sm:w-auto inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border border-brand-border bg-white text-xs font-semibold text-navy hover:border-teal-primary/40 transition-colors shadow-2xs"
            aria-haspopup="listbox"
            aria-expanded={statusOpen}
          >
            <span className="truncate">{currentStatusLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-navy/40 flex-shrink-0" />
          </button>

          {statusOpen && (
            <div
              className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1 bg-white rounded-xl shadow-card-hover border border-brand-border py-1 z-30 min-w-[150px]"
              role="listbox"
            >
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={statusFilter === opt.id}
                  onClick={() => {
                    onStatusFilterChange(opt.id)
                    setStatusOpen(false)
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors ${
                    statusFilter === opt.id
                      ? 'text-teal-primary bg-teal-50 font-bold'
                      : 'text-navy/70 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <button
            type="button"
            onClick={() => {
              setCategoryOpen((p) => !p)
              setStatusOpen(false)
            }}
            className="w-full sm:w-auto inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border border-brand-border bg-white text-xs font-semibold text-navy hover:border-teal-primary/40 transition-colors shadow-2xs"
            aria-haspopup="listbox"
            aria-expanded={categoryOpen}
          >
            <span className="truncate">{categoryFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-navy/40 flex-shrink-0" />
          </button>

          {categoryOpen && (
            <div
              className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1 bg-white rounded-xl shadow-card-hover border border-brand-border py-1 z-30 min-w-[170px]"
              role="listbox"
            >
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="option"
                  aria-selected={categoryFilter === cat}
                  onClick={() => {
                    onCategoryFilterChange(cat)
                    setCategoryOpen(false)
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'text-teal-primary bg-teal-50 font-bold'
                      : 'text-navy/70 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 sm:w-48 lg:w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
          <input
            type="text"
            placeholder="Search checks..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-brand-border text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal-primary/30 shadow-2xs"
          />
        </div>
      </div>
    </div>
  )
}

