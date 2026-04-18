import { SECTIONS } from '../data/sections.ts'

type Props = {
    sectionIdx: number
    focusMode: 'inner' | 'outer'
}

export default function StatusBar({ sectionIdx, focusMode }: Props) {
    const mode = focusMode === 'inner' ? 'FOCUSED' : 'NORMAL'

    return (
        <div
            className={`bg-accent text-base-100 py-1 px-4 flex items-center justify-between text-sm shrink-0  ${focusMode === 'inner' ? ' inner-mode' : ''}`}
        >
            <div className="flex items-center gap-3.5">
                <span className="font-bold w-18">{mode}</span>
                <span>{SECTIONS[sectionIdx]}</span>
            </div>
            <div className="text-base-100/70">antonio · portfolio · 2026</div>
        </div>
    )
}
