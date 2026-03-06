
export function formatDate(isoDate?: string): string {
    if (!isoDate) return ''
    const d = new Date(isoDate)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}


export function isOverdue(isoDate?: string): boolean {
    if (!isoDate) return false
    return new Date(isoDate) < new Date()
}
