import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import userServices from 'services/user';

import {apiEndpoints, HEADERS} from "../../utils/constants";
import SignupModal from '../../components/Modal/SignupModal'
import './style.css'

const Signup = () => {
    const history = useHistory();
    const [userName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [value, setValue] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const submit = async (event) => {
        event.preventDefault();
        const response = await userServices.signup({
            userName: userName,
            email: email,
            password: password
        });

        console.log('response = ',response)
    }

    const signupModalOk = () => {
        setIsOpen(false);
        history.push('/login');
    }

    return (
        <>
            <SignupModal isOpen={isOpen} onOk={signupModalOk}/>

            <div className="login-container">
                <form className="login-form" onSubmit={submit}>
                    <div className="login-form-group">
                        <input className="login-input" type="text" name="username" placeholder="username" required
                               onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className="login-form-group">
                        <input className="login-input" type="text" name="email" placeholder="email" required
                               onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className="login-form-group">
                        <input className="login-input" type="password" name="password" placeholder="password" required
                               onChange={event => setPassword(event.target.value)}/>
                    </div>

                    <div className="login-form-response">
                        <p>{value}</p>
                    </div>

                    <button type="submit" className="submit-login">
                        Sign up
                    </button>
                </form>
            </div>
        </>
    );
}

export default Signup;
