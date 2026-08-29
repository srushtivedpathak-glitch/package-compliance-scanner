import {
  Building2,
  Tag,
  Scale,
  IndianRupee,
  CalendarDays,
  Headphones,
  Hash,
  Type,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ExtractedFieldCard from './ExtractedFieldCard'

/**
 * 8 Core Legal Metrology Declaration Fields (Aligned with PACKCHECK database schema)
 */
const FIELD_DEFINITIONS = [
  {
    id: 'manufacturer',
    label: 'Manufacturer',
    icon: Building2,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-primary',
  },
  {
    id: 'productName',
    label: 'Product Name',
    icon: Tag,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-primary',
  },
  {
    id: 'netQuantity',
    label: 'Net Quantity',
    icon: Scale,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-primary',
  },
  {
    id: 'mrp',
    label: 'MRP (Inclusive of all taxes)',
    icon: IndianRupee,
    iconBg: 'bg-blue-50',
    iconColor: 'text-brand-info',
  },
  {
    id: 'mfgDate',
    label: 'Manufacture Date',
    icon: CalendarDays,
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
  },
  {
    id: 'consumerContact',
    label: 'Customer Care Contact',
    icon: Headphones,
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
  },
  {
    id: 'quantityUnit',
    label: 'Quantity Unit',
    icon: Scale,
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
  },
  {
    id: 'unitFormat',
    label: 'Unit Format',
    icon: Type,
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
  },
]

/**
 * ExtractedFieldGrid
 *
 * 2-column responsive grid rendering all 8 extraction declaration fields
 * with mobile-friendly text wrapping.
 */
export default function ExtractedFieldGrid({
  extractedData = {},
  confidenceData = {},
  editedFields = [],
  onFieldSave,
  isLoading = false,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
      {FIELD_DEFINITIONS.map((def, index) => {
        const value = extractedData[def.id] ?? null
        const confidence = confidenceData[def.id] ?? null
        const isEdited = editedFields.includes(def.id)

        return (
          <motion.div
            key={def.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            <ExtractedFieldCard
              id={def.id}
              label={def.label}
              value={value}
              confidence={confidence}
              icon={def.icon}
              iconBg={def.iconBg}
              iconColor={def.iconColor}
              isEdited={isEdited}
              onSave={onFieldSave}
              isLoading={isLoading}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
