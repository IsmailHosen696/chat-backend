import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { usertype } from '../../types';

export default function Signin() {
    const [userdata, setUserdata] = useState<usertype>({ email: "", username: "", password: "" })
    const [error, setError] = useState<{ iserr: boolean, msg: string }>({ iserr: false, msg: "" })
    const [loading, setLoading] = useState(false)

    function setCookie(name: string, value: string, days: number) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/;";
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError({ ...error, iserr: false })
        if (!userdata.email) {
            setLoading(false)
            setError({ iserr: true, msg: "please provide a email address", })
            return
        }
        else if (!userdata.password) {
            setLoading(false)
            setError({ iserr: true, msg: "please provide a password", })
            return
        }
        else {
            try {
                await axios.post("http://localhost:3001/auth/login", { userdata }).then((res) => {
                    setCookie("loggedinuser", `Bearer ${res.data.token}`, 5)
                    setLoading(false)
                }).catch(err => {
                    console.log(err);
                    setError({
                        iserr: true, msg: err.response.data.msg
                    })
                    setLoading(false)
                })
            } catch (error: any) {
                console.log(error);
                setError({
                    iserr: true, msg: error.message
                })
                setLoading(false)
            }
        }
    }
    return (
        <div className='w-full flex items-center justify-center'>
            <div className="mt-5 max-w-lg w-full border p-5 rounded-md">
                <h1 className='text-center text-xl font-semibold'>Welcome ! Signin to continue chating</h1>
                {
                    (error.iserr) &&
                    <p className='py-2 w-full my-3 bg-red-400 px-1 rounded text-red-500 bg-opacity-30 text-center'>{error.msg}</p>
                }
                <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="email">Email</label>
                        <input value={userdata.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserdata({ ...userdata, email: e.target.value })} type="email" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="email" />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="password">Password</label>
                        <input value={userdata.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserdata({ ...userdata, password: e.target.value })} type="password" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="password" />
                    </div>
                    <button disabled={loading} className='disabled:cursor-not-allowed disabled:bg-blue-300 w-full mt-5 py-2 bg-blue-500 text-white rounded text-md cursor-pointer'>Signin</button>
                </form>
                <div className='w-full flex items-center flex-col'>
                    <Link href={'/auth/signup'}>
                        <a className='w-full mt-3 hover:underline text-center'>Create a new account</a>
                    </Link>
                    <Link href={'/auth/forgetpassword'}>
                        <a className='w-full hover:underline mt-1 text-center'>Forget password ?</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
