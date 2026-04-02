type ProjectItem = {
    title: string
    sub: string
    desc: string
    tags: string[]
    status: string
    statusText: string
    url: string
}

export const projects: ProjectItem[] = [
    {
        title: 'Ledgerly',
        sub: 'github.com/thrddqno/ledgerly-app',
        desc: 'Full-stack personal finance tracker. Spring Boot API with JWT auth, refresh token rotation via HttpOnly cookies, keyset pagination, Swagger UI, and a React frontend.',
        tags: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'JWT'],
        status: 'wip',
        statusText: 'wip - frontend in progress',
        url: 'https://github.com/thrddqno/ledgerly-app',
    },
    {
        title: 'Flutter Offline POS',
        sub: 'point-of-sale · offline-capable',
        desc: 'Offline-first point-of-sale system built in Flutter. Local SQLite storage, receipt generation, and inventory management — no internet required.',
        tags: ['Flutter', 'Dart', 'SQLite'],
        status: 'done',
        statusText: 'complete',
        url: 'https://github.com/thrddqno/basic_single-user_pos_flutter',
    },
]

type SectionPanelProps = {
    focusMode: 'inner' | 'outer'
    innerIdx: number
    onInnerSelect: (i: number) => void
    onEnterPanel: () => void
}

export default function Projects({
    focusMode,
    innerIdx,
    onInnerSelect,
    onEnterPanel,
}: SectionPanelProps) {
    const active = focusMode === 'inner'

    return (
        <div>
            {projects.map((p, i) => {
                const isFocused = active && innerIdx === i
                const isSelected = isFocused && !active && i === 0

                return (
                    <div
                        key={p.title}
                        className={`bg-base-100 border rounded-box px-4.5 py-3.5 mb-3 cursor-pointer ${
                            isFocused || (isSelected && !active)
                                ? 'border-accent'
                                : 'border-base-300'
                        }`}
                        onClick={() => {
                            onInnerSelect?.(i)
                            onEnterPanel?.()
                        }}
                    >
                        <div className={'flex flex-row gap-2 items-center'}>
                            {isFocused && (
                                <span className="text-accent text-sm mr-1">
                                    ▶{' '}
                                </span>
                            )}
                            <div className="text-accent font-bold text-md mb-0.5">
                                {p.title}
                            </div>
                        </div>
                        <div className="text-primary text-xs mb-2">{p.sub}</div>
                        <div className="text-base-content/80 text-sm mb-2.5">
                            {p.desc}
                        </div>

                        <div className="flex flex-wrap gap-1.25 mb-2">
                            {p.tags.map((t) => (
                                <span
                                    key={t}
                                    className={`bg-accent/40 px-2 py-px rounded-selector text-accent text-xs`}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="text-sm flex items-center gap-1.5">
                            <span
                                className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${p.status == 'wip' ? 'bg-warning' : 'bg-success'}`}
                            />
                            <span
                                className={` ${p.status == 'wip' ? 'text-warning' : 'text-success'}`}
                            >
                                {p.statusText}
                            </span>
                            {p.url && p.url !== '#' && (
                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    ↗ view
                                </a>
                            )}
                        </div>
                    </div>
                )
            })}

            {!active && (
                <p className="mt-3.5 text-secondary text-xs">
                    press{' '}
                    <kbd
                        className={
                            'bg-base-100 border border-base-300 py-px px-1.25'
                        }
                    >
                        Enter
                    </kbd>{' '}
                    or{' '}
                    <kbd
                        className={
                            'bg-base-100 border border-base-300 py-px px-1.25'
                        }
                    >
                        l
                    </kbd>{' '}
                    to navigate cards
                </p>
            )}
        </div>
    )
}
