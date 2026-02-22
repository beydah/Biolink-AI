// #region HEADER
// Module: qr_code
// Atom component for generating and displaying QR codes programmatically
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { QRCodeSVG } from 'qrcode.react'
// #endregion LIBRARIES

// #region VARIABLES
interface QRCodeProps {
    readonly value: string
    readonly size?: number
    readonly className?: string
}
// #endregion VARIABLES

// #region CONSTANTS
const DEFAULT_SIZE = 192
// #endregion CONSTANTS

// #region FUNCTIONS
/**
 * Renders an SVG QR code using qrcode.react
 * Optimized for beydahsaglam.netlify.app distribution
 */
const F_QR_Code: FC<QRCodeProps> = ({ value: p_value, size: p_size = DEFAULT_SIZE, className: p_class_name = '' }) => {
    return (
        <div className={`p-4 bg-white rounded-2xl shadow-xl inline-block ${p_class_name}`}>
            <QRCodeSVG
                value={p_value}
                size={p_size}
                level="H"
                includeMargin={false}
                imageSettings={{
                    src: "/icon.png",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                }}
            />
        </div>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_QR_Code
// #endregion EXPORTS
