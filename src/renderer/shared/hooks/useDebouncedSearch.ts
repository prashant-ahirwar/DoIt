import { useEffect, useState } from 'react'


export function useDebouncedSearch(value: string, delay = 300): string {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(id)
    }, [value, delay])

    return debounced
}
