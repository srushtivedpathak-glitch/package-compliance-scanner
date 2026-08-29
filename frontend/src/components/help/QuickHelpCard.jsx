import { ArrowRight, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * QuickHelpCard
 *
 * Responsive card for high-level workflow topics.
 * Smoothly scrolls to the target guide on click.
 */
export default function QuickHelpCard({ topic, onSelect }) {
  const Icon = topic.icon

  return (
    <motion.button
      type="button"
      onClick={() => onSelect && onSelect(topic.guideId)}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className={cn(
        'card p-4 sm:p-5 text-left bg-white border border-brand-border/90 rounded-2xl transition-all duration-200',
        'hover:shadow-card-hover hover:border-teal-primary/40 group flex flex-col justify-between h-full w-full cursor-pointer',
        topic.borderHover
      )}
      aria-label={`View guide for ${topic.title}`}
    >
      {/* Desktop / Tablet Vertical View */}
      <div className="hidden sm:flex flex-col h-full justify-between gap-4">
        <div>
          {/* Icon */}
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 shadow-2xs transition-transform duration-200 group-hover:scale-105',
              topic.iconBg
            )}
            aria-hidden="true"
          >
            <Icon className={cn('w-5 h-5', topic.iconColor)} strokeWidth={2} />
          </div>

          {/* Title & Description */}
          <h3 className="text-sm font-bold text-navy leading-snug">
            {topic.title}
          </h3>
          <p className="text-xs text-navy/55 font-medium leading-relaxed mt-1.5 line-clamp-2">
            {topic.description}
          </p>
        </div>

        {/* CTA Link */}
        <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-teal-primary group-hover:text-teal-dark transition-colors">
          <span>View guide</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Mobile Compact Horizontal View (< 640px) */}
      <div className="sm:hidden flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs',
              topic.iconBg
            )}
            aria-hidden="true"
          >
            <Icon className={cn('w-4 h-4', topic.iconColor)} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-navy truncate">
              {topic.title}
            </h3>
            <p className="text-[11px] text-navy/50 truncate mt-0.5">
              {topic.description}
            </p>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-navy/30 group-hover:text-teal-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>
    </motion.button>
  )
}

