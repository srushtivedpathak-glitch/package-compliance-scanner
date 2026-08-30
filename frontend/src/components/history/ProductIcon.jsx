import { getProductIcon } from '../../utils/productIconUtils'
import { cn } from '../../utils/cn'

/**
 * ProductIcon
 *
 * Decorative product icon inferred dynamically from product name keywords.
 */
export default function ProductIcon({ productName = '' }) {
  const { icon: Icon, bg, color } = getProductIcon(productName)

  return (
    <div
      className={cn(
        'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105 select-none',
        bg
      )}
      aria-hidden="true"
    >
      <Icon className={cn('w-4 h-4 sm:w-[18px] sm:h-[18px]', color)} strokeWidth={1.9} />
    </div>
  )
}

