import Projectcard from "../ReuseableComponents/ProjectCard";
import React, { useState, useMemo } from 'react';
import {
    Button, Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@heroui/react";

function ProjectContent({data}) {

    const FilterIcon = '/settings-alt.svg';
    const FIlterIcon2 = '/ArrowDown.svg';
    const PlaceHolder = '/PlaceHolder.svg';

    const [ActiveTab, setTab] = useState("PAD1");
    const [SelectedKeys, setSelectedKeys] = useState(new Set(["New"]));

    const SelectedValue = useMemo(
        () => Array.from(SelectedKeys).join(",").replace(/_/g, ""),
        [SelectedKeys],
    )

    const handleClick = (tab) => {
        setTab(tab)
    }



    return (
        <div id="Konten-Utama" className="w-full px-10">
            {/* bagian filter */}
            <div id="Filter-Option" className="flex flex-row justify-between items-center">
                <div id="Filter" className="flex flex-row gap-5">   
                    <Dropdown>
                        <DropdownTrigger>
                            <Button id="filter_2" className="border-1 border-[#BBBBBB] bg-[#FFFFFF] px-[20px] py-[12px] text-[#044645]"
                                endContent={<img src={FIlterIcon2} alt="Icon Filter 2" height='15' width='15' />}
                                radius="sm">
                                {SelectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Sigle Selection"
                            selectedKeys={SelectedKeys}
                            selectionMode="single"
                            onSelectionChange={setSelectedKeys}
                            >
                            <DropdownItem key="New" className={` ${SelectedValue === "New" ? "text-[#044645]" : "text-[#BBBBBB]"} `}>New</DropdownItem>   
                            <DropdownItem key="A-Z" className={` ${SelectedValue === "A-Z" ? "text-[#044645]" : "text-[#BBBBBB]" }`}>A-Z</DropdownItem>   
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div
                    id="Option-PAD1"
                    className="flex flex-row items-center border-b-4 border-[#D9D9D9] w-[70%] gap-5"
                >
                    <div>
                        <span
                            id="PAD1"
                            onClick={() => handleClick("PAD1")}
                            className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-1 after:rounded-full after:transition-alll after:duration-300 after:ease-in-out hover:font-bold transition-all duration-300 ease-in-out 
          ${ActiveTab === "PAD1" ? "after:bg-[#088B89]" : "after:bg-[#D9D9D9]"}
          ${ActiveTab === "PAD1" ? "font-bold" : "font-normal"}`}
                        >
                            PAD 1
                        </span>
                    </div>

                    <div>
                        <span
                            id="PAD2"
                            onClick={() => handleClick("PAD2")}
                            className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-1 after:rounded-full hover:font-bold transition-all duration-300 ease-in-out 
          ${ActiveTab === "PAD2" ? "after:bg-[#088B89]" : "after:bg-[#D9D9D9]"}
          ${ActiveTab === "PAD2" ? "font-bold" : "font-normal"}`}
                        >
                            PAD 2
                        </span>
                    </div>
                </div>
            </div>
            <div className={`flex flex-row flex-wrap py-7 gap-4 items-center
                ${data && data.length === 0 ? "h-[150px] justify-center" : "justify-between"}`}>
                {/* Card Project */}
                {data && data.length > 0 ? (
                    data.map((project) => ( 
                        <Projectcard
                            key={project.id}
                            title={project.title}
                            imageSource={project.cover_image_url || PlaceHolder}></Projectcard>
                    ))) : (
                        <p className="text-center text-red-500 text-3xl">
                            Still on development, no projects found
                        </p>
                    )
                }
            </div>
        </div>
    )

}

export default ProjectContent;