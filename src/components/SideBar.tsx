import { SECTIONS, NAV_ICONS } from '../data/sections.ts'

export default function Sidebar({ sectionIdx, onSelect }) {
    return (
        <div
            className={`w-55 flex shrink-0 flex-col border-r border-base-300 bg-base-100`}
        >
            <div className="p-2.5 text-primary text text-sm border-b border-base-300 tracking-wider">
                SECTIONS
            </div>
            <nav className="flex flex-col overflow-y-auto py-1">
                {SECTIONS.map((s, i) => (
                    <button
                        key={s}
                        className={`py-1.75 px-3.5 cursor-pointer flex items-center gap-4 ${sectionIdx === i ? 'bg-accent/20 text-accent' : 'text-primary hover:bg-base-200'}`}
                        onClick={() => onSelect(i)}
                    >
                        <span
                            className={`w-4 ${sectionIdx === i ? 'text-accent' : 'text-secondary'}`}
                        >
                            {NAV_ICONS[s]}
                        </span>
                        {s}
                    </button>
                ))}
            </nav>
        </div>
    )
}
