import { create } from 'zustand'
import { Task, FilterType, Theme, Priority } from './taskTypes'
import { fetchTasks, persistTasks, fetchTheme, persistTheme } from './taskAPI'
import { v4 as uuid } from './uuid'



interface TaskState {
    tasks: Task[]
    filter: FilterType
    searchQuery: string
    theme: Theme
    loading: boolean

    // Lifecycle
    loadTasks: () => Promise<void>

    // CRUD
    addTask: (text: string, priority: Priority, dueDate?: string) => Promise<void>
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    toggleTask: (id: string) => Promise<void>

    // UI state
    setFilter: (filter: FilterType) => void
    setSearchQuery: (query: string) => void
    setTheme: (theme: Theme) => Promise<void>

    // Selectors
    getFilteredTasks: () => Task[]
}



export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    filter: 'all',
    searchQuery: '',
    theme: 'light',
    loading: true,

    

    loadTasks: async () => {
        set({ loading: true })
        const [tasks, theme] = await Promise.all([fetchTasks(), fetchTheme()])
        // Keep a stable order on load (supports legacy persisted `order` but doesn't require it)
        const sorted = [...tasks].sort((a, b) => {
            const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY
            const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY
            if (ao !== bo) return ao - bo
            return a.createdAt.localeCompare(b.createdAt)
        })
        set({ tasks: sorted, theme, loading: false })
    },

    

    addTask: async (text, priority, dueDate) => {
        const { tasks } = get()
        const newTask: Task = {
            id: uuid(),
            text: text.trim(),
            completed: false,
            priority,
            dueDate,
            createdAt: new Date().toISOString(),
            // `order` kept for backward compatibility with existing persisted data
            order: tasks.length,
        }
        const updated = [...tasks, newTask]
        set({ tasks: updated })
        await persistTasks(updated)
    },

    

    updateTask: async (id, updates) => {
        const { tasks } = get()
        const updated = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
        set({ tasks: updated })
        await persistTasks(updated)
    },

    

    deleteTask: async (id) => {
        const { tasks } = get()
        const updated = tasks.filter((t) => t.id !== id)
        set({ tasks: updated })
        await persistTasks(updated)
    },

    

    toggleTask: async (id) => {
        const { tasks } = get()
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
        )
        set({ tasks: updated })
        await persistTasks(updated)
    },

    

    setFilter: (filter) => set({ filter }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),

    

    setTheme: async (theme) => {
        set({ theme })
        await persistTheme(theme)
    },

    

    getFilteredTasks: () => {
        const { tasks, filter, searchQuery } = get()
        let result = [...tasks]

        if (filter === 'pending') result = result.filter((t) => !t.completed)
        if (filter === 'completed') result = result.filter((t) => t.completed)

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            result = result.filter((t) => t.text.toLowerCase().includes(q))
        }

        // Default ordering: legacy `order` first, then createdAt
        return result.sort((a, b) => {
            const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY
            const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY
            if (ao !== bo) return ao - bo
            return a.createdAt.localeCompare(b.createdAt)
        })
    },
}))
