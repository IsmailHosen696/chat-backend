import React, { useEffect } from 'react'
import useGen from '../../contexts/useGen'
import { chatusertype } from '../../types'
import RecentChatUser from './RecentChatUser'

export const recentUser: chatusertype[] = [
    {
        _id: "",
        profile: "https://images.pexels.com/photos/843226/pexels-photo-843226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        email: "",
        username: "ismail hossain",
    },
    {
        _id: "",
        profile: "https://images.pexels.com/photos/843226/pexels-photo-843226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        email: "",
        username: "robert junior dr",
    },
    {
        _id: "",
        profile: "https://images.pexels.com/photos/843226/pexels-photo-843226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        email: "",
        username: "steve rogoure",
    },
    {
        _id: "",
        profile: "https://images.pexels.com/photos/843226/pexels-photo-843226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        email: "",
        username: "peter parker",
    },
]

export default function RecentChatUsers() {
    const { state } = useGen()

    return (
        <div className='w-full flex flex-col gap-2'>
            {
                recentUser.filter((value) => (state.searchtext !== "" || state.searchtext !== null) && value.username.includes(state.searchtext)).map((user, i) => <RecentChatUser user={user} key={i} />)
            }
        </div>
    )
}
