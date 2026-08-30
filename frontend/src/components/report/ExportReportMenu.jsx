import { useState, useRef, useEffect } from 'react'
import { FileDown, ChevronDown, FileText, FileSpreadsheet, Loader2 } from 'lucide-react'

/**
 * ExportReportMenu
 *
 * Dropdown action menu for exporting compliance reports (PDF / DOCX).
 */
export default function ExportReportMenu({
  onExport,
  isExporting = false,
  variant = 'hero',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (format) => {
    setIsOpen(false)
    if (onExport) onExport(format)
  }

  const isHero = variant === 'hero'

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => !isExporting && setIsOpen((prev) => !prev)}
        disabled={isExporting}
        className={
          isHero
            ? 'inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all duration-150 backdrop-blur-xs shadow-sm active:scale-95 disabled:opacity-60'
            : 'btn-primary text-xs sm:text-sm px-5 py-2.5 shadow-md flex items-center gap-2'
        }
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Preparing report...</span>
          </>
        ) : (
          <>
            <FileDown className="w-4 h-4" />
            <span>Export report</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </>
        )}
      </button>

      {isOpen && !isExporting && (
        <div
          className="absolute right-0 bottom-full mb-1.5 sm:bottom-auto sm:top-full sm:mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-brand-border py-1.5 z-40"
          role="menu"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect('pdf')}
            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-navy hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-teal-primary" />
            <span>Export as PDF</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect('docx')}
            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-navy hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-brand-info" />
            <span>Export editable report</span>
          </button>
        </div>
      )}
    </div>
  )
}

