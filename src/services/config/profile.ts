import type { ProfileData } from './types'

export const PROFILE: ProfileData = {
    name: 'Beydah Saglam',
    title: 'Fullstack Developer',
    avatarUrl: '/assets/avatar.jpg',
    qrCodeUrl: '/assets/qr-code.jpg',
    links: [
        {
            label: 'Website',
            url: 'https://beydahsaglam.com/',
            isExternal: false,
        },
        {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/beydah',
            isExternal: true,
        },
        {
            label: 'Bionluk',
            url: 'https://bionluk.com/beydah',
            isExternal: true,
        },
        {
            label: 'Mail',
            url: 'mailto:info.beydahsaglam@gmail.com',
            isExternal: true,
        },
        {
            label: 'Download CV',
            url: '/assets/resume.pdf',
            isExternal: true,
        },
    ],
} as const
