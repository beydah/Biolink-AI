// #region HEADER
// Module: link_button
// Molecule wrapping a button in an anchor tag for external links
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { F_Button } from '@/frontend/atoms'
import type { LinkItem } from '@/services/config/types'
// #endregion LIBRARIES

// #region VARIABLES
interface LinkButtonProps {
    readonly link: LinkItem
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders an anchor-wrapped button with external link handling
const F_Link_Button: FC<LinkButtonProps> = ({ link: p_link }) => {
    return (
        <a
            href={p_link.url}
            target={p_link.isExternal ? '_blank' : '_self'}
            rel={p_link.isExternal ? 'noopener noreferrer' : undefined}
            className="no-underline"
            aria-label={p_link.label}
        >
            <F_Button variant="primary">{p_link.label}</F_Button>
        </a>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Link_Button
// #endregion EXPORTS
