import axios from 'axios'

import { useState, useCallback } from 'react'

import { toast } from 'sonner'

const useDeleteCreatures = () => {

    const [loadingDelete, setLoading] = useState(false)
    const [statusDelete, setStatusUpdated] = useState(false)

    const deleteCreature = useCallback(async (creatureId: string): Promise<boolean> => {

        try {

            setLoading(true)

            const response = await axios.delete('/api/creatures', { data: { creatureId } })

            toast.success(response.data.message)
            setStatusUpdated(prev => !prev)
            
            return true

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al añadir al usuario.')
            return false

        } finally {

            setLoading(false)

        }

    }, [])

    return { deleteCreature, loadingDelete, statusDelete }

}

export default useDeleteCreatures