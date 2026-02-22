// #region HEADER
// Module: config_context
// React context for providing application configuration globally
// #endregion HEADER

// #region LIBRARIES
import { createContext, useContext, type ReactNode } from 'react'
import { type AppConfig } from './types'
// #endregion LIBRARIES

// #region VARIABLES
interface ConfigContextValue {
    readonly config: AppConfig | null
    readonly is_loading: boolean
    readonly error: string | null
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined)
// #endregion VARIABLES

// #region FUNCTIONS
/**
 * Hook to access the application configuration
 */
export const use_config = () => {
    const context = useContext(ConfigContext)
    if (context === undefined) {
        throw new Error('use_config must be used within a ConfigProvider')
    }
    return context
}

interface ConfigProviderProps {
    readonly children: ReactNode
    readonly value: ConfigContextValue
}

export const ConfigProvider = ({ children, value }: ConfigProviderProps) => {
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}
// #endregion FUNCTIONS
