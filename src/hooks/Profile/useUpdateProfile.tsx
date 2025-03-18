'use client'

import axios from 'axios'

import { toast } from 'sonner'
import { useState } from 'react'

import { User } from '@/types/user'

const useUpdateProfile = () => {

    const [loadingUpdate, setLoading] = useState(false)
    const [itsUpdated, setItsUpdated] = useState(false)

    const updateProfile = async (updatedData: User) => {

        setLoading(true)

        try {

            const response = await axios.put(`/api/profile`, updatedData)

            toast.success(response.data.message)
            setItsUpdated(prev => !prev)

            return true

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al actualizar tu perfil.')
            return false

        } finally {

            setLoading(false)

        }

    }

    return { updateProfile, loadingUpdate, itsUpdated }

}

export default useUpdateProfile