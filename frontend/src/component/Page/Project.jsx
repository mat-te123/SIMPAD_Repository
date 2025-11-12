import MainTemplate from "../Template/MainTemplate";
import Projectcard from "../ReuseableComponents/ProjectCard";
import { Input, Button } from "@heroui/react";
import Projectcontent from "./ProjectContent";


function ProjectPage() {

    const SearchIcon = "/SearchIcon.svg"
    const PlaceHolder = '/PlaceHolder.svg';
    const ArrowUp = '/ArrowUp.svg';
    const FilterIcon = '/settings-alt.svg'
    const FIlterIcon2 = '/ArrowDown.svg';



    return ( 
        <MainTemplate title="Project">
            {/* Konten Diatas */}
            <div className="w-full py-8 px-10 min-h-screen flex flex-row items-center justify-start bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)] bg-white">
                <div className="w-[50%] h-fit gap-10">
                    <div className="gap-5">
                        <h1 className="text-[80px] font-bold ">
                            Explore More Of <span className="bg-gradient-to-r from-[#044645] to-[#0AACAA] bg-clip-text text-transparent"> TRPL </span> <span className="bg-gradient-to-r from-[#044645] to-[#0AACAA] bg-clip-text text-transparent" >PAD Projects</span>  
                        </h1>
                        <h2 className="text-[18px] font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt facilis nihil labore sed obcaecati molestias consectetur, tempora, asperiores, praesentium nemo provident magnam. Ad deserunt illo tenetur quo ullam facere eius?
                        </h2>
                    </div>
                    <Input className="pt-10"
                    size="lg"
                    radius="xl"
                    placeholder="Search"
                        endContent={<img src={SearchIcon} alt="Logo Search" />}
                    />


                </div>

            </div>
            {/* Main Content */}
            <div className="bg-white">
                {/* Bagian Project Card */}
                <div className="pt-10">
                <Projectcontent/>
                </div>
                <div id="ButtonLoadMore-Up" className="relative w-full flex items-center justify-end px-10 py-10 ">
                    {/* Centered button */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <Button
                            size="lg"
                            radius="sm"
                            className="font-bold border-[#044645] bg-[#017777] text-white px-[28px] py-[18px]">
                            Explore More
                        </Button>
                    </div>

                    {/* Right-corner button */}
                    <Button
                        isIconOnly
                        className="border border-[#BBBBBB] bg-[#FFFFFF] text-white ">
                        <img src={ArrowUp} alt="LogoAtas" height='15' width='15' />
                    </Button>
                </div>
            </div>
        </MainTemplate>
    )

}

export default ProjectPage;