import { type FC, type ImgHTMLAttributes } from 'react'

interface QRCodeProps extends ImgHTMLAttributes<HTMLImageElement> {
    readonly size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48 sm:w-56 sm:h-56',
    lg: 'w-64 h-64',
} as const

const QRCode: FC<QRCodeProps> = ({ size = 'md', className = '', alt = 'QR Code', ...props }) => {
    return (
        <img
            className={`rounded-2xl shadow-xl object-cover ${SIZES[size]} ${className}`}
            alt={alt}
            loading="lazy"
            {...props}
        />
    )
}

export default QRCode
