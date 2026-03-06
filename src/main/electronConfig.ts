import { app, BrowserWindow, ipcMain, shell, Menu } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import Store from 'electron-store'
import { Task } from '../renderer/features/tasks/taskTypes'

const __dirname = path.dirname(fileURLToPath(import.meta.url))



interface StoreSchema {
    version: number
    tasks: Task[]
    theme: 'light' | 'dark'
}

const store = new Store<StoreSchema>({
    defaults: {
        version: 1,
        tasks: [],
        theme: 'light',
    },
})



let mainWindow: BrowserWindow | null = null

const isDev = !app.isPackaged

// Set ELECTRON_OPEN_DEVTOOLS=true to open DevTools automatically in dev.
const shouldAutoOpenDevTools =
    isDev && process.env.ELECTRON_OPEN_DEVTOOLS === 'true'

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 720,
        minWidth: 780,
        minHeight: 520,
        frame: true,
        titleBarStyle: 'default',
        backgroundColor: '#16302B',
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
        title: 'DoIt'
    })

    
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173')
        if (shouldAutoOpenDevTools) {
            mainWindow.webContents.openDevTools({ mode: 'detach' })
        }
    } else {
        mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'))
    }

    
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return { action: 'deny' }
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // On Windows/Linux, close should quit the app (and end the Electron process).
    mainWindow.on('close', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}



ipcMain.handle('tasks:getAll', () => {
    return store.get('tasks', [])
})

ipcMain.handle('tasks:save', (_event, tasks: Task[]) => {
    store.set('tasks', tasks)
    return { success: true }
})

ipcMain.handle('theme:get', () => {
    return store.get('theme', 'light')
})

ipcMain.handle('theme:set', (_event, theme: 'light' | 'dark') => {
    store.set('theme', theme)
    return { success: true }
})



app.whenReady().then(() => {
    Menu.setApplicationMenu(null)   
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


app.on('web-contents-created', (_event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
        if (isDev && parsedUrl.hostname === 'localhost') return
        event.preventDefault()
    })
})
