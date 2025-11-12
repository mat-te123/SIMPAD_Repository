import { Button } from "@heroui/react"
import { useNavigate } from "react-router-dom"




function ProjectCard({id,image,name}) {
    const icon = '/ProjectIcon.svg'
    const buttonicon = '/IconButton.svg'
    const ukuran ='590px'
    const navigate = useNavigate();

    const ClickHandle = () => {
        console.log("Button Pressed");
        navigate('/UserProjectPage');

    }

    return (
        <div className="flex flex-col items-center justify-center w-fit">
            <img src={image} alt="gambar Project" height={ukuran} width={ukuran}/>
            <div className="flex flex-row items-center justify-between w-full pt-5">
                <div className="flex flex-row items-center justify-start">
                    <img src={icon} alt="IconOrang" />
                    <span className="ml-1 text-[18px] font-semibold">
                        {name}
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