import { type FC } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from '@/components/atoms'
import { HomePage } from '@/components/pages'

const App: FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
