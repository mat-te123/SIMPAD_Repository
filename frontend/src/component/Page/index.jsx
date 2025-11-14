import MainTemplate from "../Template/MainTemplate";
import { Button } from "@heroui/react";
import Company from "../ReuseableComponents/Company";
import { useState, Fragment } from "react";
import Projectcontent from "./ProjectContent";
import "./index.css"

// API

import HomeApiData from "../Logic/HomeApiData";


function index() {

    const Arrow = '/Arrow.svg';
    const Test = '/Vector.svg';
    const PlaceHolder = '/PlaceHolder.svg';
    const ArrowUp = '/ArrowUp.svg';

    const [isActive, SetActive] = useState(true)

    function handleClick() {
        console.log("Button Press")
    }

    // API BACKEND
    const {CompanyData, ProjectData} = HomeApiData;

    return (
        <MainTemplate title='index'>
            {/* Bagian Atas */}
            <div id='Upper' className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)] bg-white">
                <div className="w-[1000px] flex flex-col items-center justify-center mb-[20px]">
                    <h1 className=" w-full  tracking-tight text-[93px] text-center font-bold bg-gradient-to-r from-[#044645] to-[#0AACAA] bg-clip-text text-transparent">
                        Temukan Beragam Proyek TRPL Disini !
                    </h1>
                    <h2 className="w-full text-center text-[18px] font-medium ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum mollitia pariatur iusto praesentium iure architecto. Praesentium, voluptatem quos? Cum voluptate aliquam repudiandae, voluptatem deserunt ipsam cupiditate architecto maxime enim nemo.
                    </h2>
                </div>
                <Button
                    className="w-[187px] h-[56px] py-[16px] px-[28px] text-[16px] font-bold border-1 border-[#044645] bg-[#017777] text-white"
                    endContent={<img src={Arrow} alt="Logo Arrow" width='24' height='24'></img>}
                    onPress={handleClick}

                >
                    Explore PAD
                </Button>
            </div>
            <div className="flex flex-col items-center justify-start min-h-screen w-full bg-white pt-20 gap-10">
                {/* text awal */}
                <div className="flex flex-col items-center w-full px-10">
                    <h1 className="text-[46px] font-semibold tracking-tighter">
                        Proyek Aplikasi Dasar
                    </h1>
                    <h2 className="text-[18px] font-medium text-center">
                        PAD adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent  pellentesque, turpis id feugiat consectetur, nisi justo ullamcorper  ligula, vitae rhoncus magna purus quis lacus. Sed vulputate diam non  lobortis finibus. Curabitur mollis sed dolor nec auctor. Aenean a risus  interdum purus sodales pellentesque. Curabitur aliquam diam eget quam  condimentum, ultricies sagittis lectus vulputate. Mauris pellentesque  ornare nisi, ut congue nisl luctus in. Suspendisse potenti. Donec  facilisis mollis risus at pellentesque. Curabitur bibendum felis at est  ultricies commodo.
                    </h2>
                </div>
                {/* LOGO Company infinte Scroll */}
                <div className="company-banner relative w-full overflow-hidden h-[98px]">
                    {CompanyData.length === 0 ? (
                        <p className="text-center text-red-500 text-3xl">
                            Still on development, no companies found
                        </p>
                    ) : (
                        <div className="company-wrapper flex gap-10 animate-scroll">
                        {[...Array(5)].map((_, i) => ( // repeat list 3x for smooth looping
                            <Fragment key={i}>
                                {CompanyData.map(({ logo, name }, index) => (
                                    <Company key={`${i}-${index}`} logo={logo} name={name} />
                                ))}
                            </Fragment>
                        ))}
                    </div>
                    )}
                </div>
                {/* Kontent utama termasuk */}
                <Projectcontent data={ProjectData} />
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
                        className="border border-[#BBBBBB] bg-[#FFFFFF] text-white "
                        as='a'
                        href="#Upper">
                        <img src={ArrowUp} alt="LogoAtas" height='15' width='15' />
                    </Button>
                </div>

            </div>



        </MainTemplate>
    )
}

export default index