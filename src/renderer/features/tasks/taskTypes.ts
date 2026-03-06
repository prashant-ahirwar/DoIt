

export type Priority = 'low' | 'medium' | 'high'
export type FilterType = 'all' | 'pending' | 'completed'
export type Theme = 'light' | 'dark'

export interface Task {
    id: string
    text: string
    completed: boolean
    priority: Priority
    dueDate?: string
    createdAt: string
    order: number
}


declare global {
    interface Window {
        taskAPI: {
            getTasks: () => Promise<Task[]>
            saveTasks: (tasks: Task[]) => Promise<{ success: boolean }>
            getTheme: () => Promise<Theme>
            setTheme: (theme: Theme) => Promise<{ success: boolean }>
        }
    }
}
