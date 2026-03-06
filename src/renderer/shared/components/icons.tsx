
interface IconProps {
    className?: string
    size?: string   
}

function Icon({ name, className = '', size }: { name: string; className?: string; size?: string }) {
    return (
        <i
            className={`lni lni-${name} lni--duotone ${className}`}
            style={size ? { fontSize: size } : undefined}
            aria-hidden="true"
        />
    )
}



export const ClipboardIcon = (p: IconProps) =>
    <Icon name="clipboard" size={p.size ?? '36px'} className={p.className} />

export const EditIcon = (p: IconProps) =>
    <Icon name="pen-to-square" size={p.size ?? '14px'} className={p.className} />

export const TrashIcon = (p: IconProps) =>
    <Icon name="trash-3" size={p.size ?? '14px'} className={p.className} />

export const CalendarIcon = (p: IconProps) =>
    <Icon name="calendar-days" size={p.size ?? '12px'} className={p.className} />

export const SearchIcon = (p: IconProps) =>
    <Icon name="search-1" size={p.size ?? '14px'} className={p.className} />

export const ListIcon = (p: IconProps) =>
    <Icon name="menu-hamburger-1" size={p.size ?? '18px'} className={p.className} />

export const ClockIcon = (p: IconProps) =>
    <Icon name="hourglass" size={p.size ?? '18px'} className={p.className} />

export const CheckCircleIcon = (p: IconProps) =>
    <Icon name="check-circle-1" size={p.size ?? '18px'} className={p.className} />

export const SunIcon = (p: IconProps) =>
    <Icon name="sun-1" size={p.size ?? '18px'} className={p.className} />

export const MoonIcon = (p: IconProps) =>
    <Icon name="moon-half-right-5" size={p.size ?? '18px'} className={p.className} />
