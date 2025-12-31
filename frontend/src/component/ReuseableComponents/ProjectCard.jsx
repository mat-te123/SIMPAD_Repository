import { Button } from "@heroui/react"
import { useNavigate } from "react-router-dom"




function ProjectCard({id,image,name,title}) {
    const icon = '/ProjectIcon.svg'
    const buttonicon = '/IconButton.svg'
    const ukurantinggi ='100px'
    const ukuranlebar ='200px'
    const navigate = useNavigate();

    const ClickHandle = () => {
        console.log("Button Pressed");
        navigate('/Project/' + id);

    }

    return (
        <div className="relative flex flex-col items-center justify-end w-full h-[400px] overflow-hidden">
            <div className="cursor-pointer absolute bottom-15 p-5 bg-linear-to-t from-black/20 to transparant w-full h-full hover:flex flex-col items-start justify-end text-white font-thin text-md rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 truncate overflow-hidden text-ellipsis whitespace-nowrap"
            onClick={(e) => {
                navigate(`/Project/${id}`)
            }}>
                <h1>
                    {name + "'s project team"}
                </h1>
            </div>
            <img src={image} alt="gambar Project" className="object-cover flex-1 w-full rounded-lg overflow-hidden"/>
            <div className="flex flex-row items-center justify-between w-full pt-5 h-fit">
                <div className="flex flex-row items-center justify-start">
                    <img src={icon} alt="IconOrang" />
                    <span className="ml-1 text-[18px] font-semibold w-[150px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
                        {title}
                    </span>
                </div>
                <Button isIconOnly className="border-[#044645] bg-[#017777]" onPress={ClickHandle}>
                    <img src={buttonicon} alt="IconButton" height='15' width='15' />
                </Button>

            </div>
        </div>
    )
    
}

export default ProjectCard;