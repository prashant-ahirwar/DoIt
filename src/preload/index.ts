import { contextBridge, ipcRenderer } from 'electron'
import { Task } from '../renderer/features/tasks/taskTypes'


// Secure, typed IPC surface exposed to the renderer
contextBridge.exposeInMainWorld('taskAPI', {
    getTasks: (): Promise<Task[]> =>
        ipcRenderer.invoke('tasks:getAll'),

    saveTasks: (tasks: Task[]): Promise<{ success: boolean }> =>
        ipcRenderer.invoke('tasks:save', tasks),

    getTheme: (): Promise<'light' | 'dark'> =>
        ipcRenderer.invoke('theme:get'),

    setTheme: (theme: 'light' | 'dark'): Promise<{ success: boolean }> =>
        ipcRenderer.invoke('theme:set', theme),
})
