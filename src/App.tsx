import { useCallback, useRef, useState } from 'react'

import InnerPanel from './components/InnerPanel.tsx'
import Intro from './components/Intro.tsx'
import KeybindHints from './components/KeybindHints.tsx'
import MobileLayout from './components/MobileLayout.tsx'
import Sidebar from './components/SideBar.tsx'
import StatusBar from './components/StatusBar.tsx'
import TitleBar, { Tabs } from './components/TitleBar.tsx'
import { contact } from './components/sections/Contacts.tsx'
import { projects } from './components/sections/Projects.tsx'
import { SECTIONS } from './data/sections.ts'
import { useIsMobile } from './hooks/useIsMobile.ts'
import { useKeybinds } from './hooks/useKeybinds.ts'

const INNER_SECTIONS = ['projects', 'contact']

function App() {
    const [showIntro, setShowIntro] = useState(true)
    const [sectionIdx, setSectionIdx] = useState(0)
    const [activeTab, setActiveTab] = useState(0)
    const [focusMode, setFocusMode] = useState<'inner' | 'outer'>('outer')
    const contentRef = useRef<HTMLElement | null>(null)
    const [innerIdx, setInnerIdx] = useState(0)
    const isMobile = useIsMobile()

    const currentSection = SECTIONS[sectionIdx]
    const canEnterInner = INNER_SECTIONS.includes(currentSection)

    const navigate = useCallback(
        (value: number | 'first' | 'last', mode?: 'absolute') => {
            setSectionIdx((prev) => {
                let next = prev
                if (mode === 'absolute' && typeof value === 'number')
                    next = Math.max(0, Math.min(SECTIONS.length - 1, value))
                else if (value === 'first') next = 0
                else if (value === 'last') next = SECTIONS.length - 1
                else
                    next = Math.max(
                        0,
                        Math.min(SECTIONS.length - 1, prev + value)
                    )
                return next
            })
            setFocusMode('outer')
            setInnerIdx(0)
            contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        },
        []
    )

    const innerNavigate = useCallback(
        (dir: number) => {
            setInnerIdx((i) => {
                const max =
                    currentSection == 'projects'
                        ? projects.length - 1
                        : contact.length - 2
                const next = i + dir
                return Math.max(0, Math.min(max, next))
            })
        },
        [currentSection]
    )

    const enterInner = useCallback(() => {
        if (canEnterInner) {
            setFocusMode('inner')
        }
    }, [canEnterInner])

    const escapeInner = useCallback(() => {
        setFocusMode('outer')
    }, [])

    const cycleTab = useCallback(() => {
        setActiveTab((t) => (t + 1) % Tabs.length)
    }, [])

    const onInnerEnter = useCallback(() => {
        let item:
            | {
                  url?: string | null
                  value?: string
                  label?: string
                  download?: boolean
              }
            | undefined

        if (currentSection === 'projects') item = projects[innerIdx]
        else if (currentSection === 'contact') item = contact[innerIdx]
        else return

        if (!item) return

        if (item.label === 'email') {
            window.location.href = `mailto:${item.value}`
            return
        }

        if (!item.url) return

        if (item.download) {
            const a = document.createElement('a')
            a.href = item.url
            a.download = ''
            a.click()
            return
        }

        window.open(item.url, '_blank')
    }, [innerIdx, currentSection])

    useKeybinds({
        onNavigate: navigate,
        onInnerNavigate: innerNavigate,
        onInnerEnter: onInnerEnter,
        onTabCycle: cycleTab,
        onEnterPanel: enterInner,
        onEscapePanel: escapeInner,
        focusMode,
        contentRef,
    })

    if (showIntro) return <Intro onFinish={() => setShowIntro(false)} />
    if (isMobile) return <MobileLayout />

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
                    onSelect={(i: number) => {
                        setSectionIdx(i)
                        setFocusMode('outer')
                        setInnerIdx(0)
                    }}
                />
                <InnerPanel
                    sectionIdx={sectionIdx}
                    focusMode={focusMode}
                    innerIdx={innerIdx}
                    onInnerSelect={setInnerIdx}
                    onEnterPanel={enterInner}
                    ref={contentRef}
                />
            </div>

            <StatusBar sectionIdx={sectionIdx} focusMode={focusMode} />
            <KeybindHints focusMode={focusMode} canEnterInner={canEnterInner} />
        </div>
    )
}

export default App
