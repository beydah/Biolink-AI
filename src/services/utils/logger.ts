// #region HEADER
// Module: logger
// Structured frontend logging utility
// #endregion HEADER

// #region LIBRARIES
// No external dependencies
// #endregion LIBRARIES

// #region CONSTANTS
const LOG_PREFIX = '[Biolink AI]'
const IS_DEV = import.meta.env.DEV
// #endregion CONSTANTS

// #region VARIABLES
type LogLevel = 'info' | 'warn' | 'error'
// #endregion VARIABLES

// #region FUNCTIONS
// Logs a structured message with level prefix
function F_Log(p_level: LogLevel, p_message: string, p_data?: unknown): void {
    const timestamp = new Date().toISOString()
    const formatted_message = `${LOG_PREFIX} ${timestamp} [${p_level.toUpperCase()}] ${p_message}`

    switch (p_level) {
        case 'info':
            if (IS_DEV) console.info(formatted_message, p_data ?? '')
            break
        case 'warn':
            console.warn(formatted_message, p_data ?? '')
            break
        case 'error':
            console.error(formatted_message, p_data ?? '')
            break
    }
}

// Convenience wrappers with consistent interface
function F_Log_Info(p_message: string, p_data?: unknown): void {
    F_Log('info', p_message, p_data)
}

function F_Log_Warn(p_message: string, p_data?: unknown): void {
    F_Log('warn', p_message, p_data)
}

function F_Log_Error(p_message: string, p_data?: unknown): void {
    F_Log('error', p_message, p_data)
}
// #endregion FUNCTIONS

// #region EXPORTS
export { F_Log, F_Log_Info, F_Log_Warn, F_Log_Error }
// #endregion EXPORTS
