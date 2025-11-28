import { Input, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo.js";
import { useEffect, useState } from "react";

// Auth File
import { useAuth } from "../../context/AuthContext.jsx";

// CSS
import "./navbar.css"


function navbar({title, isSearchbar}) {
    const logo = '/sim.svg';
    const search = '/SearchIcon.svg';
    const navigate = useNavigate();

    // Auth Context Local data
    const { User, Token, LogOut } = useAuth();

    useEffect(() => {
        const fetchMahasiswaName = async () => {
            if (User){
                try {
                    const result = await AccountInfo.getUserById(User);
                    setMahasiswaName(result.username);
                } catch (error) {
                    console.error("Error fetching Mahasiswa name:", error);
                    
                }
            }else{
                console.log("No User logged in");
                setMahasiswaName('');
            }
        };
        fetchMahasiswaName();
    }, [User])

    // API data
    const [MahasiswaName,setMahasiswaName] = useState('');

    console.log("Navbar Mahasiswa Name:", MahasiswaName);
    
    


    
    console.log("Navbar User:", User);
    console.log("Navbar Token:", Token);

    const LogOutHandle = () => {
        LogOut();
        navigate('/login');
    }

    const LoginButton = () => {
        navigate('/login');
    }

    return (
        <div className="flex items-center justify-between gap-5 h-[80px] w-full px-10 py-2">
            <div className="flex items-center">
                <img src={logo} alt="Logo SimPAD" width='44' height='44' />
            </div>
            {/* ini input+nav+tombol */}
            <div className="flex items-center justify-items-start gap-10 w-[80%]">
                <div className={`${isSearchbar ? "flex" : "hidden"}`}>
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
                {Token ? (
                    <>
                    <Button onPress={LogOutHandle} color="danger">Log Out</Button>
                    <h1> Hello {MahasiswaName}</h1>
                    </>
                ) : (
                    <>
                        <Button
                            size="md"
                            className="LoginButton drop-shadow-md"
                            onPress={LoginButton}
                        >Log In
                        </Button>
                    </>
                )}
            </div>
        </div>
    )

}

export default navbar