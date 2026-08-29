import { Eye, Tag, Scale, IndianRupee, CalendarDays, Building2, Headphones, Type, LayoutGrid, Eye as EyeIcon, Hash } from 'lucide-react'
import ComplianceStatusBadge from './ComplianceStatusBadge'
import { displayValue } from '../../utils/complianceUtils'

const ICON_MAP = {
  'common-name': Tag,
  'net-quantity': Scale,
  mrp: IndianRupee,
  'mfg-date': CalendarDays,
  'manufacturer-packer': Building2,
  'consumer-care': Headphones,
  'font-size': Type,
  'declaration-placement': LayoutGrid,
  'legibility-contrast': EyeIcon,
  'unit-format': Hash,
}

/**
 * ComplianceResultRow
 *
 * Desktop table row for a single compliance check result.
 */
export default function ComplianceResultRow({ check, onViewDetails, onOpenRuleModal }) {
  const Icon = ICON_MAP[check.key] || Tag

  return (
    <tr className="hover:bg-gray-50/70 transition-colors border-b border-brand-border last:border-0 group">
      {/* 1. Declaration / Requirement */}
      <td className="px-5 py-4 min-w-[220px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-light text-teal-primary flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Icon className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs sm:text-[13px] font-bold text-navy leading-tight">
              {check.title}
            </p>
            <button
              type="button"
              onClick={() => onOpenRuleModal && onOpenRuleModal(check.ruleReference)}
              className="text-[11px] font-mono text-teal-primary hover:text-teal-dark hover:underline mt-0.5 inline-block text-left"
            >
              {check.ruleReference}
            </button>
          </div>
        </div>
      </td>

      {/* 2. Applicability */}
      <td className="px-4 py-4 text-xs font-semibold text-navy/70 whitespace-nowrap">
        {displayValue(check.applicability)}
      </td>

      {/* 3. Extracted Value */}
      <td className="px-4 py-4 text-xs font-semibold text-navy/75 max-w-[150px] truncate">
        {displayValue(check.extractedValue)}
      </td>

      {/* 4. Status */}
      <td className="px-4 py-4 whitespace-nowrap">
        <ComplianceStatusBadge status={check.status} />
      </td>

      {/* 5. Remarks */}
      <td className="px-4 py-4 text-xs text-navy/60 max-w-[200px] truncate">
        {displayValue(check.remarks)}
      </td>

      {/* 6. Action */}
      <td className="px-4 py-4 text-right whitespace-nowrap">
        <button
          type="button"
          onClick={() => onViewDetails(check)}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-teal-primary hover:bg-teal-50 hover:text-teal-dark transition-colors shadow-2xs inline-flex"
          aria-label={`View details for ${check.title}`}
          title="View full compliance details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}

