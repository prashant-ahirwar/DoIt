import { Task } from './taskTypes'


export async function fetchTasks(): Promise<Task[]> {
    if (typeof window !== 'undefined' && window.taskAPI) {
        return window.taskAPI.getTasks()
    }
    return []
}


export async function persistTasks(tasks: Task[]): Promise<void> {
    if (typeof window !== 'undefined' && window.taskAPI) {
        await window.taskAPI.saveTasks(tasks)
    }
}


export async function fetchTheme(): Promise<'light' | 'dark'> {
    if (typeof window !== 'undefined' && window.taskAPI) {
        return window.taskAPI.getTheme()
    }
    return 'light'
}


export async function persistTheme(theme: 'light' | 'dark'): Promise<void> {
    if (typeof window !== 'undefined' && window.taskAPI) {
        await window.taskAPI.setTheme(theme)
    }
}
