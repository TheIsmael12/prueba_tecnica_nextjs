import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'

interface CreatureDeleteProps {

    creatureId: string
    creature: string
    loadingDelete: boolean
    deleteCreature: (creatureId: string) => Promise<boolean>

}

const CreatureDelete = ({ creatureId, creature, loadingDelete, deleteCreature }: CreatureDeleteProps) => {

    const t = useTranslations('CreaturesDelete')

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDeleteClick = () => {

        setIsModalOpen(true)

    }

    const handleConfirmDelete = async () => {

        setIsModalOpen(false)
        await deleteCreature(creatureId)

    }

    const handleCancelDelete = () => {

        setIsModalOpen(false)

    }

    return (

        <div>

            <button
                className='h-8 w-8 flex items-center justify-center rounded-md text-white p-2 bg-secondary hover:cursor-pointer'
                onClick={handleDeleteClick}
                disabled={loadingDelete}
            >

                <FaTrash />

            </button>

            {isModalOpen && (

                <div className='fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50'>

                    <div className='bg-white p-6 rounded-md w-96'>

                        <h3 className='text-xl font-semibold mb-4'>{t('title')} <span className='text-secondary'>{creature}</span>?</h3>

                        <div className='flex justify-end gap-2'>

                            <button
                                onClick={handleConfirmDelete}
                                className='bg-primary text-white px-6 py-2 rounded-md hover:bg-scroll hover:cursor-pointer'
                            >
                               {t('yes')}
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className='bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-300 hover:cursor-pointer'
                            >
                                {t('no')}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}

export default CreatureDelete
