'use client'

import { useState, useEffect } from 'react'

import { signIn } from 'next-auth/react'

import Link from 'next/link'

import Image from 'next/image'

import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import SwitchLanguage from '../Static/SwitchLanguage'

const LoginPage = () => {

    const t = useTranslations('Login')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {

        const savedEmail = localStorage.getItem('email')

        if (savedEmail) {

            setEmail(savedEmail)
            setRememberMe(true)

        }

    }, [])

    const togglePasswordVisibility = () => {

        setShowPassword(!showPassword)

    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setError('')

        const result = await signIn('credentials', {

            redirect: false,
            email,
            password,

        })

        if (result?.error) {

            setError(result.error)

        } else {

            if (rememberMe) {

                localStorage.setItem('rememberMe', 'true')
                localStorage.setItem('email', email)

            } else {

                localStorage.removeItem('rememberMe')
                localStorage.removeItem('email')

            }

            window.location.href = '/'

        }

    }

    return (

        <div className='flex h-screen relative'>

            <div className='absolute right-10 top-10'>
                <SwitchLanguage />
            </div>

            <div className='hidden lg:flex items-center justify-center flex-1 relative'>

                <div className='z-10 w-full h-full bg-primary/20 absolute top-0 left-0'></div>

                <Image
                    src='/assets/login.webp'
                    alt='Ciervo Magico'
                    className='z-0'
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />

            </div>

            <div className='w-full lg:w-1/2 flex items-center justify-center'>

                <div className='px-5 max-w-lg w-full space-y-10'>

                    <div className='space-y-6'>

                        <h1 className='text-xl text-secondary'>
                            {t('title')}
                        </h1>
                        <p>
                            {t('desc')}
                        </p>

                    </div>

                    <form className='space-y-5' onSubmit={handleSubmit}>

                        <div className='space-y-4'>

                            <label htmlFor='email' className='block font-medium text-primary'>
                                {t('email')}
                            </label>

                            <input
                                className='w-full py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                                id='email'
                                name='email'
                                type='email'
                                placeholder='tunombre@santuario.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                        <div className='space-y-4'>

                            <label
                                htmlFor='password'
                                className='block font-medium text-primary'
                            >
                                {t('password')}
                            </label>

                            <div className='relative'>
                                <input
                                    className='w-full py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('putpassword')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={togglePasswordVisibility}
                                    className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:cursor-pointer'
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                        </div>

                        <div className='flex items-center'>

                            <input
                                id='rememberMe'
                                name='rememberMe'
                                type='checkbox'
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className='h-4 w-4 text-customColor focus:ring-customColor border-gray-300 rounded hover:cursor-pointer'
                            />

                            <label htmlFor='rememberMe' className='ml-2 block'>
                                {t('remember')}
                            </label>

                        </div>

                        {error && <p className='text-red-500'>{error}</p>}

                        <div className='space-y-4'>

                            <button
                                type='submit'
                                className='w-full py-2 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-secondary hover:cursor-pointer'
                            >
                                {t('join')}
                            </button>

                            <p className='text-center'>
                                {t('haveaccount')} <Link href='/register' className='text-secondary hover:text-primary'> {t('registerhere')}</Link>
                            </p>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    )

}

export default LoginPage