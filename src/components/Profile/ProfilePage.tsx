'use client'

import { useEffect } from 'react'

import UpdateProfile from './UpdateProfile'

import useUpdateProfile from '@/hooks/Profile/useUpdateProfile'
import useGetProfile from '@/hooks/Profile/useGetProfile'

import Header from '../Headers/Header'
import Loader from '../Loaders/Loader'
import { useTranslations } from 'next-intl'

const ProfilePage = () => {

    const t = useTranslations('Profile')

    const { updateProfile, loadingUpdate, itsUpdated } = useUpdateProfile()
    const { profile, getProfile, loadingProfile } = useGetProfile()

    useEffect(() => {

        if (!profile) {

            getProfile()

        }

    }, [profile, getProfile, itsUpdated])


    return (

        <>

            <Header
                title={t('title')}
                desc={t('desc')}
            />

            <section className='mt-10'>

                {

                    loadingProfile || !profile ? (

                        <div className='mt-40 flex justify-center items-center'>
                            <Loader />
                        </div>

                    ) : (

                        <UpdateProfile

                            profile={profile}
                            loadingUpdate={loadingUpdate}
                            updateProfile={updateProfile}

                        />


                    )

                }

            </section>

        </>

    )

}

export default ProfilePage