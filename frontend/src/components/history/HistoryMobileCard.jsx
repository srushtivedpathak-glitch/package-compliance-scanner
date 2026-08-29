import ProductIcon from './ProductIcon'
import ScoreRing from './ScoreRing'
import HistoryActions from './HistoryActions'
import { displayValue } from '../../utils/complianceUtils'

/**
 * HistoryMobileCard
 *
 * Mobile card rendering inspection details (< 768px) with touch-friendly actions.
 * Contains only Product Name, Score, and Actions.
 */
export default function HistoryMobileCard({
  record,
  onView,
  onDownload,
  isDownloading = false,
}) {
  const productName = displayValue(record?.productName)

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-border shadow-2xs space-y-3">
      {/* Product Details + Score Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Product Details */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <ProductIcon productName={record?.productName} />
          <span className="text-xs sm:text-[13px] font-bold text-navy whitespace-normal break-words leading-snug">
            {productName}
          </span>
        </div>

        {/* Score Ring */}
        <div className="flex-shrink-0">
          <ScoreRing score={record?.score} size={32} />
        </div>
      </div>

      {/* Actions Row */}
      <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-navy/40 uppercase tracking-wider">
          Actions
        </span>
        <HistoryActions
          record={record}
          onView={onView}
          onDownload={onDownload}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  )
}

