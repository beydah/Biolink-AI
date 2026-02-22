// #region HEADER
// Module: qr_code
// Atom component for displaying QR code images
// #endregion HEADER

// #region LIBRARIES
import { type FC, type ImgHTMLAttributes } from 'react'
// #endregion LIBRARIES

// #region CONSTANTS
const SIZES = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48 sm:w-56 sm:h-56',
    lg: 'w-64 h-64',
} as const
// #endregion CONSTANTS

// #region VARIABLES
interface QRCodeProps extends ImgHTMLAttributes<HTMLImageElement> {
    readonly size?: 'sm' | 'md' | 'lg'
}
// #endregion VARIABLES

// #region FUNCTIONS
// Renders a rounded QR code image with lazy loading
const F_QR_Code: FC<QRCodeProps> = ({ size: p_size = 'md', className: p_class_name = '', alt: p_alt = 'QR Code', ...p_rest }) => {
    return (
        <img
            className={`rounded-2xl shadow-xl object-cover ${SIZES[p_size]} ${p_class_name}`}
            alt={p_alt}
            loading="lazy"
            {...p_rest}
        />
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_QR_Code
// #endregion EXPORTS
