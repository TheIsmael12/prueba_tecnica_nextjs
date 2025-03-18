'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useCallback, useState } from 'react'

import { Creatures } from '@/types/creatures'

const useFetchCreatures = () => {

    const [creatures, setCreatures] = useState<Creatures[] | null>(null)

    const [totalPages, setTotalPages] = useState(0)
    const [totalCreatures, setTotalCreatures] = useState(0)

    const [loadingCreatures, setLoading] = useState(true)

    const getCreatures = useCallback(async (searchQuery?: string, currentPage?: number, selectedTypes?: string[]) => {

        try {

            const params: { search?: string, page?: number, type?: string[] } = {}

            if (searchQuery) params.search = searchQuery
            if (currentPage) params.page = currentPage
            if (selectedTypes) params.type = selectedTypes

            const response = await axios.get('/api/creatures', { params })

            const { creatures, totalPages, totalCreatures } = response.data

            setCreatures(creatures)
            setTotalPages(totalPages)
            setTotalCreatures(totalCreatures)

        } catch (error) {

            toast.error(axios.isAxiosError(error) && error.response ? error.response.data.message : 'Hubo un problema al obtener tu criaturas.')

        } finally {

            setLoading(false)

        }

    }, [])

    return { getCreatures, creatures, loadingCreatures, totalPages, totalCreatures }
}

export default useFetchCreatures