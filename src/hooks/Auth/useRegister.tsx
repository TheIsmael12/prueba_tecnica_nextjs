'use client'

import axios from 'axios'

import { toast } from 'sonner'

import { useState } from 'react'

import { AddUser } from '@/types/user'

const useRegister = () => {

    const [loadingAdd, setLoading] = useState(false)

    const addUser = async (data: AddUser) => {

        setLoading(true)

        try {

            const response = await axios.post(`/api/register`, data)

            // Si la solicitud es exitosa, mostramos el mensaje de éxito y actualizamos el estado

            if (response.status === 200) { 

                toast.success(response.data.message)
                return true
            }

            toast.error('Hubo un problema al registrar tu perfil.')
            return false

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al registrar tu perfil.')
            return false

        } finally {

            setLoading(false)

        }

    }

    return { addUser, loadingAdd }

}

export default useRegister