import { type FC } from 'react'
import { Button } from '@/components/atoms'
import type { LinkItem } from '@/services/config/types'

interface LinkButtonProps {
    readonly link: LinkItem
}

const LinkButton: FC<LinkButtonProps> = ({ link }) => {
    return (
        <a
            href={link.url}
            target={link.isExternal ? '_blank' : '_self'}
            rel={link.isExternal ? 'noopener noreferrer' : undefined}
            className="no-underline"
            aria-label={link.label}
        >
            <Button variant="primary">{link.label}</Button>
        </a>
    )
}

export default LinkButton
