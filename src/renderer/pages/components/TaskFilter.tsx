import { useTaskStore } from '../../features/tasks/taskSlice'
import { useDebouncedSearch } from '../../shared/hooks/useDebouncedSearch'
import { SearchIcon } from '../../shared/components/icons'



export default function TaskFilter() {
    const { searchQuery, setSearchQuery } = useTaskStore()
    
    useDebouncedSearch(searchQuery, 200)

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 dark:text-surface/40 pointer-events-none">
                    <SearchIcon />
                </span>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search tasks"
                    className="pl-9 pr-4 py-2 w-52 rounded-xl border border-highlight/40 bg-white/80 dark:bg-primary/50
                     text-primary dark:text-surface placeholder:text-primary/40 dark:placeholder:text-surface/40
                     text-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight
                     transition-all duration-150"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-accent
                       dark:text-surface/40 dark:hover:text-surface transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    )
}

