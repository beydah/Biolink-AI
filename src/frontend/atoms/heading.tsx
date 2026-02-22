// #region HEADER
// Module: heading
// Atom component for polymorphic heading elements
// #endregion HEADER

// #region LIBRARIES
import { type FC, type HTMLAttributes } from 'react'
// #endregion LIBRARIES

// #region CONSTANTS
const STYLES = {
    h1: 'text-2xl sm:text-3xl font-bold tracking-tight',
    h2: 'text-lg sm:text-xl font-normal opacity-90',
    h3: 'text-base font-medium',
    h4: 'text-sm font-medium',
    h5: 'text-xs font-medium',
    h6: 'text-xs font-normal',
} as const
// #endregion CONSTANTS

// #region VARIABLES
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
// #endregion VARIABLES

// #region FUNCTIONS
// Renders a heading element with the specified tag level
const F_Heading: FC<HeadingProps> = ({ as: p_tag = 'h1', className: p_class_name = '', children: p_children, ...p_rest }) => {
    const Tag = p_tag
    return (
        <Tag className={`text-white m-0 ${STYLES[Tag]} ${p_class_name}`} {...p_rest}>
            {p_children}
        </Tag>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Heading
// #endregion EXPORTS
