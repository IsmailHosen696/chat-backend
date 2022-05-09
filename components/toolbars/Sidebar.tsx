import React from 'react'
import RecentChatUsers from '../chats/RecentChatUsers'
import SearchInRecent from './SearchInRecent'

export default function Sidebar() {
    return (
        <div className='w-full overflow-y-hidden flex h-full' style={{ background: "#2F3136", height: "100%", maxWidth: "280px" }}>
            <div className='w-full flex flex-col overflow-hidden'>
                <div className='w-full h-12 flex items-center justify-center p-3 shadow-md' >
                    <SearchInRecent />
                </div>
                <div className='flex overflow-y-auto flex-col w-full p-3 clh'>
                    <RecentChatUsers />
                </div>
            </div>
        </div>
    )
}
