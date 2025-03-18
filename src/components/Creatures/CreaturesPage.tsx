'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'

import CreaturesList from './CreaturesList'

import useFetchCreatures from '@/hooks/Creatures/useFetchCreatures'
import useDeleteCreatures from '@/hooks/Creatures/useDeleteCreatures'

import LoadingCreaturesList from '@/components/Loaders/LoadingCreaturesList'
import { useTranslations } from 'next-intl'

const availableTypes = ['Dragon', 'Fenix', 'Golem', 'Vampiro', 'Unicornio']

const CreaturesPage = () => {

    const t = useTranslations('Creatures')

    const router = useRouter()
    const searchParams = useSearchParams()

    const initialPage = Number(searchParams.get('page')) || 1
    const initialSearch = searchParams.get('search') || ''
    const initialTypes = searchParams.get('types')?.split(',') || []

    const [currentPage, setCurrentPage] = useState(initialPage)
    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const [selectedTypes, setSelectedTypes] = useState(initialTypes)

    const { deleteCreature, loadingDelete, statusDelete } = useDeleteCreatures()
    const { creatures, getCreatures, loadingCreatures, totalCreatures, totalPages } = useFetchCreatures()

    useEffect(() => {

        getCreatures(searchQuery, currentPage, selectedTypes)

    }, [getCreatures, searchQuery, currentPage, selectedTypes, statusDelete])

    const updateURL = useCallback((page: number, search: string, types: string[]) => {

        const params = new URLSearchParams()

        if (page > 1) params.set('page', String(page))
        if (search) params.set('search', search)
        if (types.length > 0) params.set('types', types.join(','))

        return `?${params.toString()}`

    }, [])

    useEffect(() => {

        const url = updateURL(currentPage, searchQuery, selectedTypes)
        router.push(url)

    }, [currentPage, searchQuery, selectedTypes, updateURL, router])

    const handlePageChange = (newPage: number) => {

        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
            updateURL(newPage, searchQuery, selectedTypes)
        }

    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newSearchQuery = event.target.value
        setSearchQuery(newSearchQuery)
        setCurrentPage(1)
        updateURL(1, newSearchQuery, selectedTypes)

    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const type = event.target.value

        setSelectedTypes(prevTypes => {

            const updatedTypes = prevTypes.includes(type)
                ? prevTypes.filter(t => t !== type) // Si el tipo ya está seleccionado, lo quitamos
                : [...prevTypes, type]; // Si no, lo agregamos al array

            updateURL(1, searchQuery, updatedTypes)

            return updatedTypes

        })
    }

    return (

        <>

            { /* Link para añadir nueva criatura */}

            <div className='flex justify-end'>

                <Link href='/creatures/create' title={t('addcreature')} className='bg-primary hover:bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer'>
                    {t('addcreature')}
                </Link>

            </div>

            {/* Filtros */}

            <div className='mt-5 lg:flex gap-12 space-y-4 lg:space-y-0'>

                <div>

                    <label htmlFor='description' className='text-primary'>
                        {t('magicword')}
                    </label>
                    <input
                        type='text'
                        placeholder={t('search')}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='mt-2 w-full lg:w-80 block py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                    />

                </div>

                <div>

                    <label htmlFor='description' className='text-secondary'>
                        {t('searchType')}
                    </label>

                    <div className='py-4 lg:flex gap-5 items-center'>

                        {availableTypes.map(type => (

                            <div key={type} className='flex items-center'>

                                <input
                                    type='checkbox'
                                    id={type}
                                    value={type}
                                    checked={selectedTypes.includes(type)}
                                    onChange={handleTypeChange}
                                    className='mr-2'
                                />

                                <label htmlFor={type} className='text-lg'>
                                    {t(`${type.toLowerCase()}`)}
                                </label>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Listado */}

            {

                loadingCreatures ? (

                    <LoadingCreaturesList />

                ) : (

                    creatures && creatures.length !== 0 ? (

                        <CreaturesList

                            creatures={creatures}

                            onNextPage={() => handlePageChange(currentPage + 1)}
                            onPrevPage={() => handlePageChange(currentPage - 1)}

                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalCreatures={totalCreatures}

                            loadingCreatures={loadingCreatures}

                            deleteCreature={deleteCreature}
                            loadingDelete={loadingDelete}

                        />

                    ) : (

                        <div className='mt-10 text-center text-lg'>
                            <p>
                                {t('notfound')}
                            </p>

                            {t('notfound2')}
                        </div>

                    )

                )
            }

        </>

    )

}

export default CreaturesPage