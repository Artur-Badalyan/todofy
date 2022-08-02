import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {getLoginDate, getToken, removeToken} from "../../utils/cookies";
import {apiEndpoints, HEADERS} from "../../utils/constants";
import './style.css'

const UserProfile = ({setStatus, isSigned}) => {
    const {push} = new useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const token = getToken()

    useEffect(() => {
            const loginDate = getLoginDate()
            const dateNow = new Date().getTime();
            const dateLogout = 60 * 60;

            if ((dateNow - loginDate) / 1000 > dateLogout) {
                removeToken()
                setStatus(false)
                push('/');
            } else if (token) {
                fetch(apiEndpoints.USER_PROFILE, {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify({
                        token: token
                    })
                }).then(res => {
                    if (res.status === 400) {
                        removeToken()
                        setStatus(false)
                        push('/');
                    } else if (res.status === 200) {
                        res.json().then(body => {
                            setName(body.data.userName);
                            setEmail(body.data.email);
                        })
                    }
                }).catch(err => {
                    return err
                })
            }
        }, [push, setStatus, token]
    )

    return (
        <div>
            <div className="profile-content">
                <div className="profile-data">
                    {isSigned ? (
                        <>
                            <div className='social-profile'>
                                <img alt="profile-img" src={firebase.auth().currentUser.photoURL}/>
                                <span
                                    className='social-welcome'>Welcome {firebase.auth().currentUser.displayName}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="profile-data-group">
                                <span>Username</span>
                                <p>{name}</p>
                            </div>
                            <div className="profile-data-group">
                                <span>Email</span>
                                <p>{email}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;

