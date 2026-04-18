import { contact } from './sections/Contacts.tsx'

export function MobileContact() {
    return (
        <div className="space-y-1">
            {contact.map((c) => (
                <div
                    key={c.label}
                    className="flex items-center gap-3.5 py-3 border-b border-base-300"
                >
                    <span className="text-accent w-6 text-center text-sm">
                        {c.icon}
                    </span>
                    <span className="text-secondary w-20 text-sm shrink-0">
                        {c.label}
                    </span>
                    <span className="text-base-content text-sm">
                        {c.url ? (
                            <a
                                href={c.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent hover:underline"
                            >
                                {c.value}
                            </a>
                        ) : c.label === 'email' ? (
                            <a
                                href={`mailto:${c.value}`}
                                className="text-accent hover:underline"
                            >
                                {c.value}
                            </a>
                        ) : (
                            c.value
                        )}
                    </span>
                </div>
            ))}
            <p className="mt-5 text-secondary text-sm leading-loose">
                Available for full-time Java / Software Engineer roles.
                <br />
                Response time: usually within 24h.
            </p>
        </div>
    )
}
