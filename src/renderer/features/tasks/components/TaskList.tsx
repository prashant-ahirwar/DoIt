import { useState } from 'react'
import { useTaskStore } from '../taskSlice'
import { Task } from '../taskTypes'
import TaskItem from './TaskItem'
import EmptyState from '../../../shared/components/EmptyState'



const PRIORITY_FILTERS = ['all', 'high', 'medium', 'low'] as const
type PriorityFilter = typeof PRIORITY_FILTERS[number]



export default function TaskList() {
    const { getFilteredTasks, loading } = useTaskStore()
    const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="w-8 h-8 border-4 border-highlight border-t-accent rounded-full animate-spin" />
            </div>
        )
    }

    // Base tasks list after status/search filtering from the store
    let tasks = getFilteredTasks()

    
    if (priorityFilter !== 'all') {
        tasks = tasks.filter((t: Task) => t.priority === priorityFilter)
    }

    const CHIP_BASE = 'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150'
    const CHIP_ACTIVE: Record<PriorityFilter, string> = {
        all: 'bg-accent text-white border-accent',
        high: 'bg-red-600 text-white border-red-600',
        medium: 'bg-amber-500 text-white border-amber-500',
        low: 'bg-secondary text-white border-secondary',
    }
    const CHIP_INACTIVE = 'bg-transparent border-highlight/40 text-primary/60 dark:text-surface/60 hover:border-highlight hover:text-primary dark:hover:text-surface'

    return (
        <div className="space-y-3">
            {/* Priority filter chips */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs font-semibold text-primary/50 dark:text-surface/50 uppercase tracking-wider mr-1">
                    Priority:
                </span>
                {PRIORITY_FILTERS.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPriorityFilter(p)}
                        aria-pressed={priorityFilter === p}
                        className={`${CHIP_BASE} ${priorityFilter === p ? CHIP_ACTIVE[p] : CHIP_INACTIVE}`}
                    >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                ))}
            </div>

            {/* Task list */}
            {tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <ul className="space-y-2" role="list" aria-label="Task list">
                    {tasks.map((task: Task) => (
                        <li key={task.id} role="listitem">
                            <TaskItem task={task} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
