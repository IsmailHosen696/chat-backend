import Image from 'next/image'
import React from 'react'
import { chatusertype } from '../../types'

export default function RecentChatUser({ user }: { user: chatusertype }) {
    return (
        <div className='flex cursor-pointer items-center gap-3 rounded-sm hoverNameColor transition-all duration-150 p-2 w-full'>
            <div className='relative w-8 h-8 rounded-full'>
                <Image priority src={user.profile as string} alt={`${user.username}'s profile`}
                    layout='fill' className='rounded-full' objectFit='cover' />
            </div>
            <div>
                <h1>{user.username}</h1>
            </div>
        </div>
    )
}
