import React from 'react'

interface HeaderProps {

    title: string,
    desc: string

}

const Header = ({ title, desc }: HeaderProps) => {

    return (

        <header className='space-y-2'>

            <h2 className='text-2xl text-secondary'>
                {title}
            </h2>

            <p className='text-gray-500 text-lg'>
                {desc}
            </p>

        </header>
    )
}

export default Header