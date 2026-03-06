import { memo, useState } from 'react'
import { Task } from '../taskTypes'
import { useTaskStore } from '../taskSlice'
import { formatDate, isOverdue } from '../../../shared/utils/date'
import { estimatePriorityColor } from '../estimatePriorityColor'
import { EditIcon, TrashIcon, CalendarIcon } from '../../../shared/components/icons'
import TaskEditor from './TaskEditor'

interface TaskItemProps {
    task: Task
}



const TaskItem = memo(function TaskItem({
    task,
}: TaskItemProps) {
    const { toggleTask, deleteTask } = useTaskStore()
    const [editing, setEditing] = useState(false)
    const { label, badge, border } = estimatePriorityColor(task.priority)
    const overdue = isOverdue(task.dueDate) && !task.completed

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleTask(task.id)
        }
    }

    return (
        <>
            <div
                id={`task-${task.id}`}
                className={`
          group flex items-center gap-3 px-4 py-3 rounded-xl
          border-l-4 ${border}
          bg-white dark:bg-white/5
          dark:border dark:border-white/10 dark:border-l-4
          shadow-card hover:shadow-card-hover
          transition-all duration-150 cursor-default
          ${task.completed ? 'opacity-60' : ''}
          animate-slide-up
        `}
                aria-label={`Task: ${task.text}`}
            >
                {/* Complete toggle */}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    onKeyDown={handleKeyDown}
                    aria-label={task.completed ? `Mark "${task.text}" as pending` : `Complete "${task.text}"`}
                    className="w-4 h-4 flex-shrink-0 rounded cursor-pointer"
                />

                {/* Task text */}
                <span
                    className={`flex-1 text-sm font-medium leading-snug min-w-0 truncate
                      ${task.completed
                            ? 'line-through text-primary/40 dark:text-surface/40'
                            : 'text-primary dark:text-surface'
                        }`}
                >
                    {task.text}
                </span>

                {/* Due date */}
                {task.dueDate && (
                    <span className={`flex items-center gap-1 text-xs flex-shrink-0
                            ${overdue
                            ? 'text-red-500'
                            : 'text-primary/50 dark:text-surface/50'
                        }`}>
                        <CalendarIcon />
                        {formatDate(task.dueDate)}
                    </span>
                )}

                {/* Priority badge */}
                <span
                    className={`px-2 py-0.5 rounded text-xs font-bold tracking-wide flex-shrink-0 ${badge}`}
                    aria-label={`Priority: ${label}`}
                >
                    {label}
                </span>

                {/* Hover actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                        onClick={() => setEditing(true)}
                        aria-label={`Edit task: ${task.text}`}
                        className="p-1.5 rounded-lg hover:bg-highlight/20 text-primary/50 hover:text-accent
                       dark:text-surface/50 dark:hover:text-surface transition-all duration-100"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Delete task: ${task.text}`}
                        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-primary/50
                       hover:text-red-600 dark:text-surface/50 dark:hover:text-red-400 transition-all duration-100"
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>

            {/* Inline editor modal */}
            {editing && (
                <TaskEditor task={task} onClose={() => setEditing(false)} />
            )}
        </>
    )
})

export default TaskItem
