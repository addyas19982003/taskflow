import { useState } from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom'; 


interface Project {
  id: string
  name: string
  color: string
}

interface SidebarProps {
  projects: Project[]
  isOpen: boolean
  onRenameProject: (id: string, name: string, color: string) => Promise<void>
  onDeleteProject: (id: string) => Promise<void>
}

export default function Sidebar({ projects, isOpen, onRenameProject, onDeleteProject }: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditName(project.name);
    setEditColor(project.color);
  };

  const handleRename = async () => {
    if (editingId && editName.trim()) {
      await onRenameProject(editingId, editName.trim(), editColor);
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce projet ? Toutes les tâches associées seront perdues.')) {
      await onDeleteProject(id);
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
{projects.map(p => (
  <li key={p.id} className={styles.item}>
    <span className={styles.dot} style={{ background: p.color }} />
    <NavLink 
      to={`/projects/${p.id}`} 
      className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
    >
      {p.name}
    </NavLink>
    <div className={styles.actions}>
      <button onClick={() => handleEdit(p)} className={styles.editBtn} title="Renommer">✏️</button>
      <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn} title="Supprimer">🗑️</button>
    </div>
  </li>
))}
      </ul>
    </aside>
  )
}
