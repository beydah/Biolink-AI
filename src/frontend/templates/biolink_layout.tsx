// #region HEADER
// Module: biolink_layout
// Template providing the full-page gradient layout with decorative orbs
// #endregion HEADER

// #region LIBRARIES
import { type FC, type ReactNode } from 'react'
// #endregion LIBRARIES

// #region VARIABLES
interface BiolinkLayoutProps {
    readonly children: ReactNode
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders a full-height gradient container with floating decorative orbs
const F_Biolink_Layout: FC<BiolinkLayoutProps> = ({ children: p_children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg">
                {p_children}
            </div>
        </div>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Biolink_Layout
// #endregion EXPORTS
