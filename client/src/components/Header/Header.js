import React from 'react'
import {Link, useHistory} from "react-router-dom";
import logoImg from "./logo.png";
import "./style.css";
import firebase from "firebase/app";
import "firebase/auth";
import {removeToken} from "../../utils/cookies";

const Header = ({setStatus, status}) => {
    const {push} = useHistory();

    function logoClick() {
        push('/');
    }

    return (
        <div className="header">
            <div onClick={logoClick} className="logo">
                <div></div>
                <img src={logoImg} alt="logo"/>
            </div>
            <div className='navbar'>
                <ul className='navbar-nav'>
                    {status ?
                        <>
                            <li className='nav-item'>
                                <Link to='/userProfile' className='nav-link'>Profile</Link>
                            </li>
                            <li onClick={() => {
                                firebase.auth().signOut().then()
                                removeToken()
                                setStatus(false);
                            }} className='nav-item'>
                                <Link to='/' className='nav-link'>Log out</Link>
                            </li>
                        </>
                        :
                        <>
                            <li className='nav-item'>
                                <Link to='/login' className='nav-link'>Login</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/signup' className='nav-link'>Sign up</Link>
                            </li>
                        </>}
                </ul>
            </div>
        </div>
    )
}

export default Header
