import { useEffect, useState } from 'react'

const ASCII = `
      ▄▄             ▄▄    ▄▄                   
 ██   ██             ██    ██                   
▀██▀▀ ████▄ ████▄ ▄████ ▄████ ▄████ ████▄ ▄███▄ 
 ██   ██ ██ ██ ▀▀ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ 
 ██   ██ ██ ██    ▀████ ▀████ ▀████ ██ ██ ▀███▀ 
                                 ██             
                                 ▀▀             
`

const CMD = './portfolio.sh'

type Phase = 'ascii' | 'typing' | 'done'

type IntroProps = {
    onFinish: () => void
}

export default function Intro({ onFinish }: IntroProps) {
    const [phase, setPhase] = useState<Phase>('ascii')
    const [typed, setTyped] = useState('')
    const [visible, setVisible] = useState(false)

    // fade in ascii
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    // after ascii shown, start typing
    useEffect(() => {
        if (!visible) return
        const t = setTimeout(() => setPhase('typing'), 1200)
        return () => clearTimeout(t)
    }, [visible])

    // typewriter effect
    useEffect(() => {
        if (phase !== 'typing') return
        if (typed.length >= CMD.length) {
            // pause then finish
            const t = setTimeout(() => {
                setPhase('done')
                setTimeout(onFinish, 400)
            }, 700)
            return () => clearTimeout(t)
        }
        const t = setTimeout(() => {
            setTyped(CMD.slice(0, typed.length + 1))
        }, 80)
        return () => clearTimeout(t)
    }, [phase, typed, onFinish])

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-base-100 font-mono">
            <pre
                className={`text-accent text-xs sm:text-sm leading-relaxed transition-opacity duration-700 select-none ${
                    visible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {ASCII}
            </pre>

            <div
                className={`mt-6 text-sm transition-opacity duration-300 ${
                    phase === 'ascii' ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <span className="text-info">antonio@portfolio</span>
                <span className="text-secondary">:</span>
                <span className="text-accent">~</span>
                <span className="text-secondary">$ </span>
                <span className="text-base-content">{typed}</span>
                {phase !== 'ascii' && (
                    <span className="inline-block w-2 h-4 bg-accent align-middle animate-blinking ml-0.5" />
                )}
            </div>
        </div>
    )
}
