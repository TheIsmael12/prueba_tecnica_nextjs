import Link from 'next/link'

export default function NotFound() {

    return (

        <section className='h-screen flex justify-center items-center'>

            <div className='py-8 px-4'>

                <div className='my-auto text-center space-y-8'>

                    <h1 className='text-7xl tracking-tight font-extrabold lg:text-9xl text-primary'>
                        404
                    </h1>

                    <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl'>
                        Página no encontrada
                    </p>

                    <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
                        Lo sentimos, no pudimos encontrar la página que estás buscando. Por favor, verifica la URL o regresa a la página principal.
                    </p>
                    
                    <div>
                        <Link href='/'
                            className='py-2 px-4 rounded-md text-white bg-primary hover:bg-secondary'>
                            Volver a la pagina principal
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    )

}