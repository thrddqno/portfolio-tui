export const Tabs = ['portfolio']

interface Props {
    activeTab: number
    onTabChange: (tab: number) => void
}

export default function TitleBar({ activeTab, onTabChange }: Props) {
    return (
        <div
            className={
                'flex flex-row align-middle gap-2 bg-base-100 px-4 py-2 border-b border-base-300'
            }
        >
            {Tabs.map((tab, index) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(index)}
                    className={`${activeTab === index ? 'bg-accent text-base-100' : 'text-secondary'} px-3 py-0.5 rounded-box`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}
