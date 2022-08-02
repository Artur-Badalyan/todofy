import React from "react";
import './style.css';

const SignupModal = ({onOk, isOpen}) => {
    return (
        <>
            {isOpen && (
                <div>
                    <div className='modal'>
                        <div className='signup-modal-content'>
                            <p className='signup-modal-text'>You successfully registered</p>
                            <button onClick={onOk} className='signup-modal-button'><span>OK </span></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SignupModal
