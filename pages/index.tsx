import type { NextPage } from 'next'
import Head from 'next/head'
import Main from '../components/home/Main'
import { Navbar, Sidebar } from '../components/toolbars'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dischat</title>
        <meta name="description" content="Simple Chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-full h-full'>
        <div className="flex w-full">
          <div style={{ maxWidth: "250px", width: "100%", height: "100vh" }} className='w-full'>
            <Sidebar />
          </div>
          <div className='flex flex-col w-full h-full'>
            <div className='w-full'>
              <Navbar />
            </div>
            <div className="w-full">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
