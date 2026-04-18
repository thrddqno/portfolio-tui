export type Section = 'about' | 'skills' | 'projects' | 'contact'

export const SECTIONS: Section[] = ['about', 'skills', 'projects', 'contact']

export const NAV_ICONS: Record<string, string> = {
    about: '▶',
    skills: '◆',
    projects: '◈',
    contact: '✉',
}

export const SECTION_META: Record<Section, { title: string; sub: string }> = {
    about: { title: 'about', sub: '| personal info' },
    skills: { title: 'skills', sub: '| tech stack' },
    projects: { title: 'projects', sub: '| things i built' },
    contact: { title: 'contact', sub: '| get in touch' },
}
