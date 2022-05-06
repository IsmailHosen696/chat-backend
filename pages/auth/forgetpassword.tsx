import axios from 'axios';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function Forgetpassword() {
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<{ iserr: boolean, msg: string, success: boolean }>({ success: false, iserr: false, msg: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError({ ...error, iserr: false, success: false })
        if (!email) {
            setLoading(false)
            setError({ iserr: true, msg: "please provide a email address", success: false })
        }
        else {
            try {
                await axios.post("http://localhost:3001/auth/forgetpassword", { email }).then((res) => {
                    setError({ success: true, iserr: false, msg: res.data.msg })
                    setLoading(false)
                }).catch(err => {
                    setError({ success: false, iserr: true, msg: err.response.data.msg })
                    setLoading(false)
                })
            } catch (error: any) {
                console.log(error);
                setError({
                    success: false,
                    iserr: true, msg: error.message
                })
                setLoading(false)
            }
        }
    }
    return (
        <div className='w-full flex items-center justify-center'>
            <div className="mt-5 max-w-lg w-full border p-5 rounded-md">
                <h1 className='text-center text-xl font-semibold'>Forget password</h1>
                {
                    (error.iserr && !error.success) &&
                    <p className='py-2 w-full my-3 bg-red-400 px-1 rounded text-red-500 bg-opacity-30 text-center'>{error.msg}</p>
                }
                {
                    (!error.iserr && error.success) &&
                    <p className='py-2 w-full my-3 bg-green-400 px-1 rounded text-green-500 bg-opacity-30 text-center'>{error.msg}</p>
                }
                <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="email">Email</label>
                        <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" autoComplete='off' className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="email" />
                    </div>
                    <button disabled={loading} className='disabled:cursor-not-allowed disabled:bg-blue-300 w-full mt-5 py-2 bg-blue-500 text-white rounded text-md cursor-pointer'>sent</button>
                </form>
                <div className='w-full flex items-center'>
                    <Link href={'/auth/signin'}>
                        <a className='w-full mt-3 hover:underline text-center'>signin</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
