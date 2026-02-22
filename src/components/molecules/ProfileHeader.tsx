import { type FC } from 'react'
import { motion } from 'framer-motion'
import { Avatar, Heading } from '@/components/atoms'

interface ProfileHeaderProps {
    readonly name: string
    readonly title: string
    readonly avatarUrl: string
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ name, title, avatarUrl }) => {
    return (
        <motion.header
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
