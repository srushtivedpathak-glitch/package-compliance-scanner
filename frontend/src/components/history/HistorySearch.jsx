import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'

/**
 * HistorySearch
 *
 * Dedicated search bar for querying database inspections by product name.
 * Features focus glow and quick-clear action.
 */
export default function HistorySearch({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center bg-white rounded-2xl border transition-all duration-200 shadow-2xs ${
          isFocused
            ? 'border-teal-primary ring-3 ring-teal-primary/15 shadow-sm'
            : 'border-brand-border/90 hover:border-teal-primary/40'
        }`}
      >
        {/* Search Icon */}
        <div className="pl-4 pr-2 flex items-center pointer-events-none">
          <Search
            className={`w-4 h-4 transition-colors duration-200 ${
              isFocused ? 'text-teal-primary' : 'text-navy/40'
            }`}
          />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search by product name..."
          className="w-full py-3.5 pr-10 text-xs sm:text-sm text-navy placeholder:text-navy/40 bg-transparent focus:outline-none font-medium"
          aria-label="Search inspections by product name"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-navy/50 flex items-center justify-center transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

