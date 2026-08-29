import { useState } from 'react'
import { ImageOff, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

/**
 * EvidenceViewer
 *
 * Renders visual OCR bounding box or cropped label region evidence
 * with zoom capability and graceful fallback.
 */
export default function EvidenceViewer({ evidence = [] }) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const hasEvidence = evidence && evidence.length > 0

  if (!hasEvidence) {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-bg/60 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-xl bg-gray-100 text-navy/40 flex items-center justify-center mb-2">
          <ImageOff className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <p className="text-xs font-bold text-navy/70">No visual evidence available</p>
        <p className="text-[11px] text-navy/45 mt-0.5">
          Backend evaluation relied on extracted text coordinates or rule logic.
        </p>
      </div>
    )
  }

  const currentItem = evidence[0]

  return (
    <div className="rounded-2xl border border-brand-border bg-white overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-brand-border bg-gray-50/50 text-xs font-semibold text-navy">
        <span>{currentItem.label || 'Crop Evidence'}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200/70 text-navy/60"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-navy/50">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200/70 text-navy/60"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 flex items-center justify-center bg-gray-900/5 min-h-[160px] overflow-hidden">
        <img
          src={currentItem.url}
          alt={currentItem.label || 'Visual evidence crop'}
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-h-48 object-contain transition-transform duration-150 rounded-lg shadow-sm"
        />
      </div>
    </div>
  )
}

