import { useState } from 'react'
import { motion } from 'framer-motion'
import HelpHeader from '../components/help/HelpHeader'
import QuickHelpTopics from '../components/help/QuickHelpTopics'
import StepByStepGuides from '../components/help/StepByStepGuides'
import LegalNotice from '../components/help/LegalNotice'

/**
 * HelpAndGuidePage
 *
 * Dedicated informational & workflow guide page for Legal Metrology Officers.
 * Explains how to use the 4-step inspection workflow, review extracted information,
 * understand compliance check outcomes, and manage past inspection records.
 */
export default function HelpAndGuidePage() {
  const [openGuideId, setOpenGuideId] = useState(null)
  const [highlightedGuideId, setHighlightedGuideId] = useState(null)

  const handleSelectTopic = (guideId) => {
    setOpenGuideId(guideId)
    setHighlightedGuideId(guideId)

    // Smooth scroll to the targeted accordion guide
    setTimeout(() => {
      const element = document.getElementById(guideId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 50)

    // Remove temporary highlight glow after 900ms
    setTimeout(() => {
      setHighlightedGuideId(null)
    }, 900)
  }

  const handleToggleGuide = (guideId) => {
    setOpenGuideId((prev) => (prev === guideId ? null : guideId))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-7 lg:space-y-8 pb-12 max-w-6xl mx-auto"
    >
      {/* 1. Page Header */}
      <HelpHeader />

      {/* 2. Quick Help Topics (4 Cards) */}
      <QuickHelpTopics onSelectTopic={handleSelectTopic} />

      {/* 3. Step-by-Step Guides (6 Accordions) */}
      <StepByStepGuides
        openGuideId={openGuideId}
        highlightedGuideId={highlightedGuideId}
        onToggleGuide={handleToggleGuide}
      />

      {/* 4. Legal / Informational Notice Banner */}
      <LegalNotice />
    </motion.div>
  )
}

