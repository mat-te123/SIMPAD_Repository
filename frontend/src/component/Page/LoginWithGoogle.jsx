// LoginWithGoogle.jsx
import { Alert, Button } from "@heroui/react"
import AuthTemplate from "../Template/AuthTemplate"
import { useState } from "react"
import Google from '../Logic/LoginViaGoogle' // Ensure this path is correct
import { useNavigate } from "react-router-dom"

function LoginWithGoogle() {
    const navigate = useNavigate();
    const GoogleIcon = "/logo-google.svg"
    const HomeIcon = "/home-white.svg"

    const [isLoading, setIsLoading] = useState(false);
    const [errorTitle, setErrortitle] = useState("");
    const [errorDesc, setErrordesc] = useState("");

    // 1. Define the callback function to handle errors coming from the logic file
    const handleLoginError = (title, message) => {
        setErrortitle(title);
        setErrordesc(message);
        setIsLoading(false); // Stop loading animation
    };

    // 2. Pass the callback to your Logic function
    const googlelogin = Google({ onLoginError: handleLoginError });

    const handleLogin = async () => {
        // Clear previous errors
        setErrortitle("");
        setErrordesc("");
        
        setIsLoading(true);
        googlelogin();
        
    };

    const handleLoginGuest = async () => {
        setIsLoading(true);
        setTimeout(() =>{
            setIsLoading(false);
            navigate('/');
        }, 3000);
    };

    return (
        <AuthTemplate errorDesc={errorDesc} errorTitle={errorTitle}>
            <div className="flex flex-col items-start justify-center gap-10 w-full h-[400px]">
                <div>
                    <h1 className="text-4xl font-bold">
                        Log in
                    </h1>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Button
                        startContent={<img src={HomeIcon} alt="Home Icon" />}
                        className='w-full font-bold bg-[#017777] border-1 border-[#044645] text-white hover:bg-[#025555]'
                        variant='bordered'
                        isLoading={isLoading}
                        onPress={handleLoginGuest}
                    >
                        {isLoading ? "Loading...." : "Back to Home"}
                    </Button>
                    <hr />
                    <Button
                        startContent={<img src={GoogleIcon} alt="Google Icon" />}
                        className='w-full font-bold bg-[#DBE8E8] border-1 border-[#044645] text-black hover:bg-[#C3D6D6]'
                        variant='bordered'
                        isLoading={isLoading}
                        onPress={handleLogin}
                    >
                        {isLoading ? "Loading...." : "Log In with Email UGM"}
                    </Button>
                </div>
            </div>
        </AuthTemplate>
    )
}

export default LoginWithGoogle