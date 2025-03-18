'use client'

import axios from 'axios'

import { toast } from 'sonner'
import { useState } from 'react'

import { CreaturesUpdate } from '@/types/creatures'

const useUpdateCreatures = () => {

    const [loadingUpdate, setLoading] = useState(false)
    const [itsUpdated, setItsUpdated] = useState(false)

    const updateCreatures = async (updatedData: CreaturesUpdate) => {

        setLoading(true)

        try {

            const response = await axios.put(`/api/creatures/${updatedData.id}`, updatedData)

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

    return { updateCreatures, loadingUpdate, itsUpdated }

}

export default useUpdateCreatures