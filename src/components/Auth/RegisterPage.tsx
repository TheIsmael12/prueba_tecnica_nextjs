'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import Link from 'next/link'
import Image from 'next/image'

import useRegister from '@/hooks/Auth/useRegister'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { useTranslations } from 'next-intl'

import { AddUser } from '@/types/user'
import SwitchLanguage from '../Static/SwitchLanguage'

const RegisterPage = () => {

    const t = useTranslations('Register')

    const router = useRouter()

    const { addUser, loadingAdd } = useRegister()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {

        setShowPassword(!showPassword)

    }

    const initialValues: AddUser = {

        username: '',
        email: '',
        password: '',
        role: 'Cuidador',

    }

    const validationSchema = Yup.object({

        username: Yup.string()
            .matches(/^[a-zA-Z0-9_]+$/, t('errors.username_invalid'))
            .required(t('errors.username_required'))
            .min(3, t('errors.username_min')),

        email: Yup.string()
            .email(t('errors.email_invalid'))
            .required(t('errors.email_required'))
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_format')),

        role: Yup.string()
            .oneOf(['Maestro', 'Cuidador'], t('errors.role_invalid'))
            .required(t('errors.role_required')),

        password: Yup.string()
            .min(8, t('errors.password_min'))
            .matches(/[A-Z]/, t('errors.password_uppercase'))
            .matches(/[a-z]/, t('errors.password_lowercase'))
            .matches(/[0-9]/, t('errors.password_number'))
            .matches(/[^A-Za-z0-9]/, t('errors.password_special'))
            .required(t('errors.password_required')),

    })

    const handleSubmit = async (values: typeof initialValues) => {

        const response = await addUser(values)

        if (response) {
            router.push('/login')
        }

    }

    return (

        <div className='flex h-screen relative'>

            <div className='absolute right-10 top-10'>
                <SwitchLanguage />
            </div>

            <div className='hidden lg:flex flex-1 relative'>

                <div className='z-10 w-full h-full bg-primary/20 absolute top-0 left-0'></div>

                <Image
                    src='/assets/register.webp'
                    alt='Ciervo Magico'
                    className='z-0'
                    fill
                    style={{ objectFit: 'cover', transform: 'scaleX(-1)', objectPosition: 'center' }}
                />

            </div>

            <div className='w-full lg:w-1/2 flex items-center justify-center'>

                <div className='px-5 max-w-lg w-full space-y-10'>

                    <div className='space-y-6'>
                        <h1 className='text-xl text-secondary'>{t('title')}</h1>
                        <p>{t('description')}</p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        <Form className='space-y-5'>

                            <div className='space-y-4'>

                                <label htmlFor='username'
                                    className='block font-medium text-primary'>
                                    {t('username_label')}
                                </label>
                                <Field
                                    id='username'
                                    name='username'
                                    type='text'
                                    placeholder={t('username_placeholder')}
                                    className='w-full py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline' />
                                <ErrorMessage name='username' component='div' className='text-red-500' />

                            </div>

                            <div className='space-y-4'>

                                <label
                                    htmlFor='email'
                                    className='block font-medium text-primary'>
                                    {t('email_label')}
                                </label>
                                <Field
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder={t('email_placeholder')}
                                    className='w-full py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline' />
                                <ErrorMessage name='email' component='div' className='text-red-500' />

                            </div>

                            <div className='space-y-4'>

                                <label
                                    htmlFor='role'
                                    className='block font-medium text-primary'>
                                    {t('role_label')}
                                </label>
                                <Field
                                    as='select'
                                    id='role'
                                    name='role'
                                    className='w-full py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'>
                                    <option value='Cuidador'>{t('role_caretaker')}</option>
                                    <option value='Maestro'>{t('role_teacher')}</option>
                                </Field>
                                <ErrorMessage name='role' component='div' className='text-red-500' />

                            </div>

                            <div className='space-y-4'>

                                <label
                                    htmlFor='password'
                                    className='block font-medium text-primary'>
                                    {t('password_label')}
                                </label>

                                <div className='relative'>

                                    <Field
                                        id='password'
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={t('password_placeholder')}
                                        className='w-full py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                                    />

                                    <button type='button' onClick={togglePasswordVisibility} className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:cursor-pointer'>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>

                                </div>

                                <ErrorMessage name='password' component='div' className='text-red-500' />

                            </div>

                            <div className='space-y-4'>

                                <button type='submit' className='w-full py-2 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-secondary hover:cursor-pointer' disabled={loadingAdd}>
                                    {loadingAdd ? 'Registrando...' : t('submit')}
                                </button>

                                <p className='text-center'>
                                    {t('already_have_account')}{' '}
                                    <Link href='/login' className='text-secondary hover:text-primary'>{t('login')}</Link>
                                </p>

                            </div>

                        </Form>

                    </Formik>

                </div>

            </div>

        </div>

    )

}

export default RegisterPage