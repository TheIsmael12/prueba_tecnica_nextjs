'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'

import { User } from '@/types/user'

const useGetProfile = () => {

    const [profile, setProfile] = useState<User | null>(null)
    const [loadingProfile, setLoading] = useState(true)

    const getProfile = async () => {

        try {

            const { data } = await axios.get('/api/profile')
            setProfile(data.profile)

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al obtener tu perfil.')

        } finally {

            setLoading(false)

        }

    }

    return { getProfile, profile, loadingProfile }
}

export default useGetProfile