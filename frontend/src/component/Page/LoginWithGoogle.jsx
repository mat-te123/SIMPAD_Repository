import { Button } from "@heroui/react"
import AuthTemplate from "../Template/AuthTemplate"
import { useState } from "react"
import Google from '../Logic/LoginViaGoogle'
import { useNavigate } from "react-router-dom"


function LoginWithGoogle() {
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

    const handleLoginGuest = async () => {
        setIsLoading(true);
        setTimeout(() =>{
            setIsLoading(false);
            navigate('/');
        },3000);
        
    };

    return (
        <AuthTemplate title="Log In">
            <div className="flex flex-col items-center justify-center gap-10 w-full h-[400px]">
                <Button
                    className='w-full font-bold'
                    variant='bordered'
                    isLoading={isLoading}
                    onPress={handleLogin}
                >
                    {isLoading
                        ? "Loading...."
                        : "Log In with Email UGM"}
                </Button>
                <Button
                    className='w-full font-bold'
                    variant='bordered'
                    isLoading={isLoading}
                    onPress={handleLoginGuest}
                >
                    {isLoading
                        ? "Loading...."
                        : "Log In as Guest"}
                </Button>

            </div>
        </AuthTemplate>
    )

}

export default LoginWithGoogle