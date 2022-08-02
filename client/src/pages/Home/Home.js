import React from 'react'
import background from './Vector.png'
import './style.css'

const Home = () => {
    return (
        <div>
            <div className="container">
                <div className="content">
                    <div className="welcome-message">
                        <span>Welcome</span>
                        <span>Login-Registration-Groups</span>
                        <span>project</span>
                    </div>
                    <img src={background} alt="background"/>
                </div>
            </div>
        </div>
    )
}

export default Home
