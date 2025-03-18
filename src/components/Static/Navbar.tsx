import Nav from './Nav'

import { useTranslations } from 'next-intl'
import SwitchLanguage from './SwitchLanguage'

const Navbar = () => {

    const t = useTranslations('Navbar')

    return (

        <nav className='px-5 lg:px-10 py-10 lg:flex justify-between space-y-4 lg:space-y-0'>

            <h1 className='text-3xl text-secondary'>
                {t('title')}
            </h1>

            <div className='flex gap-2 lg:gap-10 items-center'>

                <Nav />
                <SwitchLanguage />

            </div>

        </nav >

    )

}

export default Navbar