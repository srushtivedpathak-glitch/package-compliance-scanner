import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * FeatureCard
 *
 * One of four capability highlight cards below the hero.
 *
 * Props:
 *   icon        - Lucide icon component
 *   title       - card heading
 *   description - supporting text
 *   iconBg      - Tailwind bg class for icon container (e.g. 'bg-teal-light')
 *   iconColor   - Tailwind text class for icon (e.g. 'text-teal-primary')
 *   delay       - stagger delay in seconds
 */
export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBg = 'bg-teal-light',
  iconColor = 'text-teal-primary',
  delay = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="card p-5 xl:p-6 flex flex-col gap-4 cursor-default
                 hover:shadow-card-hover transition-shadow duration-200"
    >
      {/* Icon */}
      <div
        className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
          iconBg
        )}
        aria-hidden="true"
      >
        <Icon className={cn('w-5 h-5', iconColor)} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-[15px] font-semibold text-navy mb-1.5">{title}</h3>
        <p className="text-sm text-navy/55 leading-relaxed">{description}</p>
      </div>
    </motion.article>
  )
}

