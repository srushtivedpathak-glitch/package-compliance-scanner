import { AlertCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ErrorState
 *
 * Shown when an API request fails. Does not crash the page.
 * Provides a Retry button that calls the onRetry callback.
 *
 * Props:
 *   message  - error message to display
 *   onRetry  - retry callback from the hook
 *   compact  - show a smaller inline variant
 */
export default function ErrorState({
  message = 'Unable to load dashboard information.',
  onRetry,
  compact = false,
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
        <AlertCircle className="w-4 h-4 text-brand-danger flex-shrink-0" />
        <p className="text-xs text-brand-danger flex-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs font-semibold text-brand-danger hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center py-14 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-brand-danger" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-semibold text-navy mb-1">Something went wrong</h3>
      <p className="text-sm text-navy/50 max-w-xs mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-border
                     text-sm font-semibold text-navy hover:bg-gray-50 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </motion.div>
  )
}

