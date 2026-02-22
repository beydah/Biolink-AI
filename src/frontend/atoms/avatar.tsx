// #region HEADER
// Module: avatar
// Atom component for displaying circular profile images
// #endregion HEADER

// #region LIBRARIES
import { type FC, type ImgHTMLAttributes } from 'react'
// #endregion LIBRARIES

// #region CONSTANTS
const SIZES = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
} as const
// #endregion CONSTANTS

// #region VARIABLES
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    readonly size?: 'sm' | 'md' | 'lg'
}
// #endregion VARIABLES

// #region FUNCTIONS
// Renders a circular avatar image with configurable size
const F_Avatar: FC<AvatarProps> = ({ size: p_size = 'md', className: p_class_name = '', alt: p_alt, ...p_rest }) => {
    return (
        <figure
            className={`overflow-hidden rounded-full border-4 border-white/20 shadow-2xl ${SIZES[p_size]} ${p_class_name}`}
        >
            <img
                className="h-full w-full object-cover"
                alt={p_alt}
                loading="eager"
                {...p_rest}
            />
        </figure>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Avatar
// #endregion EXPORTS
