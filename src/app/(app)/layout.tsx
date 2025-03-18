'use client'

import User from '@/components/Static/User'
import Navbar from '@/components/Static/Navbar'

import { SessionProvider } from 'next-auth/react'

export default function AppLayout({

    children,

}: Readonly<{

    children: React.ReactNode

}>) {

    return (

        <>

            <SessionProvider>

                <div className='w-full lg:flex'>

                    <div className='w-1/4 h-screen hidden lg:block relative'>

                        <User />

                    </div>

                    <div className='lg:w-3/4'>

                        <Navbar />

                        <main className='px-5 lg:px-10 py-10'>
                            {children}
                        </main>

                    </div>

                </div>

            </SessionProvider>
            
        </>

    )

}
