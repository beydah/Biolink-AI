import { type FC } from 'react'
import { motion } from 'framer-motion'
import { QRCode } from '@/components/atoms'
import { ProfileHeader, LinkButton } from '@/components/molecules'
import type { ProfileData } from '@/services/config/types'
import { ANIMATION_STAGGER } from '@/services/config/constants'

interface HeroSectionProps {
    readonly profile: ProfileData
}

const HeroSection: FC<HeroSectionProps> = ({ profile }) => {
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.3 + index * ANIMATION_STAGGER,
                            ease: 'easeOut',
                        }}
                    >
                        <LinkButton link={link} />
                    </motion.div>
                ))}
            </nav>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
            >
                <QRCode src={profile.qrCodeUrl} alt="Scan to visit" size="md" />
            </motion.div>
        </section>
    )
}

export default HeroSection
