import React from 'react'
import TopNavbar from '../components/TopNavbar'
import BottomNavbar from '../components/BottomNavbar'
import HomePage from '../pages/HomePage'

const Home = () => {
  return (
    <div>
        <TopNavbar/>
        <HomePage/>
        <BottomNavbar/>
    </div>
  )
}

export default Home