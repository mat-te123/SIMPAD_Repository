import './AuthTemplate.css'
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import React, { useState, useEffect } from 'react';

// logic 
import Google from '../Logic/LoginViaGoogle'



function AuthTemplate({ children, title }) {
    // const isLogin = title === "Log In";
    // const isEmail = title === "Find by Email";
    // const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    // const googlelogin = Google();

    // Assistive Mode Toggle
    const [isBorder,setBorder] = useState(true);

    function Assist(){
        setBorder(!isBorder);
        document.documentElement.classList.toggle("assist", !isBorder);
    }


    // const handleLogin = async () => {
    //     setIsLoading(true);
    //     googlelogin();
    //     setTimeout(() =>
    //         setIsLoading(false),
    //         3000);
    // };



    return (
        <div className="AuthTemplate-container bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)]">
            <div className='fixed z-100 top-0 left-0 py-6 px-5'>
                <button className='bg-red-600 p-2 rounded-xl text-white cursor-pointer font-bold hover:bg-red-700' onClick={Assist}>
                    {isBorder ? "Disable Assist" : "use Assist"}
                </button>
            </div>
            <div className="AuthTemplate-component">
                <div className='Content'>
                    <h2>{title}</h2>
                    {children}
                </div> 
                    <div className='Image-Place-Holder'>
                        <img src="./public/LOGO.png" alt="gambar"/>
                    </div>
            </div>
        </div>
    )
}

export default AuthTemplate;
// End of file: frontend/src/component/AuthTemplate.jsx
