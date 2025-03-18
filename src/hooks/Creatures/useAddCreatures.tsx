'use client'

import axios from 'axios'

import { toast } from 'sonner'

import { useState } from 'react'
import { CreaturesAdd } from '@/types/creatures'

const useAddCreatures = () => {

    const [loadingAdd, setLoading] = useState(false)
    const [itsAdded, setItsAdded] = useState(false)

    const addCreatures = async (data: CreaturesAdd) => {

        setLoading(true)

        try {

            const response = await axios.post(`/api/creatures`, data)

            toast.success(response.data.message)
            setItsAdded(prev => !prev)

            return true

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al actualizar tu perfil.')
            return false

        } finally {

            setLoading(false)

        }

    }

    return { addCreatures, loadingAdd, itsAdded }

}

export default useAddCreatures