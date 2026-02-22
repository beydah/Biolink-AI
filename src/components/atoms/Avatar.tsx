import { type FC, type ImgHTMLAttributes } from 'react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    readonly size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
} as const

const Avatar: FC<AvatarProps> = ({ size = 'md', className = '', alt, ...props }) => {
    return (
        <figure
            className={`overflow-hidden rounded-full border-4 border-white/20 shadow-2xl ${SIZES[size]} ${className}`}
        >
            <img
                className="h-full w-full object-cover"
                alt={alt}
                loading="eager"
                {...props}
            />
        </figure>
    )
}

export default Avatar
