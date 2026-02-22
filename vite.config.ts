// #region HEADER
// Module: vite.config
// Vite build configuration with React and Tailwind CSS plugins
// #endregion HEADER

// #region LIBRARIES
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// #endregion LIBRARIES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region VARIABLES
// No variables in this module
// #endregion VARIABLES

// #region EXPORTS
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
// #endregion EXPORTS
