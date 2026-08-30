import { useState, useRef } from 'react'
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScanLabelIllustration from './ScanLabelIllustration'
import { cn } from '../../utils/cn'

/**
 * ImageDropzone
 *
 * Handles label image uploads via drag-and-drop or file selection dialog.
 * Validates format (JPG, PNG, WEBP) and size (<= 10MB).
 * Renders the new Legal Metrology Label-Inspection illustration in the empty state.
 */
export default function ImageDropzone({ selectedFile, previewUrl, onFileSelect, onFileRemove }) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const validateAndProcessFile = (file) => {
    setErrorMessage(null)
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPG, PNG, or WEBP).')
      return
    }

    const maxSizeInBytes = 10 * 1024 * 1024 // 10 MB
    if (file.size > maxSizeInBytes) {
      setErrorMessage('File size exceeds the 10 MB limit.')
      return
    }

    onFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0])
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return ''
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
        aria-label="Upload label image"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        className={cn(
          'relative rounded-2xl sm:rounded-3xl border-2 border-dashed transition-all duration-200 overflow-hidden group',
          'flex flex-col items-center justify-center p-5 sm:p-8 md:p-10 text-center cursor-pointer select-none min-h-[380px] sm:min-h-[440px]',
          isDragActive
            ? 'border-teal-primary bg-emerald-50/40 ring-4 ring-teal-primary/10'
            : 'border-teal-primary/40 bg-gradient-to-b from-brand-bg/90 to-brand-sidebar/60 hover:border-teal-primary hover:bg-white/80'
        )}
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            /* ── Image Preview State (When actual file is selected) ── */
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center gap-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-[280px] sm:max-w-[340px] rounded-2xl overflow-hidden shadow-card-hover border-2 border-teal-primary/30 bg-white">
                <img
                  src={previewUrl}
                  alt="Selected package label preview"
                  className="w-full max-h-[220px] sm:max-h-[260px] object-contain bg-gray-50"
                />
                <button
                  onClick={onFileRemove}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-navy/75 hover:bg-navy text-white flex items-center justify-center transition-colors shadow-md"
                  aria-label="Remove uploaded image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* File Info Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-brand-border shadow-sm text-xs font-semibold text-navy">
                <CheckCircle2 className="w-4 h-4 text-brand-success flex-shrink-0" />
                <span className="truncate max-w-[180px] sm:max-w-[240px]">
                  {selectedFile?.name}
                </span>
                <span className="text-navy/40 font-normal">
                  ({formatFileSize(selectedFile?.size)})
                </span>
              </div>

              {/* Change Image Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-ghost text-xs mt-1 underline decoration-teal-primary/40 underline-offset-4"
              >
                Change label image
              </button>
            </motion.div>
          ) : (
            /* ── Empty Upload Area State with New Illustration ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center max-w-lg mx-auto w-full"
            >
              {/* 1. New Legal Metrology Inspection Illustration */}
              <ScanLabelIllustration isDragActive={isDragActive} />

              {/* 2. Upload Cloud Circle Icon */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-primary text-white flex items-center justify-center shadow-md mb-3 transition-transform duration-200 group-hover:scale-105 group-hover:-translate-y-0.5">
                <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
              </div>

              {/* 3. Primary Headings */}
              <h3 className="text-base sm:text-lg font-bold text-navy mb-1 leading-snug">
                {isDragActive ? 'Drop image to upload' : 'Drop your label image here'}
              </h3>
              <p className="text-xs sm:text-sm text-navy/50 mb-4 sm:mb-5 font-medium">
                or click to browse from your device
              </p>

              {/* 4. Choose Image Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 border border-brand-border rounded-xl text-xs sm:text-sm font-bold text-navy shadow-xs transition-all hover:shadow hover:border-teal-primary/50 active:scale-95"
              >
                <ImageIcon className="w-4 h-4 text-teal-primary" />
                <span>Choose image</span>
              </button>

              {/* 5. Supported format badges */}
              <p className="text-[11px] text-navy/40 mt-3.5 sm:mt-4 font-medium">
                JPG, PNG or WEBP &nbsp;•&nbsp; Max 10 MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Notification */}
        {errorMessage && (
          <div className="absolute bottom-3 left-4 right-4 bg-red-50 border border-red-200 text-brand-danger text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 justify-center shadow-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
