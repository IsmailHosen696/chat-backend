import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Token({ token }: { token: string }) {
    const router = useRouter();
    function setCookie(name: string, value: string, days: number) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/;";
    }
    useEffect(() => {
        async function register() {
            try {
                await axios.post(`http://localhost:3001/auth/new/register/${token.split(" ")[1]}`).then((res) => {
                    setCookie("loggedinuser", `Bearer ${res.data.token}`, 10)
                    router.push("/")
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }
        register();
    })
    return (
        <div>Redirecting.....</div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = `Bearer ${context.query.token}`
    return {
        props: {
            token
        }
    }
}