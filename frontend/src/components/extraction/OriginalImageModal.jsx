import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImageOff, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * OriginalImageModal
 *
 * Displays the full resolution package label image used for OCR extraction.
 */
export default function OriginalImageModal({ isOpen, onClose, imageUrl = null }) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden flex flex-col max-h-[88vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Original label image"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <div>
                <h3 className="text-base font-bold text-navy">Original package label</h3>
                <p className="text-xs text-navy/50">Reference image used for text and declaration extraction</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex items-center justify-center min-h-[260px] bg-brand-bg/50">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Original scanned label"
                  className="max-h-[60vh] w-auto max-w-full rounded-xl object-contain shadow-md bg-white border border-brand-border"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 text-navy/40 flex items-center justify-center mb-3">
                    <ImageOff className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-bold text-navy mb-1">Image unavailable</h4>
                  <p className="text-xs text-navy/50 mb-4">
                    No label image has been uploaded for this session yet.
                  </p>
                  <Link
                    to="/scan"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-primary text-white text-xs font-semibold hover:bg-teal-dark transition-colors"
                  >
                    Go to Scan Label
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-gray-50/70 border-t border-brand-border flex items-center justify-between text-xs text-navy/50">
              <span>Legal Metrology Compliance Inspection</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg border border-brand-border bg-white text-navy font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

