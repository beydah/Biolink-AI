import { type FC, type ReactNode } from 'react'

interface BiolinkLayoutProps {
    readonly children: ReactNode
}

const BiolinkLayout: FC<BiolinkLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-[#1a1a4e] to-secondary flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
            {/* Decorative background orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg">
                {children}
            </div>
        </div>
    )
}

export default BiolinkLayout
