import {
  House,
  ScanLine,
  FileText,
  ShieldCheck,
  LayoutGrid,
  History,
  CircleHelp,
} from 'lucide-react'

/**
 * Navigation items – single source of truth for Nirikshan.
 * 7 primary inspection and help items:
 * 1. Home
 * 2. Scan Label
 * 3. Extracted Information
 * 4. Compliance Check
 * 5. Compliance Report
 * 6. History & Records
 * 7. Help & Guide
 */
export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: House,
    path: '/',
    exact: true,
  },
  {
    id: 'scan',
    label: 'Scan Label',
    icon: ScanLine,
    path: '/scan',
  },
  {
    id: 'extracted',
    label: 'Extracted Information',
    icon: FileText,
    path: '/extracted',
  },
  {
    id: 'compliance-check',
    label: 'Compliance Check',
    icon: ShieldCheck,
    path: '/compliance-check',
  },
  {
    id: 'compliance-report',
    label: 'Compliance Report',
    icon: LayoutGrid,
    path: '/compliance-report',
  },
  {
    id: 'history',
    label: 'History & Records',
    icon: History,
    path: '/history',
  },
  {
    id: 'help',
    label: 'Help & Guide',
    icon: CircleHelp,
    path: '/help',
  },
]
