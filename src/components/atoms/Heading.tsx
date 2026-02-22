import { type FC, type HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const STYLES = {
    h1: 'text-2xl sm:text-3xl font-bold tracking-tight',
    h2: 'text-lg sm:text-xl font-normal opacity-90',
    h3: 'text-base font-medium',
    h4: 'text-sm font-medium',
    h5: 'text-xs font-medium',
    h6: 'text-xs font-normal',
} as const

const Heading: FC<HeadingProps> = ({ as: Tag = 'h1', className = '', children, ...props }) => {
    return (
        <Tag className={`text-white m-0 ${STYLES[Tag]} ${className}`} {...props}>
            {children}
        </Tag>
    )
}

export default Heading
