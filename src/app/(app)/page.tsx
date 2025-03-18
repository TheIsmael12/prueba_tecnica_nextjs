'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Loader from '@/components/Loaders/Loader'

export default function Home() {

  const router = useRouter()

  useEffect(() => {

    router.replace('/creatures')

  }, [router])

  return (

    <div className='mt-60 flex justify-center items-center' >
      <Loader />
    </div >

  )

}