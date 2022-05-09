import React from 'react'
import { SearchIcon, HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function Blocks() {
    const router = useRouter()
    return (
        <div className='w-20 h-full' style={{ backgroundColor: "#202225" }}>
            <div className='w-full gap-3 flex items-center h-full flex-col p-2'>
                <div onClick={() => router.push("/")} title='home' className={`${router.pathname === '/' ? "rounded-xl bg-opacity-100" : "rounded-full"} blockicon bg-opacity-10 group bg-green-400 hover:rounded-xl hover:cursor-pointer hover:bg-opacity-100`}>
                    <HomeIcon className={`w-5 h-5 ${router.pathname === '/' ? "text-black" : "text-gray-200 "} group-hover:text-black`} />
                </div>
                <div className='w-full h-1 bg-gray-700 rounded-full'></div>
                <div onClick={() => router.push("/search/people")} title='search new people' className={`${router.pathname === '/search/people' ? "rounded-xl bg-opacity-100" : "rounded-full"} blockicon bg-opacity-10 group bg-green-400 hover:rounded-xl hover:cursor-pointer hover:bg-opacity-100`}>
                    <SearchIcon className={`w-5 h-5 ${router.pathname === '/search/people' ? "text-black" : "text-gray-200 "} group-hover:text-black`} />
                </div>
            </div>
        </div>
    )
}
