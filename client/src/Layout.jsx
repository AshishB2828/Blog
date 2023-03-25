import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const Layout = () => {
  return (
    <main style={{background: '#001E3C', minHeight: '100vh'}}>
        <Header />
        <div className='main-body'>
          <Outlet />
        </div>
    </main>
  )
}

export default Layout