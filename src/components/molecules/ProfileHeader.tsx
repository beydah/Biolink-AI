import { type FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Avatar, Heading } from '@/components/atoms'
import { ANIMATION_DURATION, ANIMATION_EASE } from '@/services/config/constants'

interface ProfileHeaderProps {
    readonly name: string
    readonly title: string
    readonly avatarUrl: string
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ name, title, avatarUrl }) => {
    const prefersReduced = useReducedMotion()

    return (
        <motion.header
            className="flex flex-col items-center gap-4"
            initial={prefersReduced ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASE }}
        >
            <Avatar src={avatarUrl} alt={`${name} profile photo`} size="md" />
            <div className="flex flex-col items-center gap-1 text-center">
                <Heading as="h1">{name}</Heading>
                <Heading as="h2">{title}</Heading>
            </div>
        </motion.header>
    )
}

export default ProfileHeader
