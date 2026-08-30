import { HELP_GUIDES } from '../../data/helpGuideData'
import GuideAccordion from './GuideAccordion'

/**
 * StepByStepGuides
 *
 * Section rendering the 6 detailed workflow accordions.
 */
export default function StepByStepGuides({
  openGuideId,
  highlightedGuideId,
  onToggleGuide,
}) {
  return (
    <section id="step-by-step-guides" className="space-y-3.5 scroll-mt-20">
      <h2 className="text-base sm:text-lg font-bold text-navy">
        Step-by-Step Guides
      </h2>

      <div className="space-y-2.5">
        {HELP_GUIDES.map((guide) => (
          <GuideAccordion
            key={guide.id}
            guide={guide}
            isOpen={openGuideId === guide.id}
            isHighlighted={highlightedGuideId === guide.id}
            onToggle={() => onToggleGuide(guide.id)}
          />
        ))}
      </div>
    </section>
  )
}

