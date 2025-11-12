
function TeamCard({ProfilePic,Name,Role}) {
    return (
        <div className="flex flex-col justify-center items-center">
            <img src={ProfilePic} alt="FotoTeam" />
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