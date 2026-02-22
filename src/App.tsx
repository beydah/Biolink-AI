// #region HEADER
// Module: app
// Root application component with data fetching and context providers
// #endregion HEADER

// #region LIBRARIES
import { type FC, useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { C_Error_Boundary } from '@/frontend/atoms'
import { F_Home_Page } from '@/frontend/pages'
import { ConfigProvider } from '@/backend/config/context'
import { type AppConfig } from '@/backend/config/types'
import { F_Log_Error, F_Log_Info } from '@/backend/utils/logger'
// #endregion LIBRARIES

// #region VARIABLES
// #endregion VARIABLES

// #region CONSTANTS
// #endregion CONSTANTS

// #region FUNCTIONS
// Wraps the application in HelmetProvider, ConfigProvider and ErrorBoundary
const F_App: FC = () => {
    const [config, set_config] = useState<AppConfig | null>(null)
    const [loading, set_loading] = useState(true)
    const [error, set_error] = useState<string | null>(null)

    useEffect(() => {
        const fetch_config = async () => {
            try {
                F_Log_Info('Fetching application configuration from data.json')
                const response = await fetch('/data.json')
                if (!response.ok) {
                    throw new Error(`Failed to fetch config: ${response.statusText}`)
                }
                const data = await response.json()
                set_config(data)
                F_Log_Info('Configuration loaded successfully')
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error'
                F_Log_Error('Failed to load configuration', err)
                set_error(message)
            } finally {
                set_loading(false)
            }
        }

        fetch_config()
    }, [])

    return (
        <HelmetProvider>
            <ConfigProvider value={{ config, is_loading: loading, error }}>
                <C_Error_Boundary>
                    <F_Home_Page />
                </C_Error_Boundary>
            </ConfigProvider>
        </HelmetProvider>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_App
// #endregion EXPORTS
