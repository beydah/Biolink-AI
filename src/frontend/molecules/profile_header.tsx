// #region HEADER
// Module: profile_header
// Molecule combining avatar, name, and title into a profile header
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { F_Avatar, F_Heading } from '@/frontend/atoms'
import { ANIMATION_DURATION, ANIMATION_EASE } from '@/backend/config/constants'
// #endregion LIBRARIES

// #region VARIABLES
interface ProfileHeaderProps {
    readonly name: string
    readonly title: string
    readonly avatarUrl: string
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders profile avatar with name and title, animated on entry
const F_Profile_Header: FC<ProfileHeaderProps> = ({ name: p_name, title: p_title, avatarUrl: p_avatar_url }) => {
    const prefers_reduced = useReducedMotion()

    return (
        <motion.header
            className="flex flex-col items-center gap-4"
            initial={prefers_reduced ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASE }}
        >
            <F_Avatar src={p_avatar_url} alt={`${p_name} profile photo`} size="md" />
            <div className="flex flex-col items-center gap-1 text-center">
                <F_Heading as="h1">{p_name}</F_Heading>
                <F_Heading as="h2">{p_title}</F_Heading>
            </div>
        </motion.header>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Profile_Header
// #endregion EXPORTS
