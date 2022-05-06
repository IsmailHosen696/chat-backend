import axios from 'axios';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { usertype } from '../../types'

export default function Signup() {
    const [userdata, setUserdata] = useState<usertype>({ email: "", username: "", password: "" })
    const [cPassword, setCPassword] = useState("");
    const [msg, setMsg] = useState<{ isError: boolean, msg: string, success: boolean }>({ isError: false, msg: "", success: false })
    const [isloading, setIsloading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMsg({ ...msg, isError: false, success: false })
        setIsloading(true)
        if (!userdata.username) {
            setIsloading(false)
            setMsg({ success: false, isError: true, msg: "please provide a username" })
            return
        }
        else if (userdata.username.length < 3 || userdata.username.length > 10) {
            setIsloading(false)
            setMsg({ success: false, isError: true, msg: "username must be between 3 and 10 charecter" })
            return
        }
        if (!userdata.email) {
            setIsloading(false)
            setMsg({ success: false, isError: true, msg: "please provide a email address" })
            return
        }
        else if (!userdata.password) {
            setIsloading(false)
            setMsg({ success: false, isError: true, msg: "please provide a password" })
            return
        }
        else if (userdata.password.length < 6) {
            setIsloading(false)
            setMsg({ success: false, isError: true, msg: "password length must be greater than 6 charecter" })
            return
        }
        else if (userdata.password !== cPassword) {
            setIsloading(false)
            setMsg({ success: false, isError: true, msg: "password and confirm password must be same" })
            return
        }
        else {
            await axios.post(`http://localhost:3001/auth/register`, { userdata })
                .then(() => {
                    setIsloading(false)
                    setMsg({ isError: false, success: true, msg: `We sent a mail to your gmail (${userdata.email}) . check that for further instrunctions` })
                })
                .catch((err) => {
                    setIsloading(false)
                    setMsg({ success: false, isError: true, msg: err.response.data.msg })
                })
        }
    }
    return (
        <div className='w-full flex items-center justify-center'>
            <div className="mt-5 max-w-lg w-full border p-5 rounded-md">
                <h1 className='text-center text-xl font-semibold'>Create a new accouont to start chating with your signedin friends</h1>
                {
                    (msg.isError && !msg.success) &&
                    <p className='py-2 w-full my-3 bg-red-400 px-1 rounded text-red-500 bg-opacity-30 text-center'>{msg.msg}</p>
                }
                {
                    (!msg.isError && msg.success) &&
                    <p className='py-2 w-full my-3 bg-green-400 px-1 rounded text-green-500 bg-opacity-30 text-center'>{msg.msg}</p>
                }
                <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="username">Username</label>
                        <input value={userdata.username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserdata({ ...userdata, username: e.target.value })} type="text" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="username" />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="email">Email</label>
                        <input value={userdata.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserdata({ ...userdata, email: e.target.value })} type="email" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="email" />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="password">Password</label>
                        <input value={userdata.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserdata({ ...userdata, password: e.target.value })} type="password" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="password" />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="cpassword">Confirm Password</label>
                        <input value={cPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setCPassword(e.target.value)} type="password" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="cpassword" />
                    </div>
                    <button disabled={isloading} className='disabled:cursor-not-allowed disabled:bg-blue-300 w-full mt-5 py-2 bg-blue-500 text-white rounded text-md cursor-pointer'>Create your account</button>
                </form>
                <div className='w-full flex items-center'>
                    <Link href={'/auth/signin'}>
                        <a className='w-full mt-3 hover:underline text-center'>Already have an account ? signin</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
