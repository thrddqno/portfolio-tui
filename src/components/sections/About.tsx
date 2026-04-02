import image from '../../assets/image.png'

type AboutData = {
    name: string
    tagline: string
    degree: string
    university: string
    location: string
    experience: string
    status: string
    interests: string[]
}

const about: AboutData = {
    name: 'Antonio Dioquino',
    tagline: 'Software Engineer · Java Developer · Backend Development',

    degree: 'Diploma in Computer Engineering Technology',
    university: 'Polytechnic University of the Philippines',
    location: 'Philippines 🇵🇭',
    experience: '3 yrs Java · 1 yr Spring Boot (including internships)',
    status: 'open to work ✓',
    interests: [
        'Java',
        'Spring Boot',
        'React',
        'Linux Ricing',
        'Self-hosting',
        'Homelab',
    ],
}

export default function About() {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <img className="rounded-full w-20 h-20" src={image} alt="" />
                <div>
                    <div
                        className={
                            'text-accent text-2xl font-bold tracking-wider'
                        }
                    >
                        {about.name}
                    </div>
                    <div className={'text-info text-sm mt-1'}>
                        {about.tagline}
                    </div>
                </div>
            </div>

            <hr className={' border-t border-base-300 my-3.5'} />

            <div className="flex mb-1.25 text-sm">
                <span className={'text-secondary w-30 shrink-0'}>degree</span>
                <span>{about.degree}</span>
            </div>
            <div className="flex mb-1.25 text-sm">
                <span className={'text-secondary w-30 shrink-0'}>
                    university
                </span>
                <span>{about.university}</span>
            </div>
            <div className="flex mb-1.25 text-sm">
                <span className={'text-secondary w-30 shrink-0'}>location</span>
                <span>{about.location}</span>
            </div>
            <div className="flex mb-1.25 text-sm">
                <span className={'text-secondary w-30 shrink-0'}>
                    experience
                </span>
                <span>{about.experience}</span>
            </div>
            <div className="flex mb-1.25 text-sm">
                <span className={'text-secondary w-30 shrink-0'}>status</span>
                <span className={'text-success'}>{about.status}</span>
            </div>

            <hr className={' border-t border-base-300 my-3.5'} />

            <div className="flex mb-1.25 text-sm">
                <span className={'text-secondary w-30 shrink-0'}>
                    interests
                </span>
            </div>
            <div className="mb-4">
                {about.interests.map((i) => (
                    <span
                        key={i}
                        className="inline-block bg-accent/20 text-accent text-sm px-2 py-1 mx-0.5 mt-1 rounded-selector"
                    >
                        {i}
                    </span>
                ))}
            </div>

            <hr className={' border-t border-base-300 my-3.5'} />

            <p className="text-primary">
                Building <span className="text-accent">Ledgerly</span> — a
                full-stack personal finance tracker — as primary portfolio
                project.
                <br />
                Previously interned at{' '}
                <span className="text-base-content">SGV &amp; Co.</span>
                <br />
            </p>
        </div>
    )
}
