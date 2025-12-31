import { useNavigate } from "react-router-dom";

function TeamCard({UserID, ProfilePic,Name,Role}) {
    const navigate = useNavigate();

    const ProfileHandleClick = () => {
        navigate(`/Mahasiswa/${UserID}`);
        console.log(`Clicked on ${Name}'s card`);
    }
    return (
        <div className="flex flex-col justify-center items-center gap-2 cursor-pointer group" onClick={ProfileHandleClick}>
            {ProfilePic === "" ? (
                <div className="w-40 h-40 bg-gray-500 flex items-center justify-center rounded-full">
                    <p className="text-[white] text-xl">
                        Photo
                    </p>
                </div>
            ) : (
                <img src={ProfilePic} alt="FotoTeam" className="w-40 h-40 rounded-full object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"/>
            )}
            <div className="flex flex-col justify-center items-center group-hover:underline ">
                <span className="font-bold">
                    {Name}
                </span>
                <span className="text-[#014848]"> 
                    {Role}
                </span>
            </div>
        </div>
    )
    
}

export default TeamCard;