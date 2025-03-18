import { useTranslations } from 'next-intl'

import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

const LoadingCreaturesList = () => {

    const t = useTranslations('Creatures')

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

                        { /* Usamos un mapa para generar filas 10 */}

                        {Array.from({ length: 5 }).map((_, index) => (

                            <tr key={index}>

                                <td className='p-4'>
                                    <p className='bg-black/15 w-20 lg:w-32 rounded-md'>&nbsp;</p>
                                </td>
                                <td className='p-4'>
                                    <p className='bg-black/15 w-14 lg:w-20 rounded-md'>&nbsp;</p>
                                </td>
                                <td className='p-4'>
                                    <p className='bg-black/15 w-10 lg:w-14 rounded-md'>&nbsp;</p>
                                </td>
                                <td className='hidden lg:table-cell p-4'>
                                    <p className='bg-black/15 w-10 lg:w-14 rounded-md'>&nbsp;</p>
                                </td>

                                <td>
                                    <div className='flex gap-2 items-center justify-center'>

                                        <p className='h-8 w-8 flex items-center justify-center rounded-md text-white p-2 bg-black/15 hover:cursor-pointer'>
                                            <FaPencilAlt />
                                        </p>
                                        <p className='h-8 w-8 flex items-center justify-center rounded-md text-white p-2 bg-black/15 hover:cursor-pointer'>
                                            <FaTrash />
                                        </p>

                                    </div>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <div className='py-2 px-4 flex items-center justify-between border-t border-t-secondary/60'>

                    <p className='block'> {t('page')} 0 {t('of')} 0 {t('of')} 0 {t('creatures')}</p>

                    <div className='flex gap-2'>
                        <button
                            className='py-1.5 px-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300'
                        >
                            <MdNavigateBefore size={20} />
                        </button>
                        <button
                            className='py-1.5 px-2 rounded-md text-white bg-primary hover:bg-secondary disabled:bg-gray-300'
                        >
                            <MdNavigateNext size={20} />
                        </button>
                    </div>

                </div>

            </div>

        </section >



    )
}

export default LoadingCreaturesList