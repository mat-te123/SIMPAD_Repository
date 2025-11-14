import { Input, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./navbar.css"


function navbar({title}) {
    const logo = '/sim.svg';
    const search = '/SearchIcon.svg';
    const color = "#3333334D"
    const navigate = useNavigate();

    const LoginButton = () => {
        navigate('/login');
    }

    const RegisterButton = () => {
        navigate('/register');
    }

    return (
        <div className="flex items-center justify-between gap-5 h-[80px] w-full px-10 py-2">
            <div className="flex items-center">
                <img src={logo} alt="Logo SimPAD" width='44' height='44' />
            </div>
            {/* ini input+nav+tombol */}
            <div className="flex items-center justify-items-start gap-10 w-[80%]">
                <div className={`${title === '/' ? "flex" : "hidden"}`}>
                    <Input
                        endContent={<img src={search} alt="Logo Search" width='36' height='36'></img>}
                        placeholder="search"
                        size="lg"
                        radius="full"
                        className="w-[500px] ">
                    </Input>
                </div>
                <nav className="flex gap-20 font-bold">
                    <Link to='/'>Home</Link>
                    <Link to='/Project'>Project</Link>
                    <Link to='/Mahasiswa'>Mahasiswa</Link>
                    <Link to='/About'>About</Link>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    size="md"
                    className="SignUpButton drop-shadow-md"
                    onPress={RegisterButton}
                >Sign Up
                </Button>
                <Button
                    size="md"
                    className="LoginButton drop-shadow-md"
                    onPress={LoginButton}
                >Log In
                </Button>
            </div>
        </div>
    )

}

export default navbar