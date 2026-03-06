import { ClipboardIcon } from './icons'

interface EmptyStateProps {
    message?: string
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <div
            role="status"
            aria-label="No tasks"
            className="flex flex-col items-center justify-center py-24 gap-6 animate-fade-in"
        >
            <div className="w-20 h-20 rounded-full bg-surface dark:bg-primary/40 flex items-center justify-center
                      shadow-inner text-highlight">
                <ClipboardIcon />
            </div>

            <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-primary/70 dark:text-surface/70 tracking-wide">
                    {message ?? "You're all caught up!"}
                </p>
                <p className="text-sm text-primary/40 dark:text-surface/40">
                    Add a task to get started.
                </p>
            </div>
        </div>
    )
}
