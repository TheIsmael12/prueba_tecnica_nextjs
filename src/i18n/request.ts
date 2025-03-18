import { cookies } from 'next/headers'

import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {

    const defaultLocale = 'en' // Idioma por defecto
    const supportedLocales = ['en', 'es'] // Idiomas soportados

    // Esperar a que se resuelvan las cookies
    const cookieStore = await cookies()
    const localeFromCookies = cookieStore.get('NEXT_LOCALE')?.value

    // Determinar el idioma final
    let locale = localeFromCookies || defaultLocale

    // Asegurar que el idioma esté soportado
    if (!supportedLocales.includes(locale)) {

        locale = defaultLocale

    }

    return {

        locale,
        messages: (await import(`../../messages/${locale}.json`)).default

    }

})