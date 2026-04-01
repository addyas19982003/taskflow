import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useAuth } from './features/auth/AuthContext'
import { Routes, Route } from "react-router-dom"
import LoginBS from './features/auth/LoginBS.tsx'
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import ProjectDetail from "./pages/ProjectDetail"

interface Project {
  id: string
  name: string
  color: string
}





export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginBS />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}
