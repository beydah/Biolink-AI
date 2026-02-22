// #region HEADER
// Module: types
// TypeScript interfaces for centralized application configuration (data.json)
// #endregion HEADER

// #region LIBRARIES
// No external dependencies
// #endregion LIBRARIES

// #region VARIABLES
export interface LinkItem {
    readonly label: string
    readonly url: string
    readonly is_external: boolean
}

export interface ProfileData {
    readonly name: string
    readonly title: string
    readonly avatar_url: string
    readonly links: readonly LinkItem[]
}

export interface SeoMeta {
    readonly title: string
    readonly description: string
    readonly og_title?: string
    readonly og_description?: string
    readonly og_image?: string
}

export interface AppConfig {
    readonly app_url: string
    readonly app_title: string
    readonly profile: ProfileData
    readonly seo: SeoMeta
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region EXPORTS
// All interfaces exported in-place
// #endregion EXPORTS
