import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

import { FaPencilAlt } from 'react-icons/fa'

import { useSession } from 'next-auth/react'

import type { Creatures } from '@/types/creatures'
import Link from 'next/link'
import CreatureDelete from './CreatureDelete'
import { useTranslations } from 'next-intl'

interface CreaturesListProps {

    creatures: Creatures[]

    onNextPage: () => void
    onPrevPage: () => void

    currentPage: number | 1
    totalPages: number | 1
    totalCreatures: number | 0

    loadingCreatures: boolean

    deleteCreature: (creatureId: string) => Promise<boolean>
    loadingDelete: boolean

}

const getBackgroundColor = (creatureType: string) => {

    switch (creatureType) {

        case 'Dragón':
            return 'bg-red-500' // Rojo para Dragon

        case 'Fénix':
            return 'bg-yellow-500' // Amarillo para Fénix

        case 'Golem':
            return 'bg-gray-500' // Gris para Golem

        case 'Grifo':
            return 'bg-blue-500' // Azul para Grifo

        case 'Vampiro':
            return 'bg-purple-500' // Morado para Vampiro

        default:
            return 'bg-black/15' // Color por defecto

    }
}

const toRoman = (num: number) => {

    const romanNumerals: { [key: number]: string } = {

        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X'

    }

    return romanNumerals[num] || '' // Retorna el valor romano o una cadena vacía si el número no está en el rango (Cosa que nunca va a pasar)
}

const CreaturesList = ({ creatures, currentPage, totalPages, totalCreatures, onPrevPage, onNextPage, deleteCreature, loadingDelete }: CreaturesListProps) => {

    const t = useTranslations('Creatures')

    const { data: session } = useSession()

    // Verificar que la sesión esté cargada y que el rol sea 'Maestro'

    const isMaestro = session?.user?.role === 'Maestro'

    return (

        <section className='space-y-2 lg:mt-10'>

            <div className='relative flex flex-col w-full h-full'>

                <table className='w-full text-left table-auto min-w-max'>

                    <thead className='border-b border-primary'>

                        <tr className='text-primary'>
                            <th className='p-4'>{t('name')}</th>
                            <th className='p-4'>{t('type')}</th>
                            <th className='p-4'>{t('level')}</th>
                            <th className='hidden lg:table-cell p-4'>{t('trained')}</th>
                            <th className='p-4 w-20'>{t('actions')}</th>
                        </tr>

                    </thead>

                    <tbody className='divide-y divide-secondary/60'>

                        {creatures.map(creature => (

                            <tr key={creature.id}>

                                <td className='p-4'>
                                    {creature.name}
                                </td>

                                <td className='p-4'>
                                    <p className={`${getBackgroundColor(creature.type)} text-white flex justify-center items-center w-20 rounded-md`}>
                                        {creature.type}
                                    </p>
                                </td>

                                <td className='p-4'>
                                    {toRoman(creature.power_level)}
                                </td>

                                <td className='hidden lg:table-cell p-4'>
                                    {creature.trained ? (`${t('yes')}`) : (`${t('no')}`)}
                                </td>

                                <td className='p-4'>

                                    <div className='flex gap-2 items-center justify-center'>

                                        <Link
                                            className='h-8 w-8 flex items-center justify-center rounded-md text-white p-2 bg-primary hover:cursor-pointer'
                                            href={`/creatures/edit/${creature.id}`}
                                        >
                                            <FaPencilAlt />
                                        </Link>

                                        {

                                            isMaestro && (

                                                <CreatureDelete
                                                    creatureId={creature.id}
                                                    creature={creature.name}
                                                    loadingDelete={loadingDelete}
                                                    deleteCreature={deleteCreature}
                                                />

                                            )

                                        }

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <div className='py-2 px-4 flex items-center justify-between border-t border-t-secondary/60'>

                    <p className='block'> {t('page')} {currentPage} {t('of')} {totalPages} {t('of')} {totalCreatures} {t('creatures')}</p>
                    
                    <div className='flex gap-2'>
                        <button
                            className='py-1.5 px-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 hover:cursor-pointer'
                            onClick={onPrevPage} disabled={currentPage === 1}
                        >
                            <MdNavigateBefore size={20} />
                        </button>
                        <button
                            className='py-1.5 px-2 rounded-md text-white bg-primary hover:bg-secondary disabled:bg-gray-300 hover:cursor-pointer'
                            onClick={onNextPage} disabled={currentPage === totalPages}
                        >
                            <MdNavigateNext size={20} />
                        </button>
                    </div>

                </div>

            </div>

        </section >

    )

}

export default CreaturesList