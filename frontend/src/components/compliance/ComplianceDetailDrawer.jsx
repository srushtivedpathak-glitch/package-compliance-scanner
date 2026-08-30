import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck,
  Bookmark,
} from 'lucide-react'
import ComplianceStatusBadge from './ComplianceStatusBadge'
import EvidenceViewer from './EvidenceViewer'
import { displayValue } from '../../utils/complianceUtils'

/**
 * ComplianceDetailDrawer
 *
 * Slide-over drawer presenting in-depth rule breakdown, OCR evidence,
 * legal reference text, and officer confirmation controls.
 */
export default function ComplianceDetailDrawer({
  isOpen,
  onClose,
  check = null,
  onSaveOfficerReview,
  onOpenRuleModal,
}) {
  const [officerDecision, setOfficerDecision] = useState(
    check?.officerDecision || 'confirm'
  )
  const [officerRemarks, setOfficerRemarks] = useState(
    check?.officerRemarks || ''
  )
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (check) {
      setOfficerDecision(check.officerDecision || 'confirm')
      setOfficerRemarks(check.officerRemarks || '')
      setIsSaved(false)
    }
  }, [check])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!check) return null

  const handleSaveReview = () => {
    if (onSaveOfficerReview) {
      onSaveOfficerReview(check.id, {
        decision: officerDecision,
        remarks: officerRemarks,
      })
    }
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      onClose()
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/35 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative z-10 w-full max-w-xl bg-white shadow-2xl border-l border-brand-border h-full flex flex-col justify-between overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`Compliance Details for ${check.title}`}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-brand-border flex items-start justify-between gap-4 bg-gray-50/50 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-primary font-mono text-xs font-bold border border-teal-primary/20">
                    {check.ruleReference}
                  </span>
                  <span className="text-xs text-navy/50 font-medium">
                    {check.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy leading-tight">
                  {check.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-200/60 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-brand-bg/70 border border-brand-border flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-navy/50 block mb-1 uppercase tracking-wider">
                    Evaluation Result
                  </span>
                  <ComplianceStatusBadge status={check.status} />
                </div>
                {check.confidence !== null && (
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-navy/50 block mb-0.5 uppercase tracking-wider">
                      OCR Confidence
                    </span>
                    <span className="text-sm font-bold text-navy font-mono">
                      {check.confidence}%
                    </span>
                  </div>
                )}
              </div>

              {/* Requirement Description */}
              <div>
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-teal-primary" />
                  Legal Requirement
                </h4>
                <p className="text-xs sm:text-[13px] text-navy/75 leading-relaxed bg-brand-bg/50 p-3.5 rounded-xl border border-brand-border/70">
                  {check.description}
                </p>
              </div>

              {/* Applicability & Extracted Value Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gray-50 border border-brand-border">
                  <span className="text-[11px] font-semibold text-navy/50 block mb-1">
                    Applicability
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-navy">
                    {displayValue(check.applicability)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-brand-border">
                  <span className="text-[11px] font-semibold text-navy/50 block mb-1">
                    Extracted Value
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-navy truncate block">
                    {displayValue(check.extractedValue)}
                  </span>
                </div>
              </div>

              {/* Remarks / Evaluation Notes */}
              <div>
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-primary" />
                  Evaluation Remarks
                </h4>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-brand-border text-xs sm:text-[13px] text-navy/70 leading-relaxed">
                  {displayValue(check.remarks)}
                </div>
              </div>

              {/* Visual Evidence Crop */}
              <div>
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Visual Crop Evidence
                </h4>
                <EvidenceViewer evidence={check.evidence} />
              </div>

              {/* Officer Confirmation Section */}
              <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-primary/20 space-y-3">
                <h4 className="text-xs font-bold text-navy flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-teal-primary" />
                  Officer Review &amp; Confirmation
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-navy font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="officerDecision"
                        value="confirm"
                        checked={officerDecision === 'confirm'}
                        onChange={() => setOfficerDecision('confirm')}
                        className="text-teal-primary focus:ring-teal-primary"
                      />
                      <span>Confirm Finding</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-navy font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="officerDecision"
                        value="flag"
                        checked={officerDecision === 'flag'}
                        onChange={() => setOfficerDecision('flag')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>Flag for Physical Inspection</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Optional inspector remarks..."
                    value={officerRemarks}
                    onChange={(e) => setOfficerRemarks(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white rounded-xl border border-brand-border text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal-primary/30"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-brand-border flex items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-brand-border bg-white text-xs font-semibold text-navy hover:bg-gray-100 transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSaveReview}
                className="btn-primary text-xs px-5 py-2 shadow-xs"
              >
                {isSaved ? 'Saved ✓' : 'Save Review'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

