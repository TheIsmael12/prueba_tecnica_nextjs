'use client'

import Link from 'next/link'

import { signOut } from 'next-auth/react'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

const Nav = () => {

    const t = useTranslations('Navbar')

    const pathname = usePathname()

    const getLinkClass = (href: string) => {

        return `px-4 py-2 rounded-md ${pathname.startsWith(href) ? 'bg-primary/10' : 'hover:bg-primary/10'}`

    }

    return (

        <div className='flex justify-center gap-2 items-center text-sm lg:text-base'>

            <Link href='/creatures' title={t('creatures')} className={getLinkClass('/creatures')}>
                {t('creatures')}
            </Link>

            <Link href='/profile' title={t('myprofile')} className={getLinkClass('/profile')}>
                {t('myprofile')}
            </Link>

            <button title={t('logout')} onClick={() => signOut()} className='px-4 py-2 rounded-md hover:bg-primary/10 hover:cursor-pointer'>
                {t('logout')}
            </button>

        </div>

    )

}

export default Nav