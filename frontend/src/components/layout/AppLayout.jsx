import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileSidebar from './MobileSidebar'
import TopHeader from './TopHeader'

/**
 * AppLayout
 *
 * Root layout shell:
 *   [fixed sidebar 240px-260px] | [flex-1 scrollable area]
 *                                   [sticky header]
 *                                   [main content via <Outlet/>]
 *
 * Manages mobile sidebar open/close state.
 */
export default function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg">
      {/* ─── Desktop Sidebar (fixed, hidden on mobile/tablet < lg) ─── */}
      <div
        className="hidden lg:flex flex-col w-[240px] xl:w-[260px] flex-shrink-0
                   border-r border-brand-border shadow-sidebar h-screen sticky top-0"
        aria-label="Desktop navigation"
      >
        <Sidebar />
      </div>

      {/* ─── Mobile Sidebar Drawer ─── */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* ─── Right Column: Header + Scrollable Content ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader onMenuToggle={() => setIsMobileSidebarOpen(true)} />

        {/* Scrollable content area */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto"
          role="main"
          aria-label="Main content"
        >
          <div className="max-w-[1600px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
