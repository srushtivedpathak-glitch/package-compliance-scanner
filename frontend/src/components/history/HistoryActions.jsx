import { useState, useRef, useEffect } from 'react'
import { Eye, Download, MoreHorizontal, Loader2, FileText } from 'lucide-react'

/**
 * HistoryActions
 *
 * 3 compact action buttons for table rows (View report, Download report, More actions).
 */
export default function HistoryActions({
  record,
  onView,
  onDownload,
  isDownloading = false,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const productName = record?.productName || 'Inspection'

  return (
    <div className="flex items-center gap-1.5 justify-end relative" ref={menuRef}>
      {/* 1. View Report Button */}
      <button
        type="button"
        onClick={() => onView && onView(record)}
        className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/50 hover:text-teal-primary hover:bg-teal-50/80 transition-all duration-150 active:scale-95 group/btn"
        aria-label={`View report for ${productName}`}
        title="View report"
      >
        <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-105" />
      </button>

      {/* 2. Download Report Button */}
      <button
        type="button"
        onClick={() => onDownload && onDownload(record?.id)}
        disabled={isDownloading}
        className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/50 hover:text-teal-primary hover:bg-teal-50/80 transition-all duration-150 active:scale-95 group/btn disabled:opacity-50"
        aria-label={`Download report for ${productName}`}
        title="Download report"
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin text-teal-primary" />
        ) : (
          <Download className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
        )}
      </button>

      {/* 3. More Actions Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-100 transition-colors active:scale-95"
        aria-label={`More actions for ${productName}`}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        title="More actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-brand-border py-1.5 z-30"
          role="menu"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsMenuOpen(false)
              if (onView) onView(record)
            }}
            className="w-full text-left px-3.5 py-2 text-xs font-semibold text-navy hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-teal-primary" />
            <span>Open report</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsMenuOpen(false)
              if (onDownload) onDownload(record?.id)
            }}
            className="w-full text-left px-3.5 py-2 text-xs font-semibold text-navy hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-brand-info" />
            <span>Download PDF</span>
          </button>
        </div>
      )}
    </div>
  )
}

