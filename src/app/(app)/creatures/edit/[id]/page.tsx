'use client'

import { useParams } from 'next/navigation'

import CreatureEdit from '@/components/Creatures/CreaturesEditPage'

const EditCreature = () => {

    const { id } = useParams() as { id: string }

    return (

        <CreatureEdit

            creatureId={id}

        />

    )

}

export default EditCreature