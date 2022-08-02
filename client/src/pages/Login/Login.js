import React, {useEffect, useState} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import {useHistory} from "react-router-dom";
import {setLoginDate, setToken} from '../../utils/cookies'
import {apiEndpoints, HEADERS} from "../../utils/constants";
import userServices from 'services/user'
import './style.css'

firebase.initializeApp({
    apiKey: "AIzaSyDXiSXKeQPOU-Rh4hmLEajccuyagCkvvk4",
    authDomain: "login-resgistration.firebaseapp.com",
    projectId: "login-resgistration",
    storageBucket: "login-resgistration.appspot.com",
    messagingSenderId: "1094922196415",
    appId: "1:1094922196415:web:f64e58ddfadb87c3d37d0a",
    measurementId: "G-HQ5Z0Q7YLR"
})

const Login = ({setStatus, isSigned, changeSigned}) => {
    const {push} = useHistory();
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState(false)

    const submit = async (event) => {
        event.preventDefault();
        const response = await userServices.login({
            userName: userName,
            password: password
        });

        console.log('\n\n\n response = ',response)
    }

    let uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    useEffect(() =>
            firebase.auth().onAuthStateChanged(user => {
                changeSigned(!!user)
                if (user) {
                    const date = new Date().getTime();
                    setLoginDate(date)
                    setStatus(true)
                    push('/userProfile');
                }
            })
        , [changeSigned, setStatus, push])

    return (
        <>
            <div>
                {isSigned ? (
                    <span></span>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>

            <div className="login-container">
                <form className="login-form" onSubmit={submit}>

                    <div className="login-form-group">
                        <input className="login-input" type="text" name="username" placeholder="username or email"
                               onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className="login-form-group">
                        <input className="login-input" type="password" name="password" placeholder="password"
                               onChange={event => setPassword(event.target.value)}/>
                    </div>

                    <div className="login-form-response">
                        <p>{value}</p>
                    </div>

                    <button type="submit" className="submit-login">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;

