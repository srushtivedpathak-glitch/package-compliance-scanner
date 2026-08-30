import { MoreVertical, ChevronRight, ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SkeletonLoader from '../common/SkeletonLoader'
import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'
import { cn } from '../../utils/cn'

/** Status badge config */
const STATUS_CONFIG = {
  compliant: {
    label: 'Compliant',
    bg: 'bg-emerald-50',
    text: 'text-brand-success',
    dot: 'bg-brand-success',
  },
  'non-compliant': {
    label: 'Non-Compliant',
    bg: 'bg-red-50',
    text: 'text-brand-danger',
    dot: 'bg-brand-danger',
  },
  partial: {
    label: 'Partial',
    bg: 'bg-amber-50',
    text: 'text-brand-warning',
    dot: 'bg-brand-warning',
  },
  pending: {
    label: 'Pending',
    bg: 'bg-gray-100',
    text: 'text-navy/50',
    dot: 'bg-navy/30',
  },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold',
        cfg.bg, cfg.text
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', cfg.dot)} aria-hidden="true" />
      {cfg.label}
    </span>
  )
}

function ActionMenu() {
  return (
    <button
      className="w-7 h-7 rounded-lg flex items-center justify-center text-navy/40
                 hover:text-navy hover:bg-gray-100 transition-colors duration-150"
      aria-label="Action menu"
    >
      <MoreVertical className="w-4 h-4" />
    </button>
  )
}

/**
 * RecentActionRow — desktop table row for a single inspection record
 */
function RecentActionRow({ action }) {
  const dateStr = action.dateTime
    ? new Date(action.dateTime).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '—'

  return (
    <tr className="hover:bg-gray-50/70 transition-colors duration-100 group">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-light flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-4 h-4 text-teal-primary" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-navy truncate max-w-[160px]">
            {action.productName}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5 text-xs text-navy/55 whitespace-nowrap">{dateStr}</td>
      <td className="px-4 py-3.5">
        <StatusBadge status={action.status} />
      </td>
      <td className="px-4 py-3.5 text-sm font-semibold text-navy/70 whitespace-nowrap">
        {action.score != null ? `${action.score}/100` : '—/100'}
      </td>
      <td className="px-4 py-3.5">
        <ActionMenu />
      </td>
    </tr>
  )
}

/**
 * RecentActionMobileCard — stacked card for mobile view of an inspection record
 */
function RecentActionMobileCard({ action }) {
  const dateStr = action.dateTime
    ? new Date(action.dateTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : '—'

  return (
    <div className="p-4 border-b border-brand-border last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-teal-light flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-4.5 h-4.5 text-teal-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-navy truncate">{action.productName}</p>
            <p className="text-xs text-navy/50 mt-0.5">{dateStr}</p>
          </div>
        </div>
        <ActionMenu />
      </div>
      <div className="flex items-center gap-3 mt-3 pl-12">
        <StatusBadge status={action.status} />
        <span className="text-xs font-semibold text-navy/60">
          {action.score != null ? `${action.score}/100` : '—/100'}
        </span>
      </div>
    </div>
  )
}

/** Placeholder skeleton rows (shown before data loads) */
const SKELETON_ROW_COUNT = 3

/**
 * RecentActions
 *
 * Desktop: HTML table with headers.
 * Mobile: vertically stacked cards.
 *
 * Props:
 *   actions    - RecentAction[] from useDashboard
 *   isLoading  - show skeleton rows
 *   error      - error string
 *   onRetry    - retry callback
 */
export default function RecentActions({ actions = [], isLoading, error, onRetry }) {
  const hasData = actions.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="card overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-brand-border flex-shrink-0">
        <h2 className="text-[15px] font-semibold text-navy">Recent actions</h2>
        <Link
          to="/history"
          className="btn-ghost text-[13px]"
          aria-label="View all history and records"
        >
          View all
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Error state */}
      {error && !isLoading && (
        <div className="px-5 py-3">
          <ErrorState message={error} onRetry={onRetry} compact />
        </div>
      )}

      {/* Loading — skeleton rows */}
      {isLoading && !error && (
        <>
          {/* Desktop skeleton */}
          <div className="hidden sm:block">
            {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
              <SkeletonLoader.TableRow key={i} />
            ))}
          </div>
          {/* Mobile skeleton */}
          <div className="sm:hidden">
            {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
              <SkeletonLoader.MobileActionCard key={i} />
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {!isLoading && !error && !hasData && (
        <EmptyState
          title="No inspections yet."
          description="Your recent inspection actions will appear here after your first scan."
          ctaLabel="Start your first scan"
          ctaPath="/scan"
        />
      )}

      {/* ─── Desktop Table ─── */}
      {!isLoading && !error && hasData && (
        <>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left" role="table" aria-label="Recent inspection actions">
              <thead>
                <tr className="border-b border-brand-border bg-gray-50/50">
                  <th className="px-5 py-3 text-[11px] font-semibold text-navy/40 uppercase tracking-wide whitespace-nowrap">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-navy/40 uppercase tracking-wide whitespace-nowrap">
                    Date &amp; Time
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-navy/40 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-navy/40 uppercase tracking-wide">
                    Score
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-navy/40 uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action) => (
                  <RecentActionRow key={action.id} action={action} />
                ))}
              </tbody>
            </table>
          </div>

          {/* ─── Mobile Stacked Cards ─── */}
          <div className="sm:hidden divide-y divide-brand-border">
            {actions.map((action) => (
              <RecentActionMobileCard key={action.id} action={action} />
            ))}
          </div>
        </>
      )}

      {/* Footer link */}
      {!error && (
        <div className="px-5 py-3.5 border-t border-brand-border mt-auto flex-shrink-0">
          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-primary
                       hover:text-teal-dark transition-colors duration-150"
            aria-label="View all history and records"
          >
            <ClipboardList className="w-4 h-4" />
            View all history &amp; records
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </motion.div>
  )
}

