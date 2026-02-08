import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import Home from "@/pages/Home"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import Dashboard from "@/pages/dashboard/Dashboard"
import DiaryEntry from "@/pages/diary/DiaryEntry"
import MoodGraph from "@/pages/analytics/MoodGraph"
import TagCloud from "@/pages/analytics/TagCloud"
import PreferenceGraph from "@/pages/analytics/PreferenceGraph"
import PersonalitySummary from "@/pages/analytics/PersonalitySummary"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-entry" element={<DiaryEntry />} />
            <Route path="/memu" element={<PersonalitySummary />} />
            
            {/* Legacy/Detailed Routes */}
            <Route path="/diary/new" element={<DiaryEntry />} />
            <Route path="/diary/:id" element={<DiaryEntry />} />
            <Route path="/analytics/mood" element={<MoodGraph />} />
            <Route path="/analytics/tags" element={<TagCloud />} />
            <Route path="/analytics/preferences" element={<PreferenceGraph />} />
            <Route path="/analytics/personality" element={<PersonalitySummary />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
