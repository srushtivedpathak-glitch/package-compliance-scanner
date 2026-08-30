import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Loader2, ScanText } from 'lucide-react'
import { motion } from 'framer-motion'
import ScanStepper from '../components/scan/ScanStepper'
import ImageDropzone from '../components/scan/ImageDropzone'
import ScanTipsCard from '../components/scan/ScanTipsCard'
import MandatoryChecksCard from '../components/scan/MandatoryChecksCard'

/**
 * ScanPage
 *
 * Step 1 of 4: Label Image Upload & Scanner Setup
 * Allows officers to upload package labels, review scanning guidelines,
 * and view the mandatory Legal Metrology declaration checks.
 */
export default function ScanPage() {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleFileRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleStartScan = async () => {
    if (!selectedFile) return

    setIsScanning(true)

    try {
      const formData = new FormData()

      formData.append('image', selectedFile)

      const response = await fetch('http://localhost:3000/api/scans', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Scan failed')
      }

      console.log('Scan successful:', data)

      navigate('/extracted', {
        state: {
          scanResult: data,
        },
      })
    } catch (error) {
      console.error('Scan error:', error)
      alert(error.message || 'Failed to upload image')
    } finally {
      setIsScanning(false)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 lg:space-y-7 pb-10"
    >
      {/* ─── Top Header / Step Counter ─── */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-teal-primary block mb-1">
            STEP 01 / 04
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
            Scan a product label
          </h1>
          <p className="text-xs sm:text-sm text-navy/55 mt-1 font-medium">
            Upload a clear image of the front or back label to begin inspection.
          </p>
        </div>

        {/* Step Indicator Badge */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-sidebar border border-brand-border text-xs font-bold text-navy">
          <span className="text-teal-primary">01</span>
          <span className="text-navy/40">/</span>
          <span className="text-navy/60">04</span>
        </div>
      </div>

      {/* ─── Progress Stepper ─── */}
      <div>
        <ScanStepper currentStep={1} />
      </div>

      {/* ─── Main Content Grid (Dropzone + Tips) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] xl:grid-cols-[1.75fr_1fr] gap-5 lg:gap-6 items-start">
        {/* Left: Drag & Drop Zone */}
        <div className="w-full">
          <ImageDropzone
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
          />
        </div>

        {/* Right: Best Results Tips & Privacy Badge */}
        <div className="w-full">
          <ScanTipsCard />
        </div>
      </div>

      {/* ─── Bottom Section: Mandatory Declarations Checklist ─── */}
      <div>
        <MandatoryChecksCard />
      </div>

      {/* ─── Bottom Action Bar ─── */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-brand-border">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm font-semibold text-navy hover:bg-gray-100 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-navy/60" />
          Back
        </button>

        {/* Primary Scan Button */}
        <button
          type="button"
          onClick={handleStartScan}
          disabled={!selectedFile || isScanning}
          className={`btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-md ${!selectedFile ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
          aria-label="Scan label and proceed to information extraction"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ScanText className="w-4 h-4" />
              Scan label
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

