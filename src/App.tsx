import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import db from '../db.json'

interface Project {
  id: string
  name: string
  color: string
}

interface Column {
  id: string
  title: string
  tasks: string[]
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const projects: Project[] = db.projects
  const columns: Column[] = db.columns

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header title="TaskFlow" onMenuClick={() => setSidebarOpen(p => !p)} />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />
        <MainContent columns={columns} />
      </div>
    </div>
  )
}
