type ContactType = {
    icon: string
    label: string
    value: string
    url: string | null
    download?: boolean
}

export const contact: ContactType[] = [
    {
        icon: '@',
        label: 'email',
        value: 'antonio.dioquino@hotmail.com',
        url: null,
    },
    {
        icon: 'in',
        label: 'linkedin',
        value: 'linkedin.com/in/thrddqno',
        url: 'https://linkedin.com/in/thrddqno',
    },
    {
        icon: '↓',
        label: 'resume',
        value: 'Download Resume',
        url: '../../public/resume.pdf',
        download: true,
    },
    {
        icon: '{}',
        label: 'github',
        value: 'github.com/thrddqno',
        url: 'https://github.com/thrddqno',
    },
    {
        icon: '⚑',
        label: 'location',
        value: 'Philippines · open to remote',
        url: null,
    },
]

type SectionPanelProps = {
    focusMode: 'inner' | 'outer'
    innerIdx: number
    onInnerSelect: (i: number) => void
    onEnterPanel: () => void
}

export default function Contact({
    focusMode,
    innerIdx,
    onInnerSelect,
    onEnterPanel,
}: SectionPanelProps) {
    const active = focusMode === 'inner'

    return (
        <div>
            {contact.map((c, i) => {
                const isFocused = active && innerIdx === i

                return (
                    <div
                        key={c.label}
                        className={`flex items-center gap-3.5 py-2.5 border-b border-base-300 ${isFocused ? ' focused' : ''}`}
                        onClick={() => {
                            onInnerSelect?.(i)
                            onEnterPanel?.()
                        }}
                    >
                        <div className={'w-1.25'}>
                            {isFocused && (
                                <span className="text-accent text-sm mr-1">
                                    ▶
                                </span>
                            )}
                        </div>

                        <span className="text-accent w-10 text-center">
                            {c.icon}
                        </span>
                        <span className="text-primary w-20 text-sm">
                            {c.label}
                        </span>
                        <span className="text-base-content">
                            {c.url ? (
                                c.download ? (
                                    <a
                                        href={c.url}
                                        download
                                        className="text-accent hover:underline"
                                    >
                                        {c.value}
                                    </a>
                                ) : (
                                    <a
                                        href={c.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-accent hover:underline"
                                    >
                                        {c.value}
                                    </a>
                                )
                            ) : (
                                c.value
                            )}
                        </span>
                        {isFocused && c.url && <span>↗</span>}
                    </div>
                )
            })}

            <p className="mt-5 text-secondary text-sm">
                Available for full-time Java / Software Engineer roles.
                <br />
                Response time: usually within 24h.
            </p>

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
