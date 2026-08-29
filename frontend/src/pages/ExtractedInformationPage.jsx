import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import ScanStepper from '../components/scan/ScanStepper'
import ExtractionSummary from '../components/extraction/ExtractionSummary'
import ExtractedFieldGrid from '../components/extraction/ExtractedFieldGrid'
import ConfidenceLegend from '../components/extraction/ConfidenceLegend'
import ReviewInfoCard from '../components/extraction/ReviewInfoCard'
import OriginalImageModal from '../components/extraction/OriginalImageModal'
import { getExtraction, updateExtractedField } from '../services/extractionService'

/**
 * ExtractedInformationPage
 *
 * Step 2 of 4: Extracted Information & OCR Verification
 * Allows Legal Metrology officers to review detected label declarations,
 * confidence scores, and make manual corrections before compliance checks.
 */
export default function ExtractedInformationPage() {
  const navigate = useNavigate()

  // 8 Core Legal Metrology Declaration Fields
  const [extractedData, setExtractedData] = useState({
    manufacturer: null,
    productName: null,
    netQuantity: null,
    mrp: null,
    mfgDate: null,
    consumerContact: null,
    quantityUnit: null,
    unitFormat: null,
  })

  const [confidenceData, setConfidenceData] = useState({
    manufacturer: null,
    productName: null,
    netQuantity: null,
    mrp: null,
    mfgDate: null,
    consumerContact: null,
    quantityUnit: null,
    unitFormat: null,
  })

  const [identifiedFields, setIdentifiedFields] = useState(null)
  const [totalFields, setTotalFields] = useState(null)
  const [overallConfidence, setOverallConfidence] = useState(null)
  const [originalImage, setOriginalImage] = useState(null)

  // UI / interaction states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editedFields, setEditedFields] = useState([])
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isProceeding, setIsProceeding] = useState(false)

  // Fetch extraction data
  const loadExtraction = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await getExtraction('latest')
      if (res) {
        setExtractedData(res.extraction || {})
        setConfidenceData(res.confidence || {})
        setIdentifiedFields(res.identifiedFields)
        setTotalFields(res.totalFields)
        setOverallConfidence(res.overallConfidence)
        setOriginalImage(res.originalImage)
      }
    } catch (err) {
      console.error('[ExtractedInformationPage] Failed to load extraction:', err)
      setError('Unable to load extracted information.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadExtraction()
  }, [loadExtraction])

  // Handle saving an edited field
  const handleFieldSave = async (fieldId, newValue) => {
    setExtractedData((prev) => ({
      ...prev,
      [fieldId]: newValue,
    }))

    if (!editedFields.includes(fieldId)) {
      setEditedFields((prev) => [...prev, fieldId])
    }

    // Persist via service
    try {
      await updateExtractedField('latest', fieldId, newValue)
    } catch (err) {
      console.error('[ExtractedInformationPage] Field update error:', err)
    }
  }

  // Proceed to Step 3 (Compliance Check)
  const handleProceed = () => {
    setIsProceeding(true)
    setTimeout(() => {
      setIsProceeding(false)
      navigate('/compliance-check')
    }, 850)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 lg:space-y-7 pb-12"
    >
      {/* ─── Top Header & Step Counter ─── */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
            STEP 02 / 04
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            Review extracted information
          </h1>
          <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium">
            Review the declarations identified from the label before checking compliance.
          </p>
        </div>

        {/* Step Indicator Badge */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-sidebar border border-brand-border text-xs font-bold text-navy">
          <span className="text-teal-primary">02</span>
          <span className="text-navy/40">/</span>
          <span className="text-navy/60">04</span>
        </div>
      </div>

      {/* ─── Workflow Stepper ─── */}
      <div>
        <ScanStepper currentStep={2} />
      </div>

      {/* ─── Error Alert ─── */}
      {error && !isLoading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-brand-danger text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={loadExtraction}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-xl font-bold hover:bg-red-100/50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* ─── Extraction Summary Banner ─── */}
      <div>
        <ExtractionSummary
          identifiedFields={identifiedFields}
          totalFields={totalFields}
          overallConfidence={overallConfidence}
          onViewOriginalImage={() => setIsImageModalOpen(true)}
          isLoading={isLoading}
        />
      </div>

      {/* ─── Main Content: 2-Col Field Cards Grid + Sidebar Widgets ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-5 lg:gap-6 items-start">
        {/* Left Column: 8 Field Cards */}
        <div className="w-full">
          <ExtractedFieldGrid
            extractedData={extractedData}
            confidenceData={confidenceData}
            editedFields={editedFields}
            onFieldSave={handleFieldSave}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column: Informational Cards */}
        <div className="w-full space-y-4">
          <ConfidenceLegend />
          <ReviewInfoCard />
        </div>
      </div>

      {/* ─── Bottom Actions Bar ─── */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-border gap-4 flex-wrap">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/scan')}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm font-semibold text-navy hover:bg-gray-100 transition-colors active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-navy/60 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Proceed to Compliance Check Button */}
        <button
          type="button"
          onClick={handleProceed}
          disabled={isProceeding}
          className="btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-md hover:shadow-lg transition-all group"
          aria-label="Proceed to compliance check"
        >
          {isProceeding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Evaluating rules...</span>
            </>
          ) : (
            <>
              <span>Proceed to compliance check</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      {/* ─── Original Image Modal ─── */}
      <OriginalImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={originalImage}
      />
    </motion.div>
  )
}
