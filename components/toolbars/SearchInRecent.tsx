import React, { ChangeEvent, useEffect, useRef } from 'react'
import useGen from '../../contexts/useGen';
import { Actions } from '../../types';

export default function SearchInRecent() {
    const searchRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        function keyeventfnc(e: KeyboardEvent) {
            if (e.key === "/") {
                searchRef.current?.focus();
            }
            return
        }
        window.addEventListener("keydown", keyeventfnc, { once: true })
        return () => {
            window.removeEventListener("keydown", keyeventfnc)
        }
    })
    const { action } = useGen()

    const changeEv = (e: ChangeEvent<HTMLInputElement>) => {
        action({ type: Actions.SEARCH_RECENT_TEXT, searchtext: e.target.value })
    }
    return (
        <div className='w-full'>
            <input onChange={changeEv} type="text" style={{ background: "#202225" }} ref={searchRef}
                placeholder="Find people"
                className='w-full py-1 px-4 bg-black text-gray-200 placeholder:text-gray-300 outline-none rounded-md' />
        </div>
    )
}
