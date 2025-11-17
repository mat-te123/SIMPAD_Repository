import { Button } from "@heroui/react"
import AuthTemplate from "../Template/AuthTemplate"
import { useState } from "react"
import Google from '../Logic/LoginViaGoogle'


function LoginWithGoogle() {

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
        <AuthTemplate title="Log In">
            <div className="flex items-center w-full h-[400px]">
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

            </div>
        </AuthTemplate>
    )

}

export default LoginWithGoogle