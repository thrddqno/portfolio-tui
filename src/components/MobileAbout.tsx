import { about } from './sections/About.tsx'

export function MobileAbout() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {Object.entries(about).map(([key, val]) => (
                    <div key={key} className="flex gap-3 text-sm">
                        <span className="text-secondary w-28 shrink-0">
                            {key}
                        </span>
                        <span
                            className={
                                key === 'status' || key === 'location'
                                    ? 'text-success'
                                    : 'text-base-content'
                            }
                        >
                            {String(val)}
                        </span>
                    </div>
                ))}
            </div>
            <hr className="border-base-300" />
            <div className="flex flex-wrap gap-2">
                {about.interests.map((i: string) => (
                    <span
                        key={i}
                        className="bg-base-200 text-accent text-xs px-2 py-1 rounded"
                    >
                        {i}
                    </span>
                ))}
            </div>
            <hr className="border-base-300" />
            <p className="text-secondary text-sm leading-relaxed">
                Building <span className="text-success">Ledgerly</span> — a
                full-stack personal finance tracker — as primary portfolio
                project. Previously interned at{' '}
                <span className="text-base-content">SGV &amp; Co.</span> ·
            </p>
        </div>
    )
}
