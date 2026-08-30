import { useState, useEffect, useCallback } from 'react'
import { fetchDashboardStats, fetchRecentActions } from '../services/dashboardService'

/**
 * useDashboard
 *
 * Encapsulates all data-fetching logic for the home dashboard.
 * Exposes a clean API to the UI layer — no fetch() calls in components.
 *
 * States:
 *   - isDashboardLoading  → show metric card skeletons
 *   - isRecentActionsLoading → show table row skeletons
 *   - stats === null      → data unavailable, show "----"
 *   - recentActions === [] → empty state / skeleton rows
 *   - error               → show ErrorState with retry
 */
export function useDashboard() {
  const [stats, setStats] = useState(null)
  const [recentActions, setRecentActions] = useState([])
  const [isDashboardLoading, setIsDashboardLoading] = useState(true)
  const [isRecentActionsLoading, setIsRecentActionsLoading] = useState(true)
  const [statsError, setStatsError] = useState(null)
  const [actionsError, setActionsError] = useState(null)

  const loadStats = useCallback(async () => {
    setIsDashboardLoading(true)
    setStatsError(null)
    try {
      const data = await fetchDashboardStats()
      setStats(data)
    } catch (err) {
      console.error('[useDashboard] Failed to load stats:', err)
      setStatsError(err?.message ?? 'Unable to load dashboard information.')
    } finally {
      setIsDashboardLoading(false)
    }
  }, [])

  const loadRecentActions = useCallback(async () => {
    setIsRecentActionsLoading(true)
    setActionsError(null)
    try {
      const data = await fetchRecentActions(5)
      setRecentActions(data ?? [])
    } catch (err) {
      console.error('[useDashboard] Failed to load recent actions:', err)
      setActionsError(err?.message ?? 'Unable to load recent actions.')
    } finally {
      setIsRecentActionsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
    loadRecentActions()
  }, [loadStats, loadRecentActions])

  return {
    stats,
    recentActions,
    isDashboardLoading,
    isRecentActionsLoading,
    statsError,
    actionsError,
    retryStats: loadStats,
    retryActions: loadRecentActions,
  }
}

