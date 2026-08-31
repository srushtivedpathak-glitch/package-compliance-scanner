import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'

import ScanStepper from '../components/scan/ScanStepper'
import ExtractionSummary from '../components/extraction/ExtractionSummary'
import ExtractedFieldGrid from '../components/extraction/ExtractedFieldGrid'
import ConfidenceLegend from '../components/extraction/ConfidenceLegend'
import ReviewInfoCard from '../components/extraction/ReviewInfoCard'
import OriginalImageModal from '../components/extraction/OriginalImageModal'

export default function ExtractedInformationPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Result received from ScanPage
  const scanResult = location.state?.scanResult

  const product = scanResult?.product || {}
  const ruleResults = scanResult?.rule_results || []

  // ---------------------------------------------------------
  // Find confidence for a particular backend rule field
  // ---------------------------------------------------------

  const getRuleConfidence = (field) => {
    const rule = ruleResults.find(
      (item) => item.field === field
    )

    return rule?.confidence ?? null
  }

  // ---------------------------------------------------------
  // Convert backend response to frontend field structure
  // ---------------------------------------------------------

  const extractedData = {
    manufacturer:
      product.manufacturer ?? null,

    productName:
      product.product_name ?? null,

    netQuantity:
      product.net_quantity ?? null,

    mrp:
      product.mrp ?? null,

    mfgDate:
      product.manufacture_date ??
      ruleResults.find(
        (item) =>
          item.field ===
          'manufacture_prepack_import_date'
      )?.value ??
      null,

    consumerContact:
      product.consumer_complaint_contact ??
      ruleResults.find(
        (item) =>
          item.field ===
          'consumer_complaint_contact'
      )?.value ??
      null,

    quantityUnit:
      product.quantity_unit ??
      ruleResults.find(
        (item) =>
          item.field === 'quantity_unit'
      )?.value ??
      null,

    unitFormat:
      product.unit_format ??
      ruleResults.find(
        (item) =>
          item.field === 'unit_format'
      )?.value ??
      null,
  }

  // ---------------------------------------------------------
  // Confidence values
  // ---------------------------------------------------------

  const confidenceData = {
    manufacturer:
      getRuleConfidence('manufacturer'),

    productName:
      getRuleConfidence('product_name'),

    netQuantity:
      getRuleConfidence('net_quantity'),

    mrp:
      getRuleConfidence('mrp'),

    mfgDate:
      getRuleConfidence(
        'manufacture_prepack_import_date'
      ),

    consumerContact:
      getRuleConfidence(
        'consumer_complaint_contact'
      ),

    quantityUnit:
      getRuleConfidence('quantity_unit'),

    unitFormat:
      getRuleConfidence('unit_format'),
  }

  // ---------------------------------------------------------
  // Number of identified fields
  // ---------------------------------------------------------

  const identifiedFields =
    Object.values(extractedData).filter(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== ''
    ).length

  const totalFields = 8

  // ---------------------------------------------------------
  // Overall confidence
  // ---------------------------------------------------------

  const confidenceValues =
    Object.values(confidenceData).filter(
      (value) =>
        typeof value === 'number'
    )

  const overallConfidence =
    confidenceValues.length > 0
      ? confidenceValues.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / confidenceValues.length
      : null

  // ---------------------------------------------------------
  // UI states
  // ---------------------------------------------------------

  const originalImage =
    scanResult?.image_url || null

  const [isImageModalOpen, setIsImageModalOpen] =
    useState(false)

  const [isProceeding, setIsProceeding] =
    useState(false)

  // ---------------------------------------------------------
  // No scan result
  // ---------------------------------------------------------

  if (!scanResult) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="space-y-6 pb-12"
      >
        <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-brand-danger">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />

          <span className="text-sm font-medium">
            No scan result found. Please scan a
            product label first.
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate('/scan')
          }
          className="btn-primary px-5 py-2.5"
        >
          Go to Scan
        </button>
      </motion.div>
    )
  }

  // ---------------------------------------------------------
  // Proceed to Compliance Check
  // ---------------------------------------------------------

  const handleProceed = () => {
    setIsProceeding(true)

    setTimeout(() => {
      setIsProceeding(false)

      navigate('/compliance-check', {
        state: {
          scanResult,
        },
      })
    }, 500)
  }

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-6 lg:space-y-7 pb-12"
    >

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
            STEP 02 / 04
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            Review extracted information
          </h1>

          <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium">
            Review the declarations identified from
            the label before checking compliance.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-sidebar border border-brand-border text-xs font-bold text-navy">
          <span className="text-teal-primary">
            02
          </span>

          <span className="text-navy/40">
            /
          </span>

          <span className="text-navy/60">
            04
          </span>
        </div>
      </div>

      {/* Stepper */}

      <div>
        <ScanStepper currentStep={2} />
      </div>

      {/* Extraction Summary */}

      <div>
        <ExtractionSummary
          identifiedFields={identifiedFields}
          totalFields={totalFields}
          overallConfidence={overallConfidence}
          onViewOriginalImage={() =>
            setIsImageModalOpen(true)
          }
          isLoading={false}
        />
      </div>

      {/* Main Content */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-5 lg:gap-6 items-start">

        {/* Field Grid */}

        <div className="w-full">
          <ExtractedFieldGrid
            extractedData={extractedData}
            confidenceData={confidenceData}

           
            editedFields={[]}

            onFieldSave={() => {}}
            isLoading={false}
          />
        </div>

        {/* Sidebar */}

        <div className="w-full space-y-4">
          <ConfidenceLegend />
          <ReviewInfoCard />
        </div>

      </div>

      {/* Bottom Actions */}

      <div className="flex items-center justify-between pt-4 border-t border-brand-border gap-4 flex-wrap">

        {/* Back */}

        <button
          type="button"
          onClick={() =>
            navigate('/scan')
          }
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm font-semibold text-navy hover:bg-gray-100 transition-colors active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-navy/60 transition-transform group-hover:-translate-x-1" />

          Back
        </button>

        {/* Proceed */}

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

              <span>
                Evaluating rules...
              </span>
            </>
          ) : (
            <>
              <span>
                Proceed to compliance check
              </span>

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

      </div>

      {/* Original Image Modal */}

      <OriginalImageModal
        isOpen={isImageModalOpen}
        onClose={() =>
          setIsImageModalOpen(false)
        }
        imageUrl={originalImage}
      />

    </motion.div>
  )
}