// #region HEADER
// Module: vite_env
// Type-safe environment variable declarations for Vite
// #endregion HEADER

// #region LIBRARIES
/// <reference types="vite/client" />
// #endregion LIBRARIES

// #region VARIABLES
interface ImportMetaEnv {
    readonly VITE_APP_URL: string
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region EXPORTS
interface ImportMeta {
    readonly env: ImportMetaEnv
}
// #endregion EXPORTS
