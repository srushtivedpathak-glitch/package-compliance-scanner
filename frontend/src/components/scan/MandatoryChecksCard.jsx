import { useState } from 'react'
import {
  Package,
  Scale,
  Receipt,
  Calendar,
  Building2,
  Headphones,
  Info,
  ChevronDown,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

const MANDATORY_DECLARATIONS = [
  {
    id: 'product-identity',
    title: 'Product Identity',
    description: 'Name & nature of the commodity',
    icon: Package,
    ruleRef: 'Rule 6(1)(a)',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-brand-success',
  },
  {
    id: 'net-quantity',
    title: 'Net Quantity',
    description: 'Quantity declared on the package',
    icon: Scale,
    ruleRef: 'Rule 6(1)(b)',
    iconBg: 'bg-teal-light',
    iconColor: 'text-teal-primary',
  },
  {
    id: 'mrp',
    title: 'MRP',
    description: 'Inclusive of all taxes',
    icon: Receipt,
    ruleRef: 'Rule 6(1)(e)',
    iconBg: 'bg-blue-50',
    iconColor: 'text-brand-info',
  },
  {
    id: 'mfg-date',
    title: 'Mfg. / Pkg. Date',
    description: 'Month & year of manufacture/packing',
    icon: Calendar,
    ruleRef: 'Rule 6(1)(d)',
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer Details',
    description: 'Name & address',
    icon: Building2,
    ruleRef: 'Rule 6(1)(c)',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'consumer-care',
    title: 'Consumer Care',
    description: 'Contact details & support',
    icon: Headphones,
    ruleRef: 'Rule 6(1)(f)',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
]

/**
 * MandatoryChecksCard
 *
 * Renders the 6 mandatory declarations required under the Legal Metrology
 * (Packaged Commodities) Rules, 2011.
 */
export default function MandatoryChecksCard() {
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(true)

  return (
    <div className="card p-5 sm:p-6 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-bold text-navy">What will be checked?</h3>
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-navy/40 hover:text-teal-primary hover:bg-teal-50 transition-colors"
            aria-label="Legal Metrology rules information"
            title="View Legal Metrology reference"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray-100 transition-colors"
          aria-label="Toggle declarations list"
        >
          <ChevronDown
            className={cn('w-4 h-4 transition-transform duration-200', isMobileOpen && 'rotate-180')}
          />
        </button>
      </div>

      {/* Declarations Grid */}
      <AnimatePresence initial={false}>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-4"
          >
            {MANDATORY_DECLARATIONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center p-3 rounded-2xl bg-brand-bg/60 border border-brand-border/60 hover:bg-white hover:shadow-card transition-all duration-150 group"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105',
                      item.iconBg
                    )}
                  >
                    <Icon className={cn('w-5 h-5', item.iconColor)} strokeWidth={1.8} />
                  </div>
                  <h4 className="text-xs font-bold text-navy mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-navy/55 leading-tight font-medium">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-brand-border"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-primary text-white flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-navy">Legal Metrology Compliance</h3>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-navy/50 hover:text-navy"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs text-navy/70 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
                <p>
                  Under <strong>Rule 6 of Legal Metrology (Packaged Commodities) Rules, 2011</strong>, every package shall bear thereon or on label securely affixed thereto definite, plain and conspicuous declarations including:
                </p>
                <ul className="list-disc pl-4 space-y-1.5 text-navy/80">
                  <li><strong>Product Identity:</strong> Name and common or generic names of the commodity.</li>
                  <li><strong>Net Quantity:</strong> Net quantity in terms of standard unit of weight or measure.</li>
                  <li><strong>Maximum Retail Price (MRP):</strong> Retail sale price inclusive of all taxes.</li>
                  <li><strong>Mfg./Packing Date:</strong> Month and year in which commodity is manufactured/pre-packed.</li>
                  <li><strong>Manufacturer/Packer:</strong> Name and complete address of the manufacturer or packer.</li>
                  <li><strong>Consumer Care Details:</strong> Name, address, telephone number, e-mail ID of person who can be reached for consumer complaints.</li>
                </ul>
              </div>

              <div className="pt-3 border-t border-brand-border flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="btn-primary text-xs px-4 py-2"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

