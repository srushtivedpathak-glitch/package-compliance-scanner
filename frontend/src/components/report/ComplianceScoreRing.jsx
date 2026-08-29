import { motion } from 'framer-motion'
import { displayValue } from '../../utils/complianceUtils'

/**
 * ComplianceScoreRing
 *
 * Circular animated progress meter displaying inspection score (0-100 or -- / 100).
 */
export default function ComplianceScoreRing({
  score = null,
  status = null,
  size = 110,
  strokeWidth = 9,
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const validScore = typeof score === 'number' && !isNaN(score) ? Math.min(Math.max(score, 0), 100) : null
  const progressOffset = validScore !== null ? circumference - (validScore / 100) * circumference : circumference

  // Color config based on status
  const getColor = () => {
    if (validScore === null) return '#4A6B82' // neutral gray-amber
    if (status === 'compliant' || validScore >= 80) return '#18A874' // teal-green
    if (status === 'needs-review' || validScore >= 50) return '#E6A817' // amber
    return '#E34B4B' // red
  }

  const strokeColor = getColor()

  return (
    <div
      className="relative flex items-center justify-center select-none flex-shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={validScore !== null ? validScore : 0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Compliance score: ${validScore !== null ? validScore : 'Not evaluated'}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/15 fill-transparent"
        />

        {/* Dynamic progress circle */}
        {validScore !== null ? (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            strokeLinecap="round"
            className="fill-transparent"
          />
        ) : (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3B5A70"
            strokeWidth={strokeWidth}
            strokeDasharray="6 6"
            className="fill-transparent opacity-60"
          />
        )}
      </svg>

      {/* Inner score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
          {displayValue(score)}
        </span>
        <span className="text-[10px] font-semibold text-white/50 mt-1 uppercase tracking-wider">
          / 100
        </span>
      </div>
    </div>
  )
}

