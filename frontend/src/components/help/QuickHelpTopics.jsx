import { motion } from 'framer-motion'
import { QUICK_HELP_TOPICS } from '../../data/helpGuideData'
import QuickHelpCard from './QuickHelpCard'

/**
 * QuickHelpTopics
 *
 * 4-card responsive grid presenting high-level help categories.
 */
export default function QuickHelpTopics({ onSelectTopic }) {
  return (
    <div className="space-y-3.5">
      <h2 className="text-base sm:text-lg font-bold text-navy">
        Quick Help Topics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {QUICK_HELP_TOPICS.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <QuickHelpCard topic={topic} onSelect={onSelectTopic} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

