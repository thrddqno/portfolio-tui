import { skills } from './sections/Skills.tsx'

export function MobileSkills() {
    return (
        <div className="space-y-5">
            {skills.map((group) => (
                <div key={group.group}>
                    <p className="text-warning text-xs tracking-widest mb-2">
                        {group.group}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                            <span
                                key={item.name}
                                className={`text-xs px-2.5 py-1 rounded border ${
                                    item.hot
                                        ? 'border-accent text-accent'
                                        : 'border-base-300 text-base-content'
                                }`}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
