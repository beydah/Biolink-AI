// #region HEADER
// Module: seo/meta
// Default SEO metadata configuration
// #endregion HEADER

// #region LIBRARIES
import type { SeoMeta } from './types'
// #endregion LIBRARIES

// #region VARIABLES
// No variables in this module
// #endregion VARIABLES

// #region CONSTANTS
export const DEFAULT_SEO: SeoMeta = {
    title: 'Beydah Saglam | Fullstack Developer',
    description:
        'Beydah Saglam — Fullstack Developer. Personal biolink with portfolio, contact, and social media links.',
    ogTitle: 'Beydah Saglam | Fullstack Developer',
    ogDescription: 'Personal biolink with portfolio, contact, and social media links.',
    ogImage: `${import.meta.env.VITE_APP_URL}/assets/avatar.jpg`,
}
// #endregion CONSTANTS

// #region EXPORTS
// DEFAULT_SEO exported in-place
// #endregion EXPORTS
