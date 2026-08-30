import { useState, useRef, useEffect } from 'react'
import { Pencil, Check, X, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ConfidenceBadge from './ConfidenceBadge'
import { displayValue } from '../../utils/confidenceUtils'
import { cn } from '../../utils/cn'

/**
 * ExtractedFieldCard
 *
 * Displays a single extracted declaration field with its confidence indicator,
 * legal label, and inline edit capabilities.
 * Labels and values wrap down to the next line naturally on mobile screens.
 */
export default function ExtractedFieldCard({
  id,
  label,
  value,
  confidence = null,
  icon: Icon,
  iconBg = 'bg-teal-50',
  iconColor = 'text-teal-primary',
  isEdited = false,
  onSave,
  isLoading = false,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value ?? '')
  const [showSavedFeedback, setShowSavedFeedback] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setEditValue(value ?? '')
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleStartEdit = () => {
    setEditValue(value ?? '')
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditValue(value ?? '')
    setIsEditing(false)
  }

  const handleSave = () => {
    const trimmed = editValue.trim()
    if (onSave) {
      onSave(id, trimmed.length > 0 ? trimmed : null)
    }
    setIsEditing(false)
    setShowSavedFeedback(true)
    setTimeout(() => {
      setShowSavedFeedback(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isLoading) {
    return (
      <div className="card p-3.5 sm:p-5 flex flex-col justify-between min-h-[104px]" aria-busy="true">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="skeleton w-8 h-8 rounded-xl" />
            <div className="skeleton h-4 w-28 sm:w-32 rounded" />
          </div>
          <div className="skeleton h-5 w-20 sm:w-24 rounded-full" />
        </div>
        <div className="skeleton h-6 w-32 sm:w-40 rounded mt-3" />
      </div>
    )
  }

  return (
    <motion.div
      whileHover={!isEditing ? { y: -2, transition: { duration: 0.18 } } : {}}
      className={cn(
        'card p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-200 group h-full',
        isEditing
          ? 'border-teal-primary ring-2 ring-teal-primary/10 bg-teal-50/20 shadow-md'
          : 'hover:border-teal-primary/40 hover:shadow-card-hover bg-white'
      )}
    >
      {/* ── Top Row: Icon + Label & Confidence Badge + Action ── */}
      <div className="flex items-start sm:items-center justify-between gap-2 min-w-0">
        {/* Left: Icon & Label (wraps down on small screens without truncation) */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
          <div
            className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105',
              iconBg
            )}
            aria-hidden="true"
          >
            {Icon && <Icon className={cn('w-4 h-4', iconColor)} strokeWidth={2} />}
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-navy whitespace-normal break-words leading-snug">
            {label}
          </span>
        </div>

        {/* Right: Confidence Badge & Edit Trigger */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <ConfidenceBadge confidence={confidence} />

          {!isEditing && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-navy/35 hover:text-navy hover:bg-gray-100 transition-colors"
              aria-label={`Edit ${label}`}
              title={`Edit ${label}`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom Row: Value or Inline Input Form ── */}
      <div className="mt-2.5 sm:mt-3 min-w-0">
        <AnimatePresence mode="wait">
          {isEditing ? (
            /* Inline Edit Mode Form */
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 mt-1"
            >
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter value..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-teal-primary/50 text-xs sm:text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-teal-primary/30"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-2.5 py-1.5 rounded-lg bg-teal-primary hover:bg-teal-dark text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                aria-label="Save changes"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-2.5 py-1.5 rounded-lg border border-brand-border bg-white hover:bg-gray-100 text-navy/60 text-xs font-semibold flex items-center gap-1 transition-colors"
                aria-label="Cancel editing"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
            </motion.div>
          ) : (
            /* Static Display Value Mode */
            <motion.div
              key="static"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-baseline justify-between gap-2 min-w-0 flex-wrap"
            >
              <div className="flex items-center gap-2 min-w-0 flex-wrap">
                <span
                  className={cn(
                    'text-sm sm:text-[15px] font-bold tracking-tight whitespace-normal break-words',
                    value ? 'text-navy' : 'text-navy/65 font-mono text-base'
                  )}
                >
                  {displayValue(value)}
                </span>

                {/* Edited badge */}
                {isEdited && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-primary border border-teal-primary/20">
                    Edited manually
                  </span>
                )}
              </div>

              {/* Temporary Saved Notification */}
              {showSavedFeedback && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-success"
                >
                  <CheckCircle className="w-3 h-3" />
                  Updated
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
