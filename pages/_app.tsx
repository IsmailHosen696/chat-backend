import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Navbar, Sidebar } from '../components/toolbars'
import { GenContextProvider } from '../contexts/useGen'
import Blocks from '../components/toolbars/Blocks'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    router.pathname.includes("auth") ?
      <GenContextProvider>
        <Component {...pageProps} />
      </GenContextProvider>
      :
      <GenContextProvider>
        <div style={{ background: "#36393F" }} className='h-screen text-gray-300 flex w-full overflow-hidden'>
          <Blocks />
          <div className='w-full'>
            <Component {...pageProps} />
          </div>
        </div>
      </GenContextProvider>
  )

}

export default MyApp
