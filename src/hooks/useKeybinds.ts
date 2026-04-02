import { type RefObject, useEffect, useRef } from 'react'

type UseKeybindsProps = {
    onNavigate?: (direction: number | 'first' | 'last') => void
    onInnerNavigate?: (direction: number) => void
    onInnerEnter?: () => void
    onTabCycle?: () => void
    onEnterPanel?: () => void
    onEscapePanel?: () => void
    focusMode: 'inner' | 'outer'
    contentRef: RefObject<HTMLElement | null>
}

export function useKeybinds({
    onNavigate,
    onInnerNavigate,
    onInnerEnter,
    onTabCycle,
    onEnterPanel,
    onEscapePanel,
    focusMode,
    contentRef,
}: UseKeybindsProps) {
    const gPressed = useRef(false)
    const gTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null
            if (
                target?.tagName.toLowerCase() === 'input' ||
                target?.tagName.toLowerCase() === 'textarea'
            )
                return

            if (e.key === 'd' && e.ctrlKey) {
                e.preventDefault()
                if (contentRef.current) {
                    contentRef.current.scrollBy({
                        top: 200,
                        behavior: 'smooth',
                    })
                }
                return
            }

            if (e.key === 'u' && e.ctrlKey) {
                e.preventDefault()
                contentRef?.current?.scrollBy({ top: -200, behavior: 'smooth' })
                return
            }

            // inner panel
            if (focusMode === 'inner') {
                if (
                    e.key === 'Escape' ||
                    e.key === 'h' ||
                    e.key === 'ArrowLeft'
                ) {
                    e.preventDefault()
                    onEscapePanel?.()
                    return
                }
                if (e.key === 'j' || e.key === 'ArrowDown') {
                    e.preventDefault()
                    onInnerNavigate?.(1)
                    return
                }
                if (e.key === 'k' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    onInnerNavigate?.(-1)
                    return
                }
                if (e.key === 'Enter') {
                    e.preventDefault()
                    onInnerEnter?.()
                    return
                }
                return
            }

            //outer panel (sidebar)
            if (e.key === 'Enter' || e.key === 'l' || e.key === 'ArrowRight') {
                e.preventDefault()
                onEnterPanel?.()
                return
            }

            if (e.key === 'Tab') {
                e.preventDefault()
                onTabCycle?.()
                return
            }
            //gg
            if (e.key === 'g') {
                e.preventDefault()
                if (gPressed.current) {
                    clearTimeout(gTimer.current)
                    gPressed.current = false
                    onNavigate?.('first')
                } else {
                    gPressed.current = true
                    gTimer.current = setTimeout(() => {
                        gPressed.current = false
                    }, 300)
                }
                return
            }

            //G (caps)
            if (e.key === 'G') {
                e.preventDefault()
                onNavigate?.('last')
                return
            }

            if (e.key === 'j' || e.key === 'ArrowDown') {
                e.preventDefault()
                onNavigate?.(1)
                return
            }

            if (e.key === 'k' || e.key === 'ArrowUp') {
                e.preventDefault()
                onNavigate?.(-1)
                return
            }
        }

        window.addEventListener('keydown', handler)
        return () => {
            window.removeEventListener('keydown', handler)
            clearTimeout(gTimer.current)
        }
    }, [
        onNavigate,
        onInnerNavigate,
        onInnerEnter,
        onTabCycle,
        onEnterPanel,
        onEscapePanel,
        focusMode,
        contentRef,
    ])
}
