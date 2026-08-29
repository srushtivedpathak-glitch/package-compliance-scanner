import { displayValue } from '../../utils/complianceUtils'
import { cn } from '../../utils/cn'

/**
 * ScoreRing
 *
 * Compact circular progress meter for history table rows.
 */
export default function ScoreRing({ score = null, size = 36, strokeWidth = 3.5 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const validScore = typeof score === 'number' && !isNaN(score) ? Math.min(Math.max(score, 0), 100) : null
  const strokeDashoffset = validScore !== null ? circumference - (validScore / 100) * circumference : circumference

  const getColorClass = () => {
    if (validScore === null) return { stroke: '#CBD5E1', text: 'text-navy/50' } // neutral
    if (validScore >= 80) return { stroke: '#18A874', text: 'text-brand-success' } // green
    if (validScore >= 50) return { stroke: '#E6A817', text: 'text-brand-warning' } // amber
    return { stroke: '#E34B4B', text: 'text-brand-danger' } // red
  }

  const { stroke, text } = getColorClass()

  return (
    <div className="inline-flex items-center gap-2 select-none" aria-label={`Score: ${displayValue(score)} out of 100`}>
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            className="fill-transparent"
          />
          {validScore !== null ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="fill-transparent transition-all duration-500 ease-out"
            />
          ) : (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#CBD5E1"
              strokeWidth={strokeWidth}
              strokeDasharray="3 3"
              className="fill-transparent"
            />
          )}
        </svg>
        <span className={cn('absolute text-xs font-extrabold font-mono', text)}>
          {displayValue(score)}
        </span>
      </div>

      <span className="text-[11px] font-mono text-navy/45 font-semibold">
        /100
      </span>
    </div>
  )
}

