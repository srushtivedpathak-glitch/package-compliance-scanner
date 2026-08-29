import { cn } from '../../utils/cn'

/**
 * SkeletonLoader
 *
 * Shimmer placeholder components for loading states.
 *
 * Usage:
 *   <SkeletonLoader.Text width="w-32" />
 *   <SkeletonLoader.Block height="h-16" />
 *   <SkeletonLoader.MetricCard />
 *   <SkeletonLoader.TableRow />
 */

function Text({ width = 'w-24', height = 'h-4', className = '' }) {
  return (
    <span
      className={cn('skeleton inline-block rounded', height, width, className)}
      aria-hidden="true"
    />
  )
}

function Block({ height = 'h-10', width = 'w-full', className = '' }) {
  return (
    <div
      className={cn('skeleton rounded-xl', height, width, className)}
      aria-hidden="true"
    />
  )
}

function MetricCard() {
  return (
    <div className="flex flex-col justify-between p-3.5 sm:p-4 min-w-0 w-full" aria-busy="true" aria-label="Loading metric">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="skeleton w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0" />
        <div className="skeleton h-6 sm:h-7 w-16 sm:w-20 rounded" />
      </div>
      <div className="skeleton h-4 w-24 sm:w-28 rounded mt-2.5" />
      <div className="skeleton h-3 w-28 sm:w-32 rounded mt-1.5" />
    </div>
  )
}

function TableRow() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b border-brand-border last:border-0"
      aria-busy="true"
      aria-label="Loading row"
    >
      <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="skeleton h-3.5 w-40 rounded" />
        <div className="skeleton h-3 w-24 rounded" />
      </div>
      <div className="skeleton h-6 w-20 rounded-full" />
      <div className="skeleton h-5 w-14 rounded" />
      <div className="skeleton h-5 w-6 rounded ml-auto" />
    </div>
  )
}

function MobileActionCard() {
  return (
    <div className="p-4 border border-brand-border rounded-xl space-y-3" aria-busy="true">
      <div className="flex items-center gap-3">
        <div className="skeleton w-8 h-8 rounded-full" />
        <div className="skeleton h-4 w-36 rounded" />
      </div>
      <div className="flex gap-3 flex-wrap">
        <div className="skeleton h-3 w-28 rounded" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-4 w-14 rounded" />
      </div>
    </div>
  )
}

const SkeletonLoader = { Text, Block, MetricCard, TableRow, MobileActionCard }
export default SkeletonLoader

