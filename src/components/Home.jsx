import React from 'react'
import Login from './Login'
import Search from './Search'
import Navbar from './Navbar'
import TreeList from './TreeList'

export default function Home() {

    const user = JSON.parse(localStorage.getItem('user'))
    const isLoggedIn =  user && user.token ? true : false

    return isLoggedIn ? (
        <div className='home'>
            <Navbar/>
            <Search/>
            <TreeList/>
        </div>
    )
    :
    (
        <Login/>
    )
}
