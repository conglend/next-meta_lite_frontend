import React, { ReactNode } from 'react'
import Head from 'next/head'
import '../styles/global.css'
import Dashboard from '../components/Dashboard'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'MetaSignals Lite App' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <div>
      {' '}
      <Provider store={store}>
        <ToastContainer />
        <Dashboard />
      </Provider>
    </div>
  </div>
)

export default Layout
