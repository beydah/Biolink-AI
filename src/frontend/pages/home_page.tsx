// #region HEADER
// Module: home_page
// Page-level component composing the entire biolink view using dynamic config
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { F_Biolink_Layout } from '@/frontend/templates'
import { F_Hero_Section, F_Footer } from '@/frontend/organisms'
import { use_config } from '@/backend/config/context'
// #endregion LIBRARIES

// #region VARIABLES
// #endregion VARIABLES

// #region CONSTANTS
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders the complete home page with SEO metadata from dynamic config
const F_Home_Page: FC = () => {
    const { config, is_loading, error } = use_config()

    if (is_loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white">
                <p className="animate-pulse">Loading experience...</p>
            </div>
        )
    }

    if (error || !config) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white text-center p-4">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Configuration Error</h1>
                    <p className="opacity-70">{error || 'Unable to load application data.'}</p>
                </div>
            </div>
        )
    }

    const { profile, seo } = config

    return (
        <>
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta property="og:title" content={seo.og_title || seo.title} />
                <meta property="og:description" content={seo.og_description || seo.description} />
                <meta property="og:image" content={seo.og_image} />
            </Helmet>

            <F_Biolink_Layout>
                <F_Hero_Section profile={profile} app_url={config.app_url} />
                <F_Footer />
            </F_Biolink_Layout>
        </>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Home_Page
// #endregion EXPORTS
