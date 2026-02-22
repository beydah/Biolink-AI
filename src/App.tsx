// #region HEADER
// Module: app
// Root application component with providers
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { C_Error_Boundary } from '@/frontend/atoms'
import { F_Home_Page } from '@/frontend/pages'
// #endregion LIBRARIES

// #region VARIABLES
// No variables in this module
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Wraps the application in HelmetProvider and ErrorBoundary
const F_App: FC = () => {
    return (
        <HelmetProvider>
            <C_Error_Boundary>
                <F_Home_Page />
            </C_Error_Boundary>
        </HelmetProvider>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_App
// #endregion EXPORTS
