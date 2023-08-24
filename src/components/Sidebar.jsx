import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {RxSketchLogo, RxPerson, RxDashboard} from 'react-icons/rx'

//bg-gradient-to-r from-slate-900 to-slate-700

const Sidebar = () => {
  return (
    <div className='w-45 rounded-md basis-2/12 px-4 pt-4 text-white bg-gradient-to-r from-dark-tremor-background to-dark-tremor-background-subtle'>
        <div className='flex flex-col items-start'>
            <Link href='/main' className='w-full'>
                <div className='flex  mt-5 hover:bg-blue-gray-200 hover:text-black rounded-lg p-2'>
                    <RxSketchLogo size={20}/>
                    <p className='px-5'>Dashboard Home</p>
                </div>
            </Link>
            <Link href='/main/upload' className='w-full'>
                <div className='flex mt-5 hover:bg-blue-gray-200 hover:text-black rounded-lg p-2'>
                    <RxDashboard size={20}/>
                    <p className='px-5'>Upload Data</p>
                </div>
            </Link>
            <Link href='/main/registration' className='w-full'>
                <div className='flex mt-5 hover:bg-blue-gray-200 hover:text-black rounded-lg p-2'>
                    <RxPerson size={20}/>
                    <p className='px-5'>Registration</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar