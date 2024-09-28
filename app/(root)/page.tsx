import { BentoGridDemo } from '@/components/card'
import { Nav } from '@/components/nav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
const Home = () => {
  return (
    <div>
      <Nav />
      <h1 className=' text-center  py-4 text-boldtext-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-wrap'>Welcome To RoNotBroYT's offical website</h1>
      <h2 className='text-center  py-4 text-4xl font-black text-wrap'>Here are some of the latest projects I'm working on</h2>
      <div className="flex justify-center space-x-4">
        <Button asChild className='bg-red-700 hover:bg-red-800 dark:text-white p-6 text-lg  opacity-60'>
          <Link href='https://www.youtube.com/@RoNotBroYT'>Youtube</Link>
        </Button>
        <Button asChild className='bg-blue-700 hover:bg-blue-800 dark:text-white p-6 text-lg  opacity-60'>
          <Link href='https://www.discord.gg/VDQQvPQHjN'>Discord</Link>
        </Button>
      </div>
      <br />
      <h1 className=' text-center  py-4 text-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-wrap'>Projects</h1>
      <BentoGridDemo />
    </div>
  )
}

export default Home