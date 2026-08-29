import { useState, useEffect, useCallback, useRef } from 'react'
import { getHistory, getHistorySummary, downloadHistoryReport } from '../services/historyService'

/**
 * useHistory
 *
 * Custom hook for fetching and managing inspection history records,
 * server-side pagination, debounced product search, and report downloads.
 */
export function useHistory() {
  const [records, setRecords] = useState([])
  const [summary, setSummary] = useState({
    total: null,
    compliant: null,
    needsReview: null,
    nonCompliant: null,
    notApplicable: null,
  })

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRecords: 0,
    totalPages: 0,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isSummaryLoading, setIsSummaryLoading] = useState(true)
  const [isDownloadingId, setIsDownloadingId] = useState(null)
  const [downloadToast, setDownloadToast] = useState(null)
  const [error, setError] = useState(null)

  // Debounce search query by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPagination((prev) => ({ ...prev, page: 1 }))
    }, 300)

    return () => clearTimeout(handler)
  }, [searchQuery])

  // Fetch summary counts
  const loadSummary = useCallback(async () => {
    setIsSummaryLoading(true)
    try {
      const res = await getHistorySummary()
      if (res) {
        setSummary(res)
      }
    } catch (err) {
      console.error('[useHistory] Failed to load summary:', err)
    } finally {
      setIsSummaryLoading(false)
    }
  }, [])

  // Fetch history records
  const loadRecords = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await getHistory({
        search: debouncedSearch,
        page: pagination.page,
        limit: pagination.limit,
      })
      if (res) {
        setRecords(res.records || [])
        if (res.pagination) {
          setPagination((prev) => ({
            ...prev,
            totalRecords: res.pagination.totalRecords,
            totalPages: res.pagination.totalPages,
          }))
        }
      }
    } catch (err) {
      console.error('[useHistory] Failed to load records:', err)
      setError('Unable to load inspection history.')
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, pagination.page, pagination.limit])

  useEffect(() => {
    loadSummary()
  }, [loadSummary])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  const setPage = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  const setLimit = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: Number(newLimit), page: 1 }))
  }

  const handleDownload = async (recordId) => {
    setIsDownloadingId(recordId)
    setDownloadToast(null)
    try {
      const res = await downloadHistoryReport(recordId)
      if (res?.success) {
        setDownloadToast({
          type: 'success',
          message: res.message || 'Report download started.',
        })
      } else {
        setDownloadToast({
          type: 'error',
          message: 'Unable to download report. Please try again.',
        })
      }
    } catch (err) {
      console.error('[useHistory] Download error:', err)
      setDownloadToast({
        type: 'error',
        message: 'Unable to download report. Please try again.',
      })
    } finally {
      setIsDownloadingId(null)
      setTimeout(() => {
        setDownloadToast(null)
      }, 3500)
    }
  }

  return {
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
    page: pagination.page,
    setPage,
    limit: pagination.limit,
    setLimit,
    retry: () => {
      loadSummary()
      loadRecords()
    },
    downloadReport: handleDownload,
  }
}

