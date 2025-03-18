import type { Metadata } from 'next'

import { Sedan, Sedan_SC } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'

import { NextIntlClientProvider } from 'next-intl'

import { getLocale } from 'next-intl/server'

const sedan = Sedan({

  subsets: ['latin'],
  weight: '400',
  variable: '--font-sedan',

})

const sedanSC = Sedan_SC({

  subsets: ['latin'],
  weight: '400',
  variable: '--font-sedan-sc',

})

const baseUrl = `https://${process.env.NEXT_PUBLIC_INFO_DOMINE_PUBLIC}`
const empresa = process.env.NEXT_PUBLIC_INFO_EMPRESA_PUBLIC

export const metadata: Metadata = {

  title: `${empresa} - Prueba técnica de Magos y Bichos`,

  description: `Explora el mundo mágico de ${empresa} con nuestra prueba técnica de Magos y Bichos. Descubre cómo combinamos tecnología y creatividad para ofrecer soluciones innovadoras.`,
  keywords: 'DLTCode, prueba técnica, magos, bichos, desarrollo web, tecnología, innovación, creatividad, programación',
  publisher: empresa,
  applicationName: empresa,
  authors: [{ name: 'DLTCode Team' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Ismael Benabdellah El Ouahabi',

  openGraph: {

    title: `${empresa} - Prueba técnica de Magos y Bichos`,
    description: `Adéntrate en el universo de Magos y Bichos con ${empresa}. Una prueba técnica que combina magia y tecnología para crear experiencias únicas.`,
    url: `${baseUrl}`,
    type: 'website',
    locale: 'es',
    siteName: empresa,
    images: [
      {
        url: `${baseUrl}/images/magos-y-bichos.png`,
        alt: `${empresa} - Prueba técnica de Magos y Bichos`,
        width: 800,
        height: 600,
      }
    ],

  },

  twitter: {

    card: 'summary_large_image',
    site: empresa,
    title: `${empresa} - Prueba técnica de Magos y Bichos`,
    description: `Descubre cómo ${empresa} combina magia y tecnología en nuestra prueba técnica de Magos y Bichos. Innovación y creatividad en cada paso.`,
    images: [`${baseUrl}/images/magos-y-bichos.png`],

  },

  robots: 'index,follow',

}

export default async function AppLayout({

  children

}: Readonly<{

  children: React.ReactNode,

}>) {

  const locale = await getLocale()

  return (

    <html lang={locale}
      className={`${sedan.variable} ${sedanSC.variable}`}>

      <body>

        <Toaster richColors />
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>

      </body>

    </html >

  )



}
