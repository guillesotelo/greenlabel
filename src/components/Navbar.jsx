import React from 'react'
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOutUser } from '../store/reducers/user'
import { voidTrees } from '../store/reducers/trees'
import { setNamedVoid } from '../store/reducers/named'

export default function Login() {

    const dispatch = useDispatch()
    const history = useHistory()
    const pbtn = history.location.pathname !== '/me' ? true : false
    const user = JSON.parse(localStorage.getItem('user'))
    const isLoggedIn =  user && user.token ? true : false

    const handleLog = () => {
        if(isLoggedIn) {
            dispatch(logOutUser())
            .then(() => dispatch(voidTrees()))
            .then(() => dispatch(setNamedVoid))
            .then(() => history.push('/login'))
        }else {
            history.push('/login')
        }
    }

    return (
        <div className='navbar'>
                <Link to='/' className='logo-btn'>
                <img 
                    className='logo'
                    src='https://i.postimg.cc/VLzC6HJc/gl-logo.png'
                    alt='Green Label'
                />
                </Link>
            {history.location.pathname === '/' && <h3 className='search-title'>Search trees and name them!</h3>}
                <div>
                    {isLoggedIn && pbtn &&
                        <button className="log-btn" onClick={()=> history.push('/me')}>PROFILE</button>
                    }
                    <button className="log-btn" onClick={handleLog}>{isLoggedIn ? 'LOGOUT' : 'LOGIN'}</button>
                </div>
        </div>
    )
}
