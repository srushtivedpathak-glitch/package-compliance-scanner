import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react'
import HistoryHeader from '../components/history/HistoryHeader'
import HistorySummary from '../components/history/HistorySummary'
import HistorySearch from '../components/history/HistorySearch'
import HistoryTable from '../components/history/HistoryTable'
import HistoryPagination from '../components/history/HistoryPagination'
import { useHistory } from '../hooks/useHistory'

/**
 * HistoryAndRecordsPage
 *
 * Dedicated database inspection history and records view.
 * Allows searching previous inspections by product name, viewing scores,
 * opening compliance reports, and downloading PDF records.
 */
export default function HistoryAndRecordsPage() {
  const navigate = useNavigate()
  const {
    records,
    summary,
    pagination,
    isLoading,
    isSummaryLoading,
    isDownloadingId,
    downloadToast,
    error,
    searchQuery,
    setSearchQuery,
    setPage,
    setLimit,
    retry,
    downloadReport,
  } = useHistory()

  const handleViewRecord = (record) => {
    // Navigate to compliance report (in future: /compliance-report/:recordId)
    navigate('/compliance-report')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 lg:space-y-7 pb-12"
    >
      {/* 1. Header with Title and Refresh action */}
      <HistoryHeader onRefresh={retry} isRefreshing={isLoading || isSummaryLoading} />

      {/* 2. Summary Statistics (5 Cards) */}
      <HistorySummary summary={summary} isLoading={isSummaryLoading} />

      {/* 3. Error Alert */}
      {error && !isLoading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-brand-danger text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={retry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-xl font-bold hover:bg-red-100/50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* 4. Product Name Search (Sole filter control) */}
      <div>
        <HistorySearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* 5. Inspection History Table (3 Columns: PRODUCT DETAILS | SCORE | ACTIONS) */}
      <div>
        <HistoryTable
          records={records}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onViewRecord={handleViewRecord}
          onDownloadRecord={downloadReport}
          isDownloadingId={isDownloadingId}
        />
      </div>

      {/* 6. Server-Side Pagination */}
      <div>
        <HistoryPagination
          pagination={pagination}
          onPageChange={setPage}
          onLimitChange={setLimit}
          isLoading={isLoading}
        />
      </div>

      {/* 7. Download Toast Notification */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border ${
              downloadToast.type === 'success'
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-red-500 text-white border-red-400'
            }`}
          >
            {downloadToast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />
            )}
            <span>{downloadToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

