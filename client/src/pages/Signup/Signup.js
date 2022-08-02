import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {apiEndpoints, HEADERS} from "../../utils/constants";
import SignupModal from '../../components/Modal/SignupModal'
import './style.css'

const Signup = () => {
    const {push} = useHistory();
    const [userName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [value, setValue] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const submit = (event) => {
        event.preventDefault();
        fetch(apiEndpoints.SIGNUP, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
            })
        }).then(res => {
            if (res.status === 200) {
                setIsOpen(true)
            } else {
                res.json().then(body => {
                    setValue(body.status)
                })
            }
        }).catch(err => {
            return err
        })
    }

    const signupModalOk = () => {
        setIsOpen(false);
        push('/login');
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
