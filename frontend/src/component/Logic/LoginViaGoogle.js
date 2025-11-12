import { useGoogleLogin } from '@react-oauth/google';
import axios, { Axios } from "axios";
import { useState } from 'react';
import  Check  from './AccountCheck';
import { useNavigate } from 'react-router-dom';

export default function LoginGoogle() {

    const navigate = useNavigate()


    const handleTrue = async (tokenResponse) => {
        console.log('berhasil dengan token', tokenResponse);

        const userinfo = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
            },
        });

        const email = userinfo.email;

        try {
            const data = await Check(email);
            if (data === true){
                navigate('/demo')
            }
        } catch{
            return false
        }
    }

    const handleFalse = (error) => {
        console.log('login failed:', error);
    }
    
    
    
    
    const login = useGoogleLogin({
        onSuccess: handleTrue,
        onError: handleFalse,
        scope: 'openid profile email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    });

    return login
    
}

