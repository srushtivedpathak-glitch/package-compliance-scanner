import { NavLink, useLocation } from 'react-router-dom'
import { Scale, Check } from 'lucide-react'
import { NAV_ITEMS } from '../../constants/navigation'
import { cn } from '../../utils/cn'

/**
 * NavItem — individual sidebar navigation link
 */
function NavItem({ item }) {
  const location = useLocation()

  const isActive = item.exact
    ? location.pathname === item.path
    : location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/'))

  // Determine if this step is a completed prior step in the inspection workflow
  const isCompletedStep =
    (item.id === 'scan' &&
      (location.pathname === '/extracted' ||
        location.pathname === '/compliance-check' ||
        location.pathname === '/compliance-report')) ||
    (item.id === 'extracted' &&
      (location.pathname === '/compliance-check' ||
        location.pathname === '/compliance-report')) ||
    (item.id === 'compliance-check' &&
      location.pathname === '/compliance-report')

  const Icon = item.icon

  return (
    <li>
      <NavLink
        to={item.path}
        end={item.exact}
        aria-current={isActive ? 'page' : undefined}
        className={({ isActive: navIsActive }) =>
          cn(
            'group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold',
            'transition-all duration-200 cursor-pointer select-none',
            navIsActive
              ? 'bg-white text-navy shadow-xs border border-brand-border/60 before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-1 before:bg-teal-primary before:rounded-r-full'
              : 'text-navy/60 hover:text-navy hover:bg-white/60'
          )
        }
      >
        <span
          className={cn(
            'flex-shrink-0 transition-transform duration-200',
            'group-hover:translate-x-0.5'
          )}
        >
          <Icon
            className={cn(
              'w-[18px] h-[18px] transition-colors duration-200',
              isActive ? 'text-teal-primary' : 'text-navy/50 group-hover:text-navy/80'
            )}
            strokeWidth={isActive ? 2.2 : 1.8}
          />
        </span>

        <span className="flex-1 truncate">{item.label}</span>

        {/* Completed step checkmark */}
        {isCompletedStep && !isActive && (
          <span className="w-4 h-4 rounded-full bg-teal-50 text-teal-primary flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5" strokeWidth={3} />
          </span>
        )}
      </NavLink>
    </li>
  )
}

/**
 * Sidebar
 *
 * Fixed desktop sidebar (240px). Contains brand, 7-item navigation, and legal notice footer.
 */
export default function Sidebar({ onNavigate }) {
  return (
    <aside
      className="flex flex-col h-full bg-brand-sidebar overflow-y-auto"
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <Scale className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-navy leading-tight tracking-tight">Nirikshan</p>
            <p className="text-[10px] text-navy/50 font-medium leading-tight mt-0.5">Legal Metrology</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-brand-border flex-shrink-0" />

      {/* Navigation (7 items) */}
      <nav className="flex-1 px-3 py-3" onClick={onNavigate}>
        <ul className="space-y-1" role="list">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>

      {/* Legal notice footer */}
      <div className="flex-shrink-0 px-4 pb-5 pt-2 border-t border-brand-border/60">
        <p className="text-[10px] text-navy/35 leading-relaxed">
          Legal Metrology Act &amp;{' '}
          (Packaged Commodities) Rules, 2011
        </p>
      </div>
    </aside>
  )
}
