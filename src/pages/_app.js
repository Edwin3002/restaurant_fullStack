import NavbarLayout from '@/components/navigation/NavbarLayout'
import ReduxProvider from '@/redux/ReduxProvider'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css"

export default function App({ Component, pageProps }) {

  return (
    <div className="bg-primary-main" >
      <ReduxProvider>
        <Toaster position="bottom-right"/>
        <NavbarLayout />
        <hr className=" pb-20" />
        <Component  {...pageProps} />
      </ReduxProvider>
    </div>
  )
}
