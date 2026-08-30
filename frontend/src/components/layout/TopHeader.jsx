import { Menu, Scale } from 'lucide-react'

/**
 * TopHeader
 *
 * Clean, minimal application top header bar.
 * Notifications and profile menus have been intentionally omitted
 * until authentication/authorization services are implemented.
 *
 * Props:
 *   onMenuToggle - callback to open mobile navigation drawer
 */
export default function TopHeader({ onMenuToggle }) {
  return (
    <header
      className="sticky top-0 z-30 h-[60px] sm:h-[64px] bg-white/90 backdrop-blur-sm border-b border-brand-border
                 flex items-center justify-between px-4 sm:px-6 select-none"
      role="banner"
    >
      {/* Left area — Mobile hamburger + Mobile Logo + Desktop Workspace title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger button — visible on mobile/tablet (< lg) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center
                     text-navy/60 hover:text-navy hover:bg-gray-100 transition-colors duration-150
                     flex-shrink-0 active:scale-95"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo & Brand — hidden on desktop (desktop sidebar displays it) */}
        <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-teal-primary flex items-center justify-center shadow-2xs">
            <Scale className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-navy">Nirikshan</span>
            <span className="text-[9px] font-semibold text-navy/45 mt-0.5">Legal Metrology</span>
          </div>
        </div>

        {/* Desktop Workspace title — visible on desktop (lg+) */}
        <span
          className="hidden lg:block text-[11px] font-bold tracking-widest uppercase text-navy/45 truncate"
          aria-label="Digital Inspection Workspace"
        >
          Digital Inspection Workspace
        </span>
      </div>

      {/* Right area — Intentionally clean and empty until auth is wired */}
      <div className="flex items-center" aria-hidden="true" />
    </header>
  )
}
