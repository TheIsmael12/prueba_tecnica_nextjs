import axios from 'axios'

import { useState, useCallback } from 'react'

import { toast } from 'sonner'

import { CreaturesUpdate } from '@/types/creatures'
import { useRouter } from 'next/navigation'

const useGetCreature = () => {

    const router = useRouter()

    const [creature, setCreature] = useState<CreaturesUpdate | null>(null)

    const [loadingCreature, setLoading] = useState(true)

    const getCreature = useCallback(async (creatureId: string) => {

        try {

            const response = await axios.get(`/api/creatures/${creatureId}`)
            setCreature(response.data.creature)

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al añadir al usuario.')
            router.push('/creatures')

        } finally {

            setLoading(false)

        }

    }, [router])

    return { creature, getCreature, loadingCreature }

}

export default useGetCreature