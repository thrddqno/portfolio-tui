import { forwardRef, type Ref } from 'react'

import { type Section, SECTION_META, SECTIONS } from '../data/sections.ts'
import About from './sections/About.tsx'
import Contact from './sections/Contacts.tsx'
import Projects from './sections/Projects.tsx'
import Skills from './sections/Skills.tsx'

type InnerPanelProps = {
    sectionIdx: number
    focusMode: 'inner' | 'outer'
    innerIdx: number
    onInnerSelect: (i: number) => void
    onEnterPanel: () => void
}

const InnerPanel = forwardRef(function ContentPanel(
    {
        sectionIdx,
        focusMode,
        innerIdx,
        onInnerSelect,
        onEnterPanel,
    }: InnerPanelProps,
    ref
) {
    const section = SECTIONS[sectionIdx] as Section
    const meta = SECTION_META[section]

    const sectionProps = { focusMode, innerIdx, onInnerSelect, onEnterPanel }

    const renderSection = () => {
        switch (section) {
            case 'about':
                return <About />
            case 'skills':
                return <Skills />
            case 'projects':
                return <Projects {...sectionProps} />
            case 'contact':
                return <Contact {...sectionProps} />

            default:
                return null
        }
    }

    return (
        <div
            className={`flex flex-col flex-1 overflow-hidden ${focusMode === 'inner' ? ' focused' : ''}`}
        >
            <div className="border-b border-base-300 py-2 px-5 items-center flex shrink-0 gap-2.5">
                <span className="text-accent font-bold">{meta.title}</span>
                <span className="text-secondary">{meta.sub}</span>
                {focusMode === 'inner' && (
                    <span className="ml-auto bg-info/30 text-info text-xs px-2 py-px tracking-widest rounded-box">
                        FOCUSED
                    </span>
                )}
            </div>
            <div
                ref={ref as Ref<HTMLDivElement>}
                className="flex-1 bg-base-200 overflow-y-auto px-5 py-6"
            >
                {renderSection()}
            </div>
        </div>
    )
})

export default InnerPanel
