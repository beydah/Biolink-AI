// #region HEADER
// Module: hero_section
// Organism combining profile header, link buttons, and QR code
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { F_QR_Code } from '@/frontend/atoms'
import { F_Profile_Header, F_Link_Button } from '@/frontend/molecules'
import type { ProfileData } from '@/services/config/types'
import { ANIMATION_DURATION, ANIMATION_STAGGER, ANIMATION_EASE } from '@/services/config/constants'
// #endregion LIBRARIES

// #region VARIABLES
interface HeroSectionProps {
    readonly profile: ProfileData
}
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders the full hero section with staggered entry animations
const F_Hero_Section: FC<HeroSectionProps> = ({ profile: p_profile }) => {
    const prefers_reduced = useReducedMotion()

    return (
        <section className="flex flex-col items-center gap-6 sm:gap-8 w-full" aria-label="Profile">
            <F_Profile_Header
                name={p_profile.name}
                title={p_profile.title}
                avatarUrl={p_profile.avatarUrl}
            />

            <nav className="flex flex-col items-center gap-4" aria-label="Social links">
                {p_profile.links.map((link_item, link_index) => (
                    <motion.div
                        key={link_item.label}
                        initial={prefers_reduced ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: ANIMATION_DURATION,
                            delay: 0.3 + link_index * ANIMATION_STAGGER,
                            ease: ANIMATION_EASE,
                        }}
                    >
                        <F_Link_Button link={link_item} />
                    </motion.div>
                ))}
            </nav>

            <motion.div
                initial={prefers_reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: ANIMATION_DURATION, delay: 0.8, ease: ANIMATION_EASE }}
            >
                <F_QR_Code src={p_profile.qrCodeUrl} alt="Scan to visit" size="md" />
            </motion.div>
        </section>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Hero_Section
// #endregion EXPORTS
