import type { SeoMeta } from './types'

export const DEFAULT_SEO: SeoMeta = {
    title: 'Beydah Saglam | Fullstack Developer',
    description:
        'Beydah Saglam — Fullstack Developer. Personal biolink with portfolio, contact, and social media links.',
    ogTitle: 'Beydah Saglam | Fullstack Developer',
    ogDescription: 'Personal biolink with portfolio, contact, and social media links.',
    ogImage: `${import.meta.env.VITE_APP_URL}/assets/avatar.jpg`,
}
