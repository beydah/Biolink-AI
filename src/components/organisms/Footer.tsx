import { type FC } from 'react'
import { motion } from 'framer-motion'

const Footer: FC = () => {
    return (
        <motion.footer
            className="py-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            <a
                href="https://beydahsaglam.com/"
                className="text-white/40 no-underline text-sm font-light transition-colors duration-200 hover:text-white/70"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Beydah Saglam's website"
            >
                Created by Beydah Saglam
            </a>
        </motion.footer>
    )
}

export default Footer
