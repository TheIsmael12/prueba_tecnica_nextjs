import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import { User } from '@/types/user'
import { useTranslations } from 'next-intl'

interface UpdateProfileProps {

    profile: User
    updateProfile: (updatedData: User) => Promise<boolean>
    loadingUpdate: boolean

}

const UpdateProfile = ({ profile, updateProfile, loadingUpdate }: UpdateProfileProps) => {

    const t = useTranslations('Profile')

    const initialValues: User = {

        username: profile.username,
        email: profile.email,
        role: profile.role,
        description: profile.description || ''

    }

    const validationSchema = Yup.object({

        username: Yup.string()
            .required(t('obusername')),

        email: Yup.string()
            .email(t('inemail'))
            .required(t('obemail')),

        role: Yup.string()
            .required(t('obrole')),

        description: Yup.string()
            .required(t('obdesc')),

    })


    const handleSubmit = async (values: User) => {

        await updateProfile(values)

    }

    return (

        <Formik

            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}

        >

            <Form className='space-y-4'>

                <div className='space-y-2'>

                    <label htmlFor='username' className='text-primary'>
                        {t('name')}
                    </label>

                    <Field
                        name='username'
                        className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                    />

                    <ErrorMessage name='username' component='div' className='text-red-500' />

                </div>

                <div className='space-y-2'>

                    <label htmlFor='email' className='text-primary'>
                        {t('email')}
                    </label>

                    <Field
                        name='email'
                        type='email'
                        className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                    />

                    <ErrorMessage name='email' component='div' className='text-red-500' />

                </div>

                <div className='space-y-2'>

                    <label htmlFor='role' className='text-primary'>
                        {t('role')}
                    </label>

                    <Field
                        name='role'
                        as='select'
                        className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'>
                        <option value=''>{t('selectrole')}</option>
                        <option value='Maestro'>{t('master')}</option>
                        <option value='Cuidador'>{t('keeper')}</option>
                    </Field>

                    <ErrorMessage name='role' component='div' className='text-red-500' />

                </div>

                <div className='space-y-2'>

                    <label htmlFor='description' className='text-primary'>
                        {t('description')}
                    </label>

                    <Field
                        name='description'
                        as='textarea'
                        rows={5}
                        className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                    />

                    <ErrorMessage name='description' component='div' className='text-red-500' />

                </div>

                <button
                    type='submit'
                    className='bg-primary hover:bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer w-full lg:w-auto'
                    disabled={loadingUpdate}>
                    {loadingUpdate ? `${t('doingmagic')}` : `${t('save')}`}
                </button>

            </Form>

        </Formik>

    )

}

export default UpdateProfile