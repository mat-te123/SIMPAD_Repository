
function TeamCard({ProfilePic,Name,Role}) {
    return (
        <div className="flex flex-col justify-center items-center">
            {ProfilePic === "" ? (
                <div className="w-40 h-40 bg-gray-500 flex items-center justify-center rounded-full">
                    <p className="text-[white] text-xl">
                        Photo
                    </p>
                </div>
            ) : (
                <img src={ProfilePic} alt="FotoTeam" className="w-40 h-40 rounded-full"/>
            )}
            <span>
                {Name}
            </span>
            <span>
                {Role}
            </span>

        </div>
    )
    
}

export default TeamCard;