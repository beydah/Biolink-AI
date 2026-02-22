// #region HEADER
// Module: footer
// Organism for the page footer with attribution link
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE } from '@/services/config/profile'
import { ANIMATION_DURATION, ANIMATION_EASE } from '@/services/config/constants'
// #endregion LIBRARIES

// #region VARIABLES
// No variables in this module
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders footer with animated fade-in and creator attribution
const F_Footer: FC = () => {
    const prefers_reduced = useReducedMotion()

    return (
        <motion.footer
            className="py-6 text-center"
            initial={prefers_reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIMATION_DURATION, delay: 1, ease: ANIMATION_EASE }}
        >
            <a
                href={PROFILE.links[0].url}
                className="text-white/40 no-underline text-sm font-light transition-colors duration-200 hover:text-white/70"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${PROFILE.name}'s website`}
            >
                Created by {PROFILE.name}
            </a>
        </motion.footer>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Footer
// #endregion EXPORTS
