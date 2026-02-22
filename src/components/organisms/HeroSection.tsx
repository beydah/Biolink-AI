import { type FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QRCode } from '@/components/atoms'
import { ProfileHeader, LinkButton } from '@/components/molecules'
import type { ProfileData } from '@/services/config/types'
import {
    ANIMATION_DURATION,
    ANIMATION_STAGGER,
    ANIMATION_EASE,
} from '@/services/config/constants'

interface HeroSectionProps {
    readonly profile: ProfileData
}

const HeroSection: FC<HeroSectionProps> = ({ profile }) => {
    const prefersReduced = useReducedMotion()

    return (
        <section className="flex flex-col items-center gap-6 sm:gap-8 w-full" aria-label="Profile">
            <ProfileHeader
                name={profile.name}
                title={profile.title}
                avatarUrl={profile.avatarUrl}
            />

            <nav className="flex flex-col items-center gap-4" aria-label="Social links">
                {profile.links.map((link, index) => (
                    <motion.div
                        key={link.label}
                        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: ANIMATION_DURATION,
                            delay: 0.3 + index * ANIMATION_STAGGER,
                            ease: ANIMATION_EASE,
                        }}
                    >
                        <LinkButton link={link} />
                    </motion.div>
                ))}
            </nav>

            <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: ANIMATION_DURATION, delay: 0.8, ease: ANIMATION_EASE }}
            >
                <QRCode src={profile.qrCodeUrl} alt="Scan to visit" size="md" />
            </motion.div>
        </section>
    )
}

export default HeroSection
