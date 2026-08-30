import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import ExtractedInformationPage from './pages/ExtractedInformationPage'
import ComplianceCheckPage from './pages/ComplianceCheckPage'
import ComplianceReportPage from './pages/ComplianceReportPage'
import HistoryAndRecordsPage from './pages/HistoryAndRecordsPage'
import HelpAndGuidePage from './pages/HelpAndGuidePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="scan" element={<ScanPage />} />
        <Route path="upload" element={<ScanPage />} />
        <Route path="extracted" element={<ExtractedInformationPage />} />
        <Route path="extracted-information" element={<ExtractedInformationPage />} />
        <Route path="compliance-check" element={<ComplianceCheckPage />} />
        <Route path="compliance-report" element={<ComplianceReportPage />} />
        <Route path="history" element={<HistoryAndRecordsPage />} />
        <Route path="help" element={<HelpAndGuidePage />} />
      </Route>
    </Routes>
  )
}
