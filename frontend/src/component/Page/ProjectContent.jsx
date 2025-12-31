import Projectcard from "../ReuseableComponents/ProjectCard";
import React, { useState, useMemo, useEffect, use } from 'react';
import {
    Button, Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@heroui/react";

import { BackendURL } from "../../utils/axiosClient";


function ProjectContent({ ProjectData, ActiveTab, setTab, SelectedKeys, setSelectedKeys }) {

    const backendUrl = BackendURL;

    const FilterIcon = '/settings-alt.svg';
    const FIlterIcon2 = '/ArrowDown.svg';
    const PlaceHolder = '/PlaceHolder.svg';
    const Files = '/NotFoundContent/Files.svg';

    const SelectedValue = useMemo(
        () => Array.from(SelectedKeys).join(",").replace(/_/g, ""),
        [SelectedKeys],
    )

    console.log("Project Data in ProjectContent:", ProjectData);

    const handleClick = (tab) => {
        setTab(tab)
    }

    // ActivTab Filter


    return (
        <div id="Konten-Utama" className="w-full px-40 pt-20 pb-30">
            {/* bagian filter */}
            <div id="Filter-Option" className="flex flex-row justify-between items-center">
                <div id="Filter" className="flex flex-row gap-5">
                    <Dropdown shouldBlockScroll={false}>
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
                            <DropdownItem key="A-Z" className={` ${SelectedValue === "A-Z" ? "text-[#044645]" : "text-[#BBBBBB]"}`}>A-Z</DropdownItem>
                            <DropdownItem key="Z-A" className={` ${SelectedValue === "Z-A" ? "text-[#044645]" : "text-[#BBBBBB]"}`}>Z-A</DropdownItem>
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
                            className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-[6px] after:w-full after:h-1 after:rounded-full after:transition-alll after:duration-300 after:ease-in-out hover:font-bold transition-all duration-300 ease-in-out 
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
                            className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-[6px] after:w-full after:h-1 after:rounded-full hover:font-bold transition-all duration-300 ease-in-out 
          ${ActiveTab === "PAD2" ? "after:bg-[#088B89]" : "after:bg-[#D9D9D9]"}
          ${ActiveTab === "PAD2" ? "font-bold" : "font-normal"}`}
                        >
                            PAD 2
                        </span>
                    </div>
                </div>
            </div>
            <div className={`pt-[100px] gap-15
                ${ProjectData && ProjectData.length === 0 ? "h-fit justify-center" : "justify-center grid grid-cols-3"}`}>
                {/* Card Project */}
                {ProjectData && ProjectData.length > 0 ? (
                    ProjectData.map((project, index) => {
                        const manajer = project.users.find(user => user.pivot.role === 'Project Manager');
                        const displayUser = manajer ? manajer : project.users[0];
                        return (    
                        
                        <Projectcard
                            key={index}
                            id={project.project_id}
                            name={displayUser.username? displayUser.username : "Unknown User"}
                            image={project.cover_image_url ? `${backendUrl}storage/${project.cover_image_url}` : PlaceHolder}
                            title={project.title}
                                ></Projectcard>
                        );
                    })) : (
                    <div className="flex flex-row justify-center items-center gap-20 w-full">
                        <img src={Files} alt="Icon" width="250" height="250" />
                        <div className="flex flex-col items-start justify-center w-[500px]">
                            <h1 className={`text-[#0B1215] text-[36px] font-bold w-full`}>
                                No Projects Uploaded Yet
                            </h1>
                            <h2 className={`text-[#758694] text-[16px] font-medium w-[80%]`}>
                                There are currently no projects available.
                                If you'd like to upload or share a project, please login with UGM mail.
                            </h2>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )

}

export default ProjectContent;