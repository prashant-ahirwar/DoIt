import { Priority } from './taskTypes'

interface PriorityStyle {
    label: string
    badge: string     
    dot: string       
    border: string    
}


export function estimatePriorityColor(priority: Priority): PriorityStyle {
    switch (priority) {
        case 'high':
            return {
                label: 'HIGH',
                badge: 'bg-red-600 text-white',
                dot: 'bg-red-500',
                border: 'border-l-red-500',
            }
        case 'medium':
            return {
                label: 'MEDIUM',
                badge: 'bg-amber-500 text-white',
                dot: 'bg-amber-400',
                border: 'border-l-amber-400',
            }
        case 'low':
        default:
            return {
                label: 'LOW',
                badge: 'bg-secondary text-white',
                dot: 'bg-highlight',
                border: 'border-l-highlight',
            }
    }
}
