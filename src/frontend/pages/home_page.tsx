// #region HEADER
// Module: home_page
// Page-level component composing the entire biolink view
// #endregion HEADER

// #region LIBRARIES
import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { F_Biolink_Layout } from '@/frontend/templates'
import { F_Hero_Section, F_Footer } from '@/frontend/organisms'
import { PROFILE } from '@/services/config/profile'
import { DEFAULT_SEO } from '@/services/seo/meta'
// #endregion LIBRARIES

// #region VARIABLES
// No variables in this module
// #endregion VARIABLES

// #region CONSTANTS
// No constants in this module
// #endregion CONSTANTS

// #region FUNCTIONS
// Renders the complete home page with SEO metadata
const F_Home_Page: FC = () => {
    return (
        <>
            <Helmet>
                <title>{DEFAULT_SEO.title}</title>
                <meta name="description" content={DEFAULT_SEO.description} />
                <meta property="og:title" content={DEFAULT_SEO.ogTitle} />
                <meta property="og:description" content={DEFAULT_SEO.ogDescription} />
                <meta property="og:image" content={DEFAULT_SEO.ogImage} />
            </Helmet>

            <F_Biolink_Layout>
                <F_Hero_Section profile={PROFILE} />
                <F_Footer />
            </F_Biolink_Layout>
        </>
    )
}
// #endregion FUNCTIONS

// #region EXPORTS
export default F_Home_Page
// #endregion EXPORTS
