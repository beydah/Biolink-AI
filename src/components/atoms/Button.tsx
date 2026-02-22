import { type FC, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    readonly variant?: 'primary' | 'ghost'
}

const VARIANTS = {
    primary: [
        'bg-white/95 text-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]',
        'hover:bg-transparent hover:text-white hover:border-white hover:shadow-[4px_4px_0px_rgba(255,255,255,0.2)]',
        'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.3)]',
    ].join(' '),
    ghost: [
        'bg-transparent text-white/70 border-white/30',
        'hover:bg-white/10 hover:text-white hover:border-white/50',
    ].join(' '),
} as const

const Button: FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
    return (
        <button
            className={`
        w-72 sm:w-80 md:w-96 h-13 rounded-xl border border-transparent
        font-poppins font-medium text-base
        transition-all duration-200 ease-out cursor-pointer
        backdrop-blur-sm
        ${VARIANTS[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
