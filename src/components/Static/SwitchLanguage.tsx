'use client'

import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { HiLanguage } from 'react-icons/hi2'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

const SwitchLanguage = () => {

    const [menuLanguage, setMenuLanguage] = useState(false)
    const router = useRouter()

    const handleOpenMenu = () => {

        setMenuLanguage(true)

    };

    const handleCloseMenu = () => {
        setMenuLanguage(false);
    };

    const toggleOpenCloseMenu = () => {
        setMenuLanguage(!menuLanguage);
    };

    // Función para establecer la cookie NEXT_LOCALE

    const setLocaleCookie = (locale: string) => {

        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`

    }

    const changeLanguage = (newLocale: string) => {

        // Establecer la cookie antes de cambiar el idioma
        setLocaleCookie(newLocale)
        handleCloseMenu()
        router.refresh()

    }

    return (

        <div className='relative'>

            <button className='flex gap-2 hover:text-primary hover:cursor-pointer' title='Language'
                onMouseEnter={handleOpenMenu}
                onClick={toggleOpenCloseMenu}>

                <HiLanguage size={20} />

                {menuLanguage ? (<FaAngleUp />) : (<FaAngleDown />)}

            </button>

            {menuLanguage && (

                <div
                    className='absolute right-0 z-50 w-32 mt-2 origin-top-right rounded-md py-2 px-4 space-y-2 shadow-lg bg-white'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    onMouseLeave={handleCloseMenu}
                >

                    <button
                        title='Español'
                        onClick={() => changeLanguage('es')}
                        className='flex gap-2 items-center hover:text-primary hover:cursor-pointer'>
                        <Image src='/assets/es.svg'
                            alt='Español' title='Español'
                            className='w-4 h-4'
                            height={40} width={50} />
                        Español
                    </button>

                    <button
                        title='English'
                        onClick={() => changeLanguage('en')}
                        className='flex gap-2 items-center hover:text-primary hover:cursor-pointer'>
                        <Image src='/assets/en.svg' alt='English' title='English' className='w-4 h-4' height={40} width={50} />
                        English
                    </button>

                </div>
            )}

        </div>

    )

}

export default SwitchLanguage