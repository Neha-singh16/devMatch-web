import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
   <>
   <Navbar />
   <Outlet />
   <Footer />
   </>
  )
}

export default Body