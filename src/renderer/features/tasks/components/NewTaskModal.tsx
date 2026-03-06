import { useState } from 'react'
import { useTaskStore } from '../taskSlice'
import { Priority } from '../taskTypes'

interface NewTaskModalProps {
    onClose: () => void
}



const PRIORITIES: { value: Priority; label: string; cls: string; activeCls: string }[] = [
    { value: 'high', label: 'High', cls: 'border-highlight/30 text-primary/50 dark:text-surface/50 hover:border-red-400 hover:text-red-400', activeCls: 'border-red-500 bg-red-500 text-white' },
    { value: 'medium', label: 'Medium', cls: 'border-highlight/30 text-primary/50 dark:text-surface/50 hover:border-amber-400 hover:text-amber-400', activeCls: 'border-amber-500 bg-amber-500 text-white' },
    { value: 'low', label: 'Low', cls: 'border-highlight/30 text-primary/50 dark:text-surface/50 hover:border-secondary hover:text-secondary', activeCls: 'border-secondary bg-secondary text-white' },
]



export default function NewTaskModal({ onClose }: NewTaskModalProps) {
    const { addTask } = useTaskStore()

    const [text, setText] = useState('')
    const [priority, setPriority] = useState<Priority>('medium')
    const [dueDate, setDueDate] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) {
            setError('Task text cannot be empty.')
            return
        }
        await addTask(text, priority, dueDate || undefined)
        onClose()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
    }

    return (
        
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 backdrop-blur-sm animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="New Task"
        >
            {/* Modal */}
            <div className="bg-white dark:bg-primary w-full max-w-md rounded-2xl shadow-modal p-6 space-y-5 animate-scale-in">

                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-primary dark:text-surface tracking-wide">
                        + New Task
                    </h3>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-primary/40 hover:text-accent dark:text-surface/40 dark:hover:text-surface
                       transition-colors text-xl leading-none p-1"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Task text */}
                    <div>
                        <label htmlFor="task-text" className="block text-xs font-semibold text-primary/60 dark:text-surface/60 mb-1.5 uppercase tracking-wider">
                            Task
                        </label>
                        <input
                            id="task-text"
                            type="text"
                            autoFocus
                            value={text}
                            onChange={(e) => { setText(e.target.value); setError('') }}
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-2.5 rounded-xl border border-highlight/40 bg-surface/30 dark:bg-primary/40
                         text-primary dark:text-surface placeholder:text-primary/30 dark:placeholder:text-surface/30
                         text-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight transition"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    {/* Priority */}
                    <div>
                        <span className="block text-xs font-semibold text-primary/60 dark:text-surface/60 mb-1.5 uppercase tracking-wider">
                            Priority
                        </span>
                        <div className="flex gap-2">
                            {PRIORITIES.map(({ value, label, cls, activeCls }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setPriority(value)}
                                    aria-pressed={priority === value}
                                    className={`flex-1 py-2 rounded-xl border-2 text-xs font-bold tracking-wide transition-all duration-150
                              ${priority === value
                                            ? activeCls
                                            : cls
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Due date */}
                    <div>
                        <label htmlFor="task-due" className="block text-xs font-semibold text-primary/60 dark:text-surface/60 mb-1.5 uppercase tracking-wider">
                            Due Date <span className="text-primary/30 dark:text-surface/30 normal-case font-normal">(optional)</span>
                        </label>
                        <input
                            id="task-due"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-highlight/40 bg-surface/30 dark:bg-primary/40
                         text-primary dark:text-surface text-sm focus:outline-none focus:ring-2 focus:ring-highlight
                         focus:border-highlight transition"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-highlight/40 text-sm font-semibold
                         text-primary/60 dark:text-surface/60 hover:bg-surface/50 transition-all duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id="submit-task-btn"
                            className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent/80 text-white text-sm font-bold
                         shadow-md transition-all duration-150 hover:scale-[1.02] active:scale-95"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
