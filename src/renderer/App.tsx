import { useEffect } from 'react'
import { useTaskStore } from './features/tasks/taskSlice'
import Home from './pages/Home'

export default function App() {
    const { theme, loadTasks } = useTaskStore()

    
    useEffect(() => {
        loadTasks()
    }, [loadTasks])

    
    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [theme])

    return <Home />
}
