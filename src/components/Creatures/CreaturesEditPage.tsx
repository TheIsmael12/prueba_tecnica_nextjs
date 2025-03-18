'use client'

import { useEffect } from 'react'

import useUpdateCreatures from '@/hooks/Creatures/useUpdateCreatures'
import useGetCreature from '@/hooks/Creatures/useGetCreature'

import CreaturesEdit from './CreaturesEdit'

import Loader from '../Loaders/Loader'

interface CreatureEditPageProps {

    creatureId: string

}

const CreatureEditPage = ({ creatureId }: CreatureEditPageProps) => {

    const { updateCreatures, loadingUpdate, itsUpdated } = useUpdateCreatures()
    const { creature, getCreature, loadingCreature } = useGetCreature()

    useEffect(() => {

        getCreature(creatureId)

    }, [getCreature, creatureId, itsUpdated])

    return (


        <>

            {
                loadingCreature || !creature ? (

                    <div className='mt-60 flex justify-center items-center' >
                        <Loader />
                    </div >

                ) : (

                    <CreaturesEdit

                        creature={creature}
                        updateCreatures={updateCreatures}
                        loadingUpdate={loadingUpdate}

                    />

                )
            }


        </>



    )

}

export default CreatureEditPage