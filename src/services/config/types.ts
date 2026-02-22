// #region HEADER
// Module: types
// TypeScript interfaces for profile and link data structures
// #endregion HEADER

// #region LIBRARIES
// No external dependencies
// #endregion LIBRARIES

// #region VARIABLES
export interface LinkItem {
    readonly label: string
    readonly url: string
    readonly isExternal: boolean
}

export interface ProfileData {
    readonly name: string
    readonly title: string
    readonly avatarUrl: string
    readonly qrCodeUrl: string
    readonly links: readonly LinkItem[]
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region EXPORTS
// All interfaces exported in-place
// #endregion EXPORTS
