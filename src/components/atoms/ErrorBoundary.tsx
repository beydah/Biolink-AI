import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
    readonly children: ReactNode
}

interface ErrorBoundaryState {
    readonly hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('ErrorBoundary caught:', error, info.componentStack)
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-white text-2xl font-bold mb-2">Something went wrong</h1>
                    <p className="text-white/70 text-base mb-6">Please refresh the page to try again.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white/95 text-gray-800 px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-white transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
