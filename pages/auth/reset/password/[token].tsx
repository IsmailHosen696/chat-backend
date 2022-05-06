import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function Token({ token }: { token: string }) {
    const [error, setError] = useState<{ iserr: boolean, msg: string, success: boolean }>({ success: false, iserr: false, msg: "" })
    const [loading, setLoading] = useState(false)
    const [passwords, setPasswords] = useState<{ pass: string, cpass: string }>({ pass: "", cpass: "" })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError({ ...error, iserr: false, success: false })
        if (!passwords.cpass || !passwords.pass) {
            setLoading(false)
            setError({ success: false, iserr: true, msg: "please fill all the field carefully" })
            return
        }
        else if (passwords.pass.length < 6) {
            setLoading(false)
            setError({ success: false, iserr: true, msg: "password length must be greater than 6 charecter" })
            return
        }
        else if (passwords.cpass !== passwords.pass) {
            setLoading(false)
            setError({ success: false, iserr: true, msg: "password and confirm password are not matching" })
            return
        }
        else {
            try {
                await axios.patch("http://localhost:3001/auth/reset/pass", { password: passwords.pass, token }).then((res) => {
                    setError({ success: true, iserr: false, msg: res.data.msg })
                    setLoading(false)
                }).catch(err => {
                    console.log(err);
                    setError({
                        success: false,
                        iserr: true, msg: err.response.data.msg
                    })
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
                        <label className='text-md mb-2' htmlFor="password">Password</label>
                        <input value={passwords.pass}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswords({ ...passwords, pass: e.target.value })}
                            type="password" autoComplete='off'
                            className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="password" />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <label className='text-md mb-2' htmlFor="cpassword">Confirm Password</label>
                        <input value={passwords.cpass}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswords({ ...passwords, cpass: e.target.value })}
                            type="password" autoComplete='off'
                            className='w-full px-3 py-2 text-md border-gray-100 focus:border-blue-500 rounded-lg border-2 outline-none' id="cpassword" />
                    </div>
                    <button disabled={loading} className='disabled:cursor-not-allowed disabled:bg-blue-300 w-full mt-5 py-2 bg-blue-500 text-white rounded text-md cursor-pointer'>Reset</button>
                </form>
                <div className='w-full flex items-center'>
                    <Link href={'/auth/signin'}>
                        <a className='w-full mt-3 hover:underline text-center'>Signin</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.query.token
    return {
        props: {
            token
        }
    }
}