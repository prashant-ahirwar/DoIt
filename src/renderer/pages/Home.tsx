import { useState } from 'react'
import { useTaskStore } from '../features/tasks/taskSlice'
import { FilterType } from '../features/tasks/taskTypes'
import TaskFilter from './components/TaskFilter'
import TaskList from '../features/tasks/components/TaskList'
import NewTaskModal from '../features/tasks/components/NewTaskModal'
const doitLogo = './icon.png'
import {
    ListIcon,
    ClockIcon,
    CheckCircleIcon,
    SunIcon,
    MoonIcon,
} from '../shared/components/icons'



const NAV_ITEMS: { label: string; filter: FilterType; icon: React.ReactNode }[] = [
    { label: 'All Tasks', filter: 'all', icon: <ListIcon /> },
    { label: 'Pending', filter: 'pending', icon: <ClockIcon /> },
    { label: 'Completed', filter: 'completed', icon: <CheckCircleIcon /> },
]



export default function Home() {
    const { filter, setFilter, theme, setTheme, tasks } = useTaskStore()
    const [showNewModal, setShowNewModal] = useState(false)

    const pendingCount = tasks.filter((t) => !t.completed).length
    const completedCount = tasks.filter((t) => t.completed).length

    const filterLabel: Record<FilterType, string> = {
        all: 'All Tasks',
        pending: 'Pending',
        completed: 'Completed',
    }

    return (
        <div className="flex h-screen bg-surface dark:bg-primary overflow-hidden font-mono">

            {/* Sidebar */}
            <aside className="w-52 flex-shrink-0 bg-surface dark:bg-primary border-r border-highlight/30 flex flex-col">

                {/* App branding */}
                <div className="px-5 pt-8 pb-4 flex items-center justify-center gap-3">
                    <img
                        src={doitLogo}
                        alt="DoIt Logo"
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                        }}
                    />
                    <h1 className="text-3xl font-bold tracking-widest text-primary dark:text-surface uppercase mt-1">
                        DoIt
                    </h1>
                </div>

                {/* Primary action */}
                <div className="px-4 py-4">
                    <button
                        id="new-task-btn"
                        onClick={() => setShowNewModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                       bg-accent hover:bg-accent/80 text-white font-semibold text-sm
                       shadow-md transition-all duration-150 hover:scale-[1.02] active:scale-95
                       focus-visible:outline-2 focus-visible:outline-surface"
                    >
                        <span className="text-lg leading-none">+</span>
                        NEW TASK
                    </button>
                </div>

                {/* Filter navigation */}
                <nav className="flex-1 px-3 space-y-1" aria-label="Task filters">
                    {NAV_ITEMS.map(({ label, filter: f, icon }) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            aria-pressed={filter === f}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                          transition-all duration-150 text-left
                          ${filter === f
                                    ? 'bg-accent/20 text-accent dark:text-surface font-semibold'
                                    : 'text-primary/70 dark:text-surface/70 hover:bg-highlight/20 hover:text-primary dark:hover:text-surface'
                                }`}
                        >
                            <span>{icon}</span>
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                {/* Theme toggle */}
                <div className="px-3 pb-5 mt-auto">
                    <button
                        id="theme-toggle"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                       transition-all duration-150 text-left
                       text-primary/70 dark:text-surface/70 hover:bg-highlight/20 hover:text-primary dark:hover:text-surface`}
                    >
                        <span>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col bg-white dark:bg-primary/80 overflow-hidden">

                {/* Header */}
                <header className="px-8 pt-8 pb-4 border-b border-highlight/20">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-primary dark:text-surface tracking-tight">
                            {filterLabel[filter]}
                        </h2>
                        <TaskFilter />
                    </div>
                </header>

                {/* Task list */}
                <div className="flex-1 overflow-y-auto px-8 py-4">
                    <TaskList />
                </div>

                {/* Footer */}
                <footer className="px-8 py-3 border-t border-highlight/20 flex items-center justify-between
                           text-xs text-primary/50 dark:text-surface/50">
                    <span>{pendingCount} Pending / {completedCount} Completed</span>
                    <span>made with 💟 by PraShant A.</span>
                </footer>
            </main>

            {/* New task modal */}
            {showNewModal && <NewTaskModal onClose={() => setShowNewModal(false)} />}
        </div>
    )
}
