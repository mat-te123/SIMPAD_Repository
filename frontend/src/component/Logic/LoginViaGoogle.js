import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import Check from './AccountCheck';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// 1. Accept the onLoginError prop
export default function LoginGoogle({ onLoginError }) {
    
    const { setToken, setUser, setUserCompleteData, setIsAdmin } = useAuth();
    const navigate = useNavigate();

    const handleTrue = async (tokenResponse) => {
        try {
            // ... (Google User Info fetching code) ...
            const userinfo = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },  
            });
            const email = userinfo.data.email;

            // 2. Call Check. 
            // Thanks to Step 1, ServerResponse will contain the error object if it failed.
            const ServerResponse = await Check(email);

            console.log("Full Server Response:", ServerResponse);

            // 3. Logic to handle Success vs Error
            if (ServerResponse.status === "success") {
                // SUCCESS LOGIC
                setToken(ServerResponse.authorisation.token);
                setUser(ServerResponse.user.user_id);
                setUserCompleteData(ServerResponse.user);   
                setIsAdmin(ServerResponse.isAdmin);
                navigate("/");
            } else {
                // ERROR LOGIC
                // This catches: "Login is only available for @mail.ugm.ac.id..."
                const errorMsg = ServerResponse.message || "Unknown error occurred";
                
                // Send this message back to the UI
                if (onLoginError) {
                    onLoginError("Login Failed", errorMsg);
                }
            }

        } catch(error){
            console.error(error);
            if (onLoginError) onLoginError("System Error", "Something went wrong.");
        }
    }

    // ... (rest of the file)
    const login = useGoogleLogin({
        onSuccess: handleTrue,
        // ...
    });

    return login;
}