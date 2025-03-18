import { useSession } from 'next-auth/react'

import Image from 'next/image'

const User = () => {

    const { data: session } = useSession()
    
    const isMaestro = session?.user?.role === 'Maestro'

    const imageSrc = isMaestro ? '/assets/master.webp' : '/assets/caretaker.webp'

    return (

        <>

            <div className='z-10 w-full h-full bg-primary/20 absolute top-0 left-0'></div>

            <Image
                src={imageSrc}
                alt='Maestro o Cuidador'
                className='z-0'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                style={{
                    objectFit: 'cover',
                }}
            />

        </>

    )

}

export default User