import { projects } from './sections/Projects.tsx'

export function MobileProjects() {
    return (
        <div className="space-y-4">
            {projects.map((p) => (
                <div
                    key={p.title}
                    className="bg-base-200 border border-base-300 rounded p-4 space-y-2"
                >
                    <div className="flex items-start justify-between gap-2">
                        <p className="text-accent font-bold">{p.title}</p>
                        {p.url && p.url !== '#' && (
                            <a
                                href={p.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent text-xs shrink-0 hover:underline"
                            >
                                ↗ view
                            </a>
                        )}
                    </div>
                    <p className="text-secondary text-xs">{p.sub}</p>
                    <p className="text-base-content text-sm leading-relaxed">
                        {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                            <span
                                key={t}
                                className="bg-base-300 text-accent text-xs px-2 py-0.5 rounded"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                p.status === 'wip' ? 'bg-warning' : 'bg-success'
                            }`}
                        />
                        <span
                            className={
                                p.status === 'wip'
                                    ? 'text-warning'
                                    : 'text-success'
                            }
                        >
                            {p.statusText}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
