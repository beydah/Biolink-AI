// #region HEADER
// Module: main
// Application entry point and DOM mount
// #endregion HEADER

// #region LIBRARIES
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import F_App from './app'
import { F_Validate_Env } from '@/services/utils/env'
import { F_Log_Info } from '@/services/utils/logger'
// #endregion LIBRARIES

// #region VARIABLES
const root_element = document.getElementById('root')!
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Validates environment and mounts the React application
F_Validate_Env()
F_Log_Info('Application mounting')

createRoot(root_element).render(
  <StrictMode>
    <F_App />
  </StrictMode>,
)
// #endregion FUNCTIONS
