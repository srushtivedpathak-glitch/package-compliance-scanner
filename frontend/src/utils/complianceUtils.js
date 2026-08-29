import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Minus,
  Loader2,
} from 'lucide-react'

/**
 * Null-safe display helper that returns '--' when value is null, undefined, or empty string.
 * Leaves valid numbers (like 0) intact.
 *
 * @param {any} value
 * @returns {string}
 */
export function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '--'
  }
  return String(value)
}

/**
 * Format a percentage for display (e.g. 85 -> "85%", null -> "--%").
 *
 * @param {number|null|undefined} pct
 * @returns {string}
 */
export function displayPercentage(pct) {
  if (pct === null || pct === undefined || pct === '') {
    return '--%'
  }
  return `${pct}%`
}

/**
 * Compliance Status Configuration
 */
export const STATUS_CONFIG = {
  compliant: {
    id: 'compliant',
    label: 'Compliant',
    icon: CheckCircle2,
    textColor: 'text-brand-success',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    dotColor: 'bg-brand-success',
    badgeClass: 'bg-emerald-50 text-brand-success border-emerald-200',
  },
  'requires-review': {
    id: 'requires-review',
    label: 'Requires review',
    icon: AlertTriangle,
    textColor: 'text-brand-warning',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    dotColor: 'bg-brand-warning',
    badgeClass: 'bg-amber-50 text-brand-warning border-amber-200',
  },
  'non-compliant': {
    id: 'non-compliant',
    label: 'Non-compliant',
    icon: XCircle,
    textColor: 'text-brand-danger',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    dotColor: 'bg-brand-danger',
    badgeClass: 'bg-red-50 text-brand-danger border-red-200',
  },
  'not-applicable': {
    id: 'not-applicable',
    label: 'Not applicable',
    icon: Info,
    textColor: 'text-brand-info',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    dotColor: 'bg-brand-info',
    badgeClass: 'bg-blue-50 text-brand-info border-blue-200',
  },
  'not-detected': {
    id: 'not-detected',
    label: 'Not detected',
    icon: Minus,
    textColor: 'text-navy/40',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200',
    dotColor: 'bg-gray-400',
    badgeClass: 'bg-gray-100 text-navy/50 border-gray-200',
  },
  pending: {
    id: 'pending',
    label: 'Pending',
    icon: Loader2,
    textColor: 'text-teal-primary',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    dotColor: 'bg-teal-primary',
    badgeClass: 'bg-teal-50 text-teal-primary border-teal-200',
  },
  unknown: {
    id: 'unknown',
    label: '--',
    icon: Minus,
    textColor: 'text-navy/35',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    dotColor: 'bg-gray-300',
    badgeClass: 'bg-gray-50 text-navy/40 border-gray-200',
  },
}

/**
 * Derive authoritative summary counts from an array of compliance checks.
 *
 * @param {Array<Object>} checks
 * @returns {Object} summary
 */
export function deriveSummaryFromChecks(checks = []) {
  if (!checks || checks.length === 0) {
    return {
      totalChecks: null,
      compliant: null,
      compliantPercentage: null,
      requiresReview: null,
      requiresReviewPercentage: null,
      nonCompliant: null,
      nonCompliantPercentage: null,
      notApplicable: null,
      notApplicablePercentage: null,
    }
  }

  let compliant = 0
  let requiresReview = 0
  let nonCompliant = 0
  let notApplicable = 0

  checks.forEach((c) => {
    if (c.status === 'compliant') compliant++
    else if (c.status === 'requires-review') requiresReview++
    else if (c.status === 'non-compliant') nonCompliant++
    else if (c.status === 'not-applicable') notApplicable++
  })

  const total = checks.length
  const calcPct = (count) => (total > 0 ? Math.round((count / total) * 100) : null)

  return {
    totalChecks: total,
    compliant,
    compliantPercentage: calcPct(compliant),
    requiresReview,
    requiresReviewPercentage: calcPct(requiresReview),
    nonCompliant,
    nonCompliantPercentage: calcPct(nonCompliant),
    notApplicable,
    notApplicablePercentage: calcPct(notApplicable),
  }
}

/**
 * Legal Metrology (Packaged Commodities) Rules, 2011 Reference Dataset
 */
export const LEGAL_RULES_DATABASE = [
  {
    ruleNumber: 'Rule 6(1)(a)',
    title: 'Manufacturer / Packer / Importer Name & Address',
    chapter: 'Chapter II – Provisions Applicable to Packages Intended for Retail Sale',
    text: 'Every package shall bear the name and complete address of the manufacturer, or where the manufacturer is not the packer, the name and address of the manufacturer and packer, and in case of imported packages, the name and address of the importer.',
    notes: 'Address must include sufficient particulars (state, city, pin code) to enable consumer or inspector to reach the principal place of business.',
  },
  {
    ruleNumber: 'Rule 6(1)(b)',
    title: 'Common or Generic Name of Commodity',
    chapter: 'Chapter II – Declarations on Retail Packages',
    text: 'The common or generic names of the commodity contained in the package and in case of packages with more than one product, the name and number or quantity of each product shall be declared.',
    notes: 'Trade names or brand names alone are insufficient without the generic identification of the commodity.',
  },
  {
    ruleNumber: 'Rule 6(1)(c)',
    title: 'Net Quantity Declaration',
    chapter: 'Chapter II – Quantities and Measurement Units',
    text: 'The net quantity in terms of standard unit of weight or measure of the commodity contained in the package or where the commodity is packed or sold by number, the number of the commodity contained in the package shall be declared.',
    notes: 'Must use legal metric units (kg, g, L, ml, m, cm, No., etc.) with prescribed font size under Rule 7.',
  },
  {
    ruleNumber: 'Rule 6(1)(d)',
    title: 'Month & Year of Manufacture, Packing or Import',
    chapter: 'Chapter II – Manufacturing & Packing Date',
    text: 'The month and year in which the commodity is manufactured or pre-packed or imported shall be declared in words or numerals.',
    notes: 'Exemptions apply for certain specified agricultural products or commodities with specific shelf-life rules under other applicable laws.',
  },
  {
    ruleNumber: 'Rule 6(1)(e)',
    title: 'Maximum Retail Price (MRP) / Retail Sale Price',
    chapter: 'Chapter II – Retail Pricing',
    text: 'The retail sale price of the package shall be declared in the format: "Maximum or Max. Retail Price ₹ ... inclusive of all taxes" or "MRP ₹ ... incl. of all taxes".',
    notes: 'Declaration of individual taxes separately is prohibited. Must be all-inclusive.',
  },
  {
    ruleNumber: 'Rule 6(2)',
    title: 'Consumer Complaint Contact Details',
    chapter: 'Chapter II – Consumer Redressal',
    text: 'Every package shall bear the name, address, telephone number, and e-mail address of the person or office who can be reached in the case of consumer complaints.',
    notes: 'Contact details must be distinct and readily identifiable on the label.',
  },
  {
    ruleNumber: 'Rule 7',
    title: 'Font and Numeral Sizing Standards',
    chapter: 'Chapter II – Display Panel Proportions',
    text: 'The height of letters and numerals for all mandatory declarations shall be in proportion to the area of the principal display panel as prescribed in the schedule.',
    notes: 'Minimum numeral heights depend on net quantity: <=50g (1.5mm), 50g-200g (2.0mm), 200g-1kg (4.0mm), >1kg (6.0mm).',
  },
  {
    ruleNumber: 'Rule 8',
    title: 'Declaration Placement on Principal Display Panel',
    chapter: 'Chapter II – Display Area Requirements',
    text: 'All mandatory declarations shall appear on the principal display panel or on a label securely affixed thereto, grouped together in a distinct area.',
    notes: 'Declarations must not be obscured by artwork, background designs, or edge wraps.',
  },
  {
    ruleNumber: 'Rule 9',
    title: 'Legibility, Prominence and Contrast',
    chapter: 'Chapter II – Readability Standards',
    text: 'The declarations on every package shall be conspicuous, legible, definite, and in distinct contrast with the background of the package.',
    notes: 'Poor contrast between font and background or blurred printing constitutes non-compliance under this rule.',
  },
  {
    ruleNumber: 'Rule 12 & 13',
    title: 'Standard Units and Symbols of Weight or Measure',
    chapter: 'Chapter II – Units Format',
    text: 'Standard units of weight, volume, length, area, or number shall be used without non-standard symbols, abbreviations, or capitalization errors.',
    notes: 'e.g. use "g" or "kg", not "Gms", "Kgs", "kilo", or "Ltr".',
  },
]

