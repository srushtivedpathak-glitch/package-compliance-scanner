import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Scale, Search, BookOpen } from 'lucide-react'
import { LEGAL_RULES_DATABASE } from '../../utils/complianceUtils'

/**
 * RuleReferenceModal
 *
 * Full reference library for Legal Metrology (Packaged Commodities) Rules, 2011.
 */
export default function RuleReferenceModal({ isOpen, onClose, initialRule = null }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRule, setSelectedRule] = useState(initialRule)

  useEffect(() => {
    if (initialRule) setSelectedRule(initialRule)
  }, [initialRule])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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

  const filteredRules = LEGAL_RULES_DATABASE.filter(
    (r) =>
      r.ruleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Legal Metrology Rules Reference"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-primary text-white flex items-center justify-center shadow-xs">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">
                    Legal Metrology Rules, 2011 Reference
                  </h3>
                  <p className="text-xs text-navy/50 font-medium">
                    Provisions for packaged commodities inspection &amp; mandatory declarations
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-200/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-3 border-b border-brand-border bg-white">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search rules by section, title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal-primary/30"
                />
              </div>
            </div>

            {/* Content List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {filteredRules.map((rule) => (
                <div
                  key={rule.ruleNumber}
                  className="card p-4 sm:p-5 border border-brand-border hover:border-teal-primary/40 transition-colors bg-white"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-primary font-mono text-xs font-bold border border-teal-primary/20">
                      {rule.ruleNumber}
                    </span>
                    <span className="text-[11px] text-navy/45 font-medium">
                      {rule.chapter}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-navy mb-1.5">{rule.title}</h4>
                  <p className="text-xs text-navy/75 leading-relaxed bg-brand-bg/60 p-3 rounded-xl border border-brand-border/60 font-serif">
                    "{rule.text}"
                  </p>
                  {rule.notes && (
                    <p className="text-[11px] text-navy/55 leading-normal mt-2.5 flex items-start gap-1.5">
                      <strong className="text-navy/70 font-semibold flex-shrink-0">
                        Inspection Note:
                      </strong>
                      <span>{rule.notes}</span>
                    </p>
                  )}
                </div>
              ))}

              {filteredRules.length === 0 && (
                <div className="text-center py-10 text-navy/40">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">No matching rules found</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-gray-50/70 border-t border-brand-border flex items-center justify-between text-xs text-navy/50">
              <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
              <button
                onClick={onClose}
                className="btn-primary text-xs px-4 py-1.5 shadow-xs"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

