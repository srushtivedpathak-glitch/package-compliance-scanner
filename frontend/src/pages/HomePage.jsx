import { ShieldCheck, ScanText, FileCheck, History } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import FeatureCard from '../components/home/FeatureCard'
import QuickOverview from '../components/home/QuickOverview'
import RecentActions from '../components/home/RecentActions'
import { useDashboard } from '../hooks/useDashboard'

/** Feature card data — kept in page scope so FeatureCard stays generic */
const FEATURE_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Rule-aware',
    description: 'Checks aligned with Legal Metrology Act & Rules, 2011',
    iconBg: 'bg-teal-light',
    iconColor: 'text-teal-primary',
  },
  {
    icon: ScanText,
    title: 'OCR assisted',
    description: 'Structured extraction from label images with high accuracy',
    iconBg: 'bg-blue-50',
    iconColor: 'text-brand-info',
  },
  {
    icon: FileCheck,
    title: 'Actionable',
    description: 'Clear findings with violation highlights & recommendations',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
  },
  {
    icon: History,
    title: 'Traceable',
    description: 'Maintain inspection history and generate compliance reports',
    iconBg: 'bg-amber-50',
    iconColor: 'text-brand-warning',
  },
]

/**
 * HomePage
 *
 * Assembles all home page sections.
 * Uses useDashboard hook for all data — zero fetch calls in JSX.
 */
export default function HomePage() {
  const {
    stats,
    recentActions,
    isDashboardLoading,
    isRecentActionsLoading,
    statsError,
    actionsError,
    retryStats,
    retryActions,
  } = useDashboard()

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Feature Cards ── */}
      <section aria-label="Key capabilities" className="mb-6 lg:mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4">
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCard
              key={card.title}
              {...card}
              delay={i * 0.08}
            />
          ))}
        </div>
      </section>

      {/* ── Dashboard Overview ── */}
      <section
        aria-label="Dashboard statistics and recent actions"
        className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-6 items-stretch"
      >
        {/* Quick Overview */}
        <QuickOverview
          stats={stats}
          isLoading={isDashboardLoading}
          error={statsError}
          onRetry={retryStats}
        />

        {/* Recent Actions */}
        <RecentActions
          actions={recentActions}
          isLoading={isRecentActionsLoading}
          error={actionsError}
          onRetry={retryActions}
        />
      </section>

      {/* Bottom spacing */}
      <div className="h-8" aria-hidden="true" />
    </>
  )
}

