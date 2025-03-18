import Header from '@/components/Headers/Header'
import { useTranslations } from 'next-intl'
import React from 'react'

const CreaturesLayout = ({

    children,

}: Readonly<{

    children: React.ReactNode

}>) => {

    const t = useTranslations('Creatures')

    return (

        <>

            <Header
                title={t('title')}
                desc={t('desc')}
            />

            <main className='mt-10'>

                {children}

            </main>
            
        </>
    )
}

export default CreaturesLayout