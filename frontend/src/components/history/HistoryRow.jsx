import ProductIcon from './ProductIcon'
import ScoreRing from './ScoreRing'
import HistoryActions from './HistoryActions'
import { displayValue } from '../../utils/complianceUtils'

/**
 * HistoryRow
 *
 * Desktop semantic table row containing exactly:
 * 1. PRODUCT DETAILS (icon + product name)
 * 2. SCORE (circular meter)
 * 3. ACTIONS (view, download, more)
 *
 * No category, no inspection ID, no status column.
 */
export default function HistoryRow({
  record,
  onView,
  onDownload,
  isDownloading = false,
}) {
  const productName = displayValue(record?.productName)

  return (
    <tr className="border-b border-brand-border last:border-0 hover:bg-gray-50/60 transition-all duration-150 group">
      {/* 1. PRODUCT DETAILS (55% width) */}
      <td className="px-5 py-4 min-w-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <ProductIcon productName={record?.productName} />
          <span className="text-xs sm:text-[13px] font-bold text-navy whitespace-normal break-words leading-snug">
            {productName}
          </span>
        </div>
      </td>

      {/* 2. SCORE (20% width) */}
      <td className="px-5 py-4 whitespace-nowrap">
        <ScoreRing score={record?.score} size={34} />
      </td>

      {/* 3. ACTIONS (25% width) */}
      <td className="px-5 py-4 text-right whitespace-nowrap">
        <HistoryActions
          record={record}
          onView={onView}
          onDownload={onDownload}
          isDownloading={isDownloading}
        />
      </td>
    </tr>
  )
}

