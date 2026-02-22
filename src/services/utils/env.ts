// #region HEADER
// Module: env
// Runtime environment variable validation
// #endregion HEADER

// #region LIBRARIES
// No external dependencies
// #endregion LIBRARIES

// #region CONSTANTS
const REQUIRED_VARS = ['VITE_APP_URL'] as const
// #endregion CONSTANTS

// #region VARIABLES
// No variables in this module
// #endregion VARIABLES

// #region FUNCTIONS
// Validates that all required environment variables are defined
function F_Validate_Env(): void {
    const missing_vars: string[] = []

    for (const env_key of REQUIRED_VARS) {
        const env_value = import.meta.env[env_key]
        if (!env_value || env_value.trim() === '') {
            missing_vars.push(env_key)
        }
    }

    if (missing_vars.length > 0) {
        console.warn(
            `[ENV] Missing required environment variables: ${missing_vars.join(', ')}. ` +
            'Check your .env file. See docs/DEPLOYMENT.md for setup instructions.'
        )
    }
}
// #endregion FUNCTIONS

// #region EXPORTS
export { F_Validate_Env }
// #endregion EXPORTS
