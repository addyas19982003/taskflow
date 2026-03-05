import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useAuth } from './features/auth/AuthContext'
import Login from './features/auth/Login'
import db from '../db.json'

interface Project {
  id: string
  name: string
  color: string
}

interface Task {
  id: string
  name: string
  projectId: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { state: authState, dispatch } = useAuth()
  const projects: Project[] = db.projects
  const columns: Column[] = db.columns

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header 
        title="TaskFlow" 
        onMenuClick={() => setSidebarOpen(p => !p)} 
        userName={authState.user?.name}
        onLogout={handleLogout}
      />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />
<MainContent columns={columns} projects={projects} />
      </div>
    </div>
  )
}

export default function App() {
  const { state: authState } = useAuth()

  if (!authState.user) {
    return <Login />
  }

  return <Dashboard />
}
