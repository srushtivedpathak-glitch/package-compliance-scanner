import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Sidebar from './Sidebar'
import { useEffect } from 'react'

/**
 * MobileSidebar
 *
 * Animated slide-from-left drawer for mobile/tablet.
 * Renders Sidebar inside a motion overlay.
 *
 * Props:
 *   isOpen   - controls visibility
 *   onClose  - close callback (hamburger, overlay tap, Escape key)
 */
export default function MobileSidebar({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 w-[260px] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center
                         text-navy/50 hover:text-navy hover:bg-white/60 transition-colors duration-150"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Sidebar content */}
            <div className="flex-1 overflow-hidden h-full">
              <Sidebar onNavigate={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

