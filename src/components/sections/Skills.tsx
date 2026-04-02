type SkillItem = {
    name: string
    hot?: boolean
}

type SkillGroup = {
    group: string
    items: SkillItem[]
}

const skills: SkillGroup[] = [
    {
        group: 'LANGUAGES',
        items: [
            { name: 'Java', hot: true },
            { name: 'JavaScript', hot: true },
            { name: 'TypeScript', hot: true },
            { name: 'SQL' },
            { name: 'Bash' },
            { name: 'Dart' },
        ],
    },
    {
        group: 'BACKEND',
        items: [
            { name: 'Spring Boot 3', hot: true },
            { name: 'Spring Security', hot: true },
            { name: 'JWT + Refresh Tokens' },
            { name: 'REST APIs' },
            { name: 'Keyset Pagination' },
            { name: 'PostgreSQL', hot: true },
            { name: 'Swagger / OpenAPI' },
            { name: 'Docker' },
        ],
    },
    {
        group: 'FRONTEND',
        items: [
            { name: 'React', hot: true },
            { name: 'Zustand' },
            { name: 'React Query' },
            { name: 'Axios' },
            { name: 'Zod' },
            { name: 'React Hook Form' },
            { name: 'Flutter' },
        ],
    },
    {
        group: 'DEVOPS',
        items: [
            { name: 'Linux', hot: true },
            { name: 'Docker Compose' },
            { name: 'Docker/Podman' },
            { name: 'Git' },
        ],
    },
]

export default function Skills() {
    return (
        <div>
            {skills.map((group) => (
                <div key={group.group} className="mb-4.5">
                    <div className="text-info text-sm tracking-wider mb-2">
                        {group.group}
                    </div>
                    {group.items.map((item) => (
                        <span
                            key={item.name}
                            className={`inline-block py-0.5 px-2.5 border rounded-box my-0.5 mr-1.5 ${item.hot ? 'text-accent border-accent' : 'bg-base-100 border-base-300 text-secondary'}`}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}
