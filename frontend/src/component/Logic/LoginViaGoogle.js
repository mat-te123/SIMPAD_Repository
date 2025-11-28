import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import  Check  from './AccountCheck';
import { useNavigate } from 'react-router-dom';

// AuthMethod
import { useAuth } from '../../context/AuthContext.jsx';

export default function LoginGoogle() {
    

    const { setToken, setUser } = useAuth(); // Ini buat ngambil function setToken dan setUser dari AuthContext ngambil data token dan user
    const navigate = useNavigate()


    const handleTrue = async (tokenResponse) => {
        console.log('berhasil dengan token', tokenResponse);

        const userinfo = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
            },  
        });

        const email = userinfo.data.email;
        console.log("User email:", email);
        

        try {
            const ServerResponse = await Check(email);
            const status = ServerResponse.status;
            const AuthData = ServerResponse.authorisation;
            console.log("Server response status:", status);
            console.log("Server response authorisation:", AuthData);
            console.log("Server response user:", ServerResponse.user);
            if (status === "success"){
                setToken(AuthData.token);
                setUser(ServerResponse.user.user_id);
                navigate("/");
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

