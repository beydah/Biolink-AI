// #region HEADER
// Module: main
// Application entry point and DOM mount
// #endregion HEADER

// #region LIBRARIES
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import F_App from './app'
// #endregion LIBRARIES

// #region VARIABLES
const root_element = document.getElementById('root')!
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Mounts the React application into the DOM
createRoot(root_element).render(
  <StrictMode>
    <F_App />
  </StrictMode>,
)
// #endregion FUNCTIONS
