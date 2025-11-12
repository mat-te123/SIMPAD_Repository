import './AuthTemplate.css'
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import React, { useState, useEffect } from 'react';
import Login from '../Page/Login';

// logic 
import Google from '../Logic/LoginViaGoogle'



function AuthTemplate({ children, title }) {
    const isLogin = title === "Log In";
    const isEmail = title === "Find by Email";
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const googlelogin = Google();


    const handleLogin = async () => {
        setIsLoading(true);
        googlelogin();
        setTimeout(() =>
            setIsLoading(false),
            3000);
    };



    return (
        <div className="AuthTemplate-container bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)]">
            <div className="AuthTemplate-component">
                <div className='Content'>
                    <h2>{title}</h2>
                    {children}
                    <hr />
                    {isLogin ?
                        <div className='w-full'>
                            <Button
                                className='w-full font-bold'
                                variant='bordered'
                                isLoading={isLoading}
                                onPress={handleLogin}
                            >
                                {isLogin
                                    ? isLoading
                                        ? "Loading...."
                                        : "Log In with Email UGM"
                                    : null}
                            </Button>

                        </div>
                        :
                        null}


                    <div className='Sign-Up-Place-Holder'>
                        {isLogin ? <p>No account yet? <Link to="/register">Sign Up</Link></p> : null}
                        {!isLogin ? <p>Already have an account? <Link to="/login">Log in</Link></p> : null}
                    </div>
                </div>
                {!isEmail && (
                    <div className='Image-Place-Holder'>
                        {isEmail ? null : <img src="./public/LOGO.png" alt="gambar" />}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthTemplate;
// End of file: frontend/src/component/AuthTemplate.jsx
