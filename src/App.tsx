import { type FC } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { HomePage } from '@/components/pages'

const App: FC = () => {
  return (
    <HelmetProvider>
      <HomePage />
    </HelmetProvider>
  )
}

export default App
