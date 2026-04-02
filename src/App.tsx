import { useCallback, useRef, useState } from 'react'

import TitleBar, { Tabs } from './components/TitleBar.tsx'
import { SECTIONS } from './data/sections.ts'
import { useKeybinds } from './hooks/useKeybinds.ts'

const INNER_SECTIONS = ['projects', 'contact']

function App() {
    const [sectionIdx, setSectionIdx] = useState(0)
    const [activeTab, setActiveTab] = useState(0)
    const [focusMode, setFocusMode] = useState<'inner' | 'outer'>('outer')
    const contentRef = useRef<HTMLElement | null>(null)
    const [innerIdx, setInnerIdx] = useState(0)

    const currentSection = SECTIONS[sectionIdx]
    const canEnterInner = INNER_SECTIONS.includes(currentSection)

    const navigate = useCallback((value, mode?) => {
        setSectionIdx((prev) => {
            let next = prev
            if (mode === 'absolute')
                next = Math.max(0, Math.min(SECTIONS.length - 1, value))
            else if (value === 'first') next = 0
            else if (value === 'last') next = SECTIONS.length - 1
            else next = Math.max(0, Math.min(SECTIONS.length - 1, prev + value))
            return next
        })
        setFocusMode('outer')
        setInnerIdx(0)
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const innerNavigate = useCallback((dir) => {
        setInnerIdx((i) => Math.max(0, i + dir))
    }, [])

    const enterInner = useCallback(() => {
        if (canEnterInner) setFocusMode('inner')
    }, [canEnterInner, setFocusMode])

    const escapeInner = useCallback(() => {
        setFocusMode('outer')
    }, [])

    const cycleTab = useCallback(() => {
        setActiveTab((t) => (t + 1) % Tabs.length)
    }, [])

  </div>
    useKeybinds({
        onNavigate: navigate,
        onInnerNavigate: innerNavigate,
        onTabCycle: cycleTab,
        onEnterPanel: enterInner,
        onEscapePanel: escapeInner,
        focusMode,
        contentRef,
    })

    return (
        <div
            className={
                'flex flex-col h-screen w-screen bg-base-100 overflow-hidden'
            }
        >
            <TitleBar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className={'flex flex-1 overflow-hidden'}>
                <Sidebar
                    sectionIdx={sectionIdx}
                    focusMode={focusMode}
                    onSelect={(i) => {
                        setSectionIdx(i)
                        setFocusMode('outer')
                        setInnerIdx(0)
                    }}
                />
            </div>
            <StatusBar sectionIdx={sectionIdx} focusMode={focusMode} />
            <KeybindHints focusMode={focusMode} canEnterInner={canEnterInner} />
        </div>
    )
}

export default App
