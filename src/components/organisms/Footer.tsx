import { type FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE } from '@/services/config/profile'
import { ANIMATION_DURATION, ANIMATION_EASE } from '@/services/config/constants'

const Footer: FC = () => {
    const prefersReduced = useReducedMotion()

    return (
        <motion.footer
            className="py-6 text-center"
            initial={prefersReduced ? false : { opacity: 0 }}
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

export default Footer
