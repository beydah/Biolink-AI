export interface LinkItem {
    readonly label: string
    readonly url: string
    readonly isExternal: boolean
    readonly icon?: string
}

export interface ProfileData {
    readonly name: string
    readonly title: string
    readonly avatarUrl: string
    readonly qrCodeUrl: string
    readonly links: readonly LinkItem[]
}
