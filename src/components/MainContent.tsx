import styles from './MainContent.module.css'

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

interface Project {
  id: string
  name: string
  color: string
}

interface MainContentProps {
  columns: Column[]
  projects: Project[]
}

export default function MainContent({ columns, projects }: MainContentProps) {
  const getProjectColor = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    return project?.color || '#666'
  }

  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {columns.map(col => (
          <div key={col.id} className={styles.column}>
            <h3 className={styles.colTitle}>
              {col.title} ({col.tasks.length})
            </h3>

            {col.tasks.map((task) => (
              <div 
                key={task.id} 
                className={styles.card}
                style={{ borderLeftColor: getProjectColor(task.projectId) }}
              >
                {task.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
