import { Metadata } from 'next'

import LoginPage from '@/components/Auth/LoginPage'

const baseUrl = `https://${process.env.NEXT_PUBLIC_INFO_DOMINE_PUBLIC}`
const empresa = process.env.NEXT_PUBLIC_INFO_EMPRESA_PUBLIC

export const metadata: Metadata = {

    title: `${empresa} - Inicio de Sesión`,
    
    description: `Inicia sesión en ${empresa} y accede al mundo mágico de magos y bichos. Descubre aventuras, desafíos y diversión en nuestra plataforma única.`,
    keywords: 'inicio de sesión, magos, bichos, aventuras mágicas, desafíos, diversión, DLTCode, mundo mágico, juegos en línea',
    publisher: `${empresa}`,
    applicationName: `${empresa}`,
    authors: [{ name: `${empresa}` }],
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    creator: 'Ismael Benabdellah El Ouahabi',

    openGraph: {

        title: `${empresa} - Inicio de Sesión`,
        description: `Accede a tu cuenta en ${empresa} y adéntrate en el universo mágico lleno de magos y bichos.`,
        url: `${baseUrl}/login`,
        type: 'website',
        locale: 'es',
        siteName: `${empresa}`,
        images: [

            {
                url: `${baseUrl}/images/login.png`,
                alt: `${empresa} - Inicio de Sesión`,
                width: 800,
                height: 600,
            }

        ],

    },

    twitter: {

        card: 'summary_large_image',
        site: `${empresa}`,
        title: `${empresa} - Inicio de Sesión`,
        description: `Inicia sesión en ${empresa} y explora el mundo mágico lleno de magos y bichos. Vive aventuras únicas y desafíos emocionantes.`,
        images: [`${baseUrl}/images/login.png`],

    },

    robots: 'index,follow',

}

const Login = () => {

    return  <LoginPage />

}

export default Login