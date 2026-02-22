import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { BiolinkLayout } from '@/components/templates'
import { HeroSection, Footer } from '@/components/organisms'
import { PROFILE } from '@/services/config/profile'
import { DEFAULT_SEO } from '@/services/seo/meta'

const HomePage: FC = () => {
    return (
        <>
            <Helmet>
                <title>{DEFAULT_SEO.title}</title>
                <meta name="description" content={DEFAULT_SEO.description} />
                <meta property="og:title" content={DEFAULT_SEO.ogTitle} />
                <meta property="og:description" content={DEFAULT_SEO.ogDescription} />
                <meta property="og:image" content={DEFAULT_SEO.ogImage} />
            </Helmet>

            <BiolinkLayout>
                <HeroSection profile={PROFILE} />
                <Footer />
            </BiolinkLayout>
        </>
    )
}

export default HomePage
