import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FindingRow from './FindingRow'
import { displayValue } from '../../utils/complianceUtils'

// Default structured declarations matching PACKCHECK inspection findings
const DEFAULT_DECLARATION_FINDINGS = [
  {
    id: 'f-1',
    key: 'product-name',
    title: 'Product name present',
    ruleReference: 'Rule 6(1)(b)',
    description: 'Check declaration of common or generic name on package.',
    status: null,
    extractedValue: null,
    remarks: null,
  },
  {
    id: 'f-2',
    key: 'net-quantity',
    title: 'Net quantity declared',
    ruleReference: 'Rule 6(1)(c)',
    description: 'Check standard net quantity declaration.',
    status: null,
    extractedValue: null,
    remarks: null,
  },
  {
    id: 'f-3',
    key: 'mrp',
    title: 'MRP (inclusive of all taxes)',
    ruleReference: 'Rule 6(1)(e)',
    description: 'Check maximum retail price declaration inclusive of taxes.',
    status: null,
    extractedValue: null,
    remarks: null,
  },
  {
    id: 'f-4',
    key: 'mfg-date',
    title: 'Date of packing / import',
    ruleReference: 'Rule 6(1)(d)',
    description: 'Check month and year of manufacture or packing.',
    status: null,
    extractedValue: null,
    remarks: null,
  },
  {
    id: 'f-5',
    key: 'manufacturer',
    title: 'Manufacturer / Packer / Importer address',
    ruleReference: 'Rule 6(1)(a)',
    description: 'Check complete name and address particulars.',
    status: null,
    extractedValue: null,
    remarks: null,
  },
  {
    id: 'f-6',
    key: 'consumer-care',
    title: 'Consumer care details',
    ruleReference: 'Rule 6(2)',
    description: 'Check telephone number, email, and address for consumer redressal.',
    status: null,
    extractedValue: null,
    remarks: null,
  },
]

/**
 * ReportFindings
 *
 * Left-column container rendering findings checklist.
 */
export default function ReportFindings({
  findings = [],
  totalChecks = null,
  onFindingClick,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="card overflow-hidden bg-white border border-brand-border h-full flex flex-col justify-between" aria-busy="true">
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <div className="skeleton h-5 w-24 rounded" />
          <div className="skeleton h-5 w-16 rounded-full" />
        </div>
        <div className="p-5 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="skeleton h-4 w-44 rounded" />
              <div className="skeleton h-4 w-12 rounded" />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-brand-border">
          <div className="skeleton h-4 w-36 rounded mx-auto" />
        </div>
      </div>
    )
  }

  const itemsToRender = findings && findings.length > 0 ? findings : DEFAULT_DECLARATION_FINDINGS
  const checksCountLabel = totalChecks !== null ? `${totalChecks} checks` : '-- checks'

  return (
    <div className="card overflow-hidden bg-white border border-brand-border h-full flex flex-col justify-between shadow-xs">
      {/* Header */}
      <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between flex-shrink-0 bg-gray-50/40">
        <h3 className="text-sm sm:text-base font-bold text-navy">Findings</h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-navy/60 font-mono">
          {checksCountLabel}
        </span>
      </div>

      {/* Findings List */}
      <div className="flex-1 divide-y divide-brand-border">
        {itemsToRender.map((finding) => (
          <FindingRow
            key={finding.id || finding.key}
            finding={finding}
            onClick={onFindingClick}
          />
        ))}
      </div>

      {/* Footer Navigation Link */}
      <div className="px-5 py-3.5 border-t border-brand-border bg-gray-50/40 text-center flex-shrink-0">
        <Link
          to="/compliance-check"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-primary hover:text-teal-dark transition-colors group"
        >
          <span>View full compliance details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

