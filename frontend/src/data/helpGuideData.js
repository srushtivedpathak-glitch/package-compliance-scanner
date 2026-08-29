/**
 * helpGuideData.js
 *
 * Structured content for the Nirikshan Legal Metrology Help & Guide page.
 * Organized into Quick Help topics and 6 detailed Step-by-Step guides.
 */

import {
  ScanLine,
  FileText,
  ShieldCheck,
  LayoutGrid,
} from 'lucide-react'

export const QUICK_HELP_TOPICS = [
  {
    id: 'scanning-uploading',
    guideId: 'guide-02',
    title: 'Scanning & Uploading',
    description: 'Learn how to scan or upload clear product label images for inspection.',
    icon: ScanLine,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-primary',
    borderHover: 'hover:border-teal-primary/40',
  },
  {
    id: 'extracted-information',
    guideId: 'guide-03',
    title: 'Extracted Information',
    description: 'Understand how information extracted from product labels can be reviewed and corrected.',
    icon: FileText,
    iconBg: 'bg-blue-50',
    iconColor: 'text-brand-info',
    borderHover: 'hover:border-blue-400/40',
  },
  {
    id: 'compliance-check',
    guideId: 'guide-04',
    title: 'Compliance Check',
    description: 'Understand how extracted declarations are evaluated against applicable compliance rules.',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-brand-success',
    borderHover: 'hover:border-emerald-400/40',
  },
  {
    id: 'reports-records',
    guideId: 'guide-05',
    title: 'Reports & Records',
    description: 'Learn how to review compliance reports and access previous inspection records.',
    icon: LayoutGrid,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderHover: 'hover:border-purple-400/40',
  },
]

export const HELP_GUIDES = [
  {
    id: 'guide-01',
    number: '01',
    title: 'How to start a new inspection',
    steps: [
      'Open the Nirikshan Home dashboard.',
      'Select "Start a New Scan" or navigate to "Scan Label" in the sidebar.',
      'Prepare clear, well-lit photos of the packaged commodity label.',
      'Continue to the Scan Label workflow.',
      'Upload the primary product label image(s).',
      'Select "Scan Label" to begin automated processing.',
    ],
    tip: 'Capture the complete label whenever possible so all mandatory declarations (such as MRP, net quantity, and manufacturer address) can be detected accurately.',
    actionButton: {
      label: 'Start a new scan →',
      path: '/scan',
    },
  },
  {
    id: 'guide-02',
    number: '02',
    title: 'Scanning a product label',
    steps: [
      'Open the "Scan Label" page from the navigation sidebar.',
      'Upload or drag and drop a product label image (PNG, JPG, or JPEG supported).',
      'Ensure all text and numerals on the packaging are in sharp focus.',
      'Avoid high-glare reflections, blur, shadows, and extreme viewing angles.',
      'Upload additional package angles if declarations span multiple panels.',
      'Click "Scan Label" and wait a few seconds while OCR and text detection process the image.',
    ],
    checklist: [
      'Keep label text sharp and in focus',
      'Capture the complete principal display panel',
      'Avoid harsh glare and uneven shadows',
      'Use a high-resolution, uncompressed image',
    ],
    note: 'Automated OCR extraction assists the inspection process but does not replace official verification by an authorized Legal Metrology Officer.',
  },
  {
    id: 'guide-03',
    number: '03',
    title: 'Reviewing extracted information',
    overview:
      'After scanning, Nirikshan extracts key statutory declarations from the product label, such as Product Name, Net Quantity, MRP, Date of Manufacture/Packing, Manufacturer particulars, and Customer Care details.',
    steps: [
      'Review each extracted declaration card on the Extracted Information page.',
      'Check confidence indicators (High, Medium, Low) to identify fields needing attention.',
      'Use the "View Original Image" modal to visually verify uncertain fields against the uploaded package.',
      'Click the pencil icon on any card to make inline corrections if OCR misread text.',
      'Select "Proceed to Compliance Check" once all declarations are reviewed.',
    ],
    importantNotice:
      'Extraction confidence represents OCR text certainty and does not itself determine whether a product complies with statutory rules.',
  },
  {
    id: 'guide-04',
    number: '04',
    title: 'Running a compliance check',
    overview:
      'The Compliance Check page evaluates extracted label information against the Legal Metrology Act, 2011 and the Legal Metrology (Packaged Commodities) Rules, 2011.',
    statuses: [
      {
        name: 'Compliant',
        color: 'text-brand-success bg-emerald-50 border-emerald-200',
        desc: 'The automated check found the statutory requirement fully satisfied.',
      },
      {
        name: 'Requires Review',
        color: 'text-brand-warning bg-amber-50 border-amber-200',
        desc: 'The result requires officer visual verification or additional physical evidence.',
      },
      {
        name: 'Non-Compliant',
        color: 'text-brand-danger bg-red-50 border-red-200',
        desc: 'The compliance engine detected a statutory violation or missing mandatory declaration.',
      },
      {
        name: 'Not Applicable',
        color: 'text-brand-info bg-blue-50 border-blue-200',
        desc: 'The requirement was determined not to apply to the current commodity type.',
      },
      {
        name: 'Not Detected',
        color: 'text-navy/60 bg-gray-50 border-gray-200',
        desc: 'The system could not reliably detect the information required for rule evaluation.',
      },
    ],
    importantNotice:
      'OCR uncertainty or missing label text should not automatically be treated as legal non-compliance without official officer inspection.',
  },
  {
    id: 'guide-05',
    number: '05',
    title: 'Generating and exporting a report',
    overview:
      'The Compliance Report page synthesizes the overall inspection result, compliance score (/100), findings checklist, and recommended action steps.',
    steps: [
      'Review the overall compliance score and status banner at the top.',
      'Examine the Findings list to inspect specific declarations and legal rule references.',
      'Click any finding row to open the detailed drawer containing remarks and evidence.',
      'Review the Recommended Actions checklist for officer follow-up tasks.',
      'Use the "Export report" dropdown to generate a PDF or editable document.',
      'Select "Scan another label" when ready to begin your next inspection.',
    ],
  },
  {
    id: 'guide-06',
    number: '06',
    title: 'Viewing your inspection history',
    overview:
      'The History & Records page maintains an organized database log of all previously completed commodity label inspections.',
    columnsInfo: [
      {
        title: 'Product Details',
        desc: 'Displays the product name and a dynamically inferred category icon.',
      },
      {
        title: 'Score',
        desc: 'Shows the calculated compliance score (/100) with color-coded status rings.',
      },
      {
        title: 'Actions',
        desc: 'Provides one-click options to view the saved report or download PDF summaries.',
      },
    ],
    steps: [
      'Navigate to "History & Records" from the sidebar.',
      'Search for any past inspection by typing the product name into the search bar.',
      'Review inspection scores and pagination records.',
      'Click the Eye icon to open the full compliance report.',
      'Click the Download icon to export the archived report.',
    ],
  },
]

