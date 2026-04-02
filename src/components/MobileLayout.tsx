import { useState } from 'react'

import image from '../assets/image.png'
import { MobileAbout } from './MobileAbout.tsx'
import { MobileContact } from './MobileContact.tsx'
import { MobileProjects } from './MobileProjects.tsx'
import { MobileSkills } from './MobileSkills.tsx'
import { about } from './sections/About.tsx'
import { contact } from './sections/Contacts.tsx'
import { projects } from './sections/Projects.tsx'
import { skills } from './sections/Skills.tsx'

const TABS = ['about', 'skills', 'projects', 'contact'] as const
type Tab = (typeof TABS)[number]

export default function MobileLayout() {
    const [active, setActive] = useState<Tab>('about')

    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-mono">
            {/* header */}
            <div
                className={
                    'flex flex-row items-center px-5 pt-8 pb-4 border-b border-base-300 gap-5'
                }
            >
                <img className="rounded-full w-15 h-15" src={image} alt="" />
                <div className="">
                    <h1 className="text-2xl font-bold text-accent">
                        {about.name}
                    </h1>
                    <p className="text-sm text-success mt-1">{about.tagline}</p>
                </div>
            </div>

            {/* tabs */}
            <div className="flex border-b justify-center border-base-300 overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`px-5 py-3 text-xs whitespace-nowrap transition-colors ${
                            active === tab
                                ? 'text-accent border-b-2 border-accent font-bold'
                                : 'text-secondary hover:text-base-content'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* content */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
                {active === 'about' && <MobileAbout />}
                {active === 'skills' && <MobileSkills />}
                {active === 'projects' && <MobileProjects />}
                {active === 'contact' && <MobileContact />}
            </div>

            {/* footer */}
            <div className="border-t border-base-300 px-5 py-3 text-xs text-secondary text-center">
                best experienced on desktop with a keyboard
            </div>
        </div>
    )
}
