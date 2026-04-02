const OUTER_HINTS = [
    { key: 'j & k / ArrowUp & ArrowDown', desc: 'navigate' },
    { key: 'gg / G', desc: 'top/bottom' },
    { key: 'Enter / ArrowRight / l', desc: 'enter panel' },
]

const INNER_HINTS = [
    { key: 'j/k', desc: 'select item' },
    { key: 'Esc/h', desc: 'back to nav' },
    { key: 'Ctrl+d/u', desc: 'scroll' },
    { key: 'Enter', desc: 'open link' },
]

export default function KeybindHints({ focusMode, canEnterInner }) {
    const hints =
        focusMode === 'inner'
            ? INNER_HINTS
            : OUTER_HINTS.filter((h) => {
                  return !(h.key === 'Enter / ArrowRight / l' && !canEnterInner)
              })

    return (
        <div className="bg-base-100 px-4 py-2 flex gap-5 shrink-0 flex-wrap">
            {hints.map(({ key, desc }) => (
                <span key={key} className="text-secondary text-sm">
                    <span className="bg-base-200 px-1.25 mr-2 rounded-0.5 border border-base-300">
                        {key}
                    </span>
                    {desc}
                </span>
            ))}
        </div>
    )
}
