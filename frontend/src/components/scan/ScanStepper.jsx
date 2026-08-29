import { ScanText, FileText, ClipboardCheck, FileCheck, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const STEPS = [
  { id: 1, label: 'Scan Label', shortLabel: 'Scan', icon: ScanText },
  { id: 2, label: 'Extract Info', shortLabel: 'Extract', icon: FileText },
  { id: 3, label: 'Compliance Check', shortLabel: 'Check', icon: ClipboardCheck },
  { id: 4, label: 'Report', shortLabel: 'Report', icon: FileCheck },
]

/**
 * ScanStepper
 *
 * Displays the 4-step inspection workflow with completion checkmarks
 * and smooth animated connector transitions.
 */
export default function ScanStepper({ currentStep = 1 }) {
  return (
    <div className="w-full">
      {/* ─── Desktop Stepper ─── */}
      <div className="hidden sm:flex items-center gap-2 md:gap-3 p-1.5 bg-brand-sidebar/70 rounded-2xl border border-brand-border/80 w-fit">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep
          const StepIcon = step.icon

          return (
            <div key={step.id} className="flex items-center gap-2 md:gap-3">
              {/* Step Pill / Circle */}
              <motion.div
                initial={isActive && currentStep === 4 ? { scale: 0.95 } : false}
                animate={isActive && currentStep === 4 ? { scale: [0.95, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-teal-primary text-white shadow-sm'
                    : isCompleted
                    ? 'bg-teal-50 text-teal-primary font-bold'
                    : 'text-navy/45 hover:text-navy/70'
                )}
              >
                {isCompleted ? (
                  <span className="w-4 h-4 rounded-full bg-teal-primary text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                ) : (
                  <StepIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
                )}
                <span>{step.label}</span>
              </motion.div>

              {/* Connecting line */}
              {index < STEPS.length - 1 && (
                <div className="w-6 md:w-8 h-0.5 relative overflow-hidden" aria-hidden="true">
                  <div className="w-full h-full border-t-2 border-dashed border-brand-border" />
                  {isCompleted && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="absolute inset-0 border-t-2 border-dashed border-teal-primary"
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ─── Mobile Stepper ─── */}
      <div className="sm:hidden flex items-center justify-between px-3 py-3 bg-brand-sidebar/70 rounded-2xl border border-brand-border/80">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-1 mx-auto text-center">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                    isActive
                      ? 'bg-teal-primary text-white shadow-sm ring-4 ring-teal-primary/15'
                      : isCompleted
                      ? 'bg-teal-50 text-teal-primary font-bold'
                      : 'bg-gray-200/80 text-navy/50'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-teal-primary" strokeWidth={3} />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium leading-tight',
                    isActive ? 'text-teal-primary font-bold' : isCompleted ? 'text-teal-primary' : 'text-navy/50'
                  )}
                >
                  {step.shortLabel}
                </span>
              </div>

              {/* Connecting line on mobile */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 border-t border-dashed -mt-4 mx-1',
                    isCompleted ? 'border-teal-primary' : 'border-brand-border'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
