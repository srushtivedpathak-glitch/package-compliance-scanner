import { STATUS_CONFIG } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

/**
 * ComplianceStatusBadge
 *
 * Renders an accessible icon + text badge for legal compliance check status.
 * Never depends on color alone — displays distinct icons and descriptive labels.
 */
export default function ComplianceStatusBadge({ status = null, className = '' }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold select-none border shadow-2xs',
        config.badgeClass,
        className
      )}
      title={config.label}
      aria-label={`Status: ${config.label}`}
    >
      <Icon
        className={cn(
          'w-3.5 h-3.5 flex-shrink-0',
          status === 'pending' && 'animate-spin'
        )}
        strokeWidth={2.2}
      />
      <span className="leading-tight">{config.label}</span>
    </span>
  )
}

