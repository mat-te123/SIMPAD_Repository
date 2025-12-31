import MainTemplate from "../Template/MainTemplate";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/react";
import MahasiwaCard from "../ReuseableComponents/MahasiswaCard";
import AccountInfo from "../Logic/AccountInfo";
import { useState, useEffect, useMemo } from "react";

function Mahasiswa() {
  const filter = "/settings-alt.svg";
  const ArrowDwn = "/ArrowDown.svg";
  const currentyear = ((new Date().getFullYear() - 1) % 100).toString();

  const [data, setData] = useState([]);
  const [FilterAngkatan, setFilterAngkatan] = useState(new Set(["All"]));
  const [SelectedKeys, setSelectedKeys] = useState(new Set(["New"]));

  const filterAngkatan = useMemo(
    () => Array.from(FilterAngkatan).join(",").replace(/_/g, ""),
    [FilterAngkatan]
  );

  const SelectedValue = useMemo(
          () => Array.from(SelectedKeys).join(",").replace(/_/g, ""),
          [SelectedKeys],
      )

  useEffect(
    (filter, sort) => {
      async function fetchData() {
        const result = await AccountInfo.getAllUser(filterAngkatan, SelectedValue);
        setData(result);
      }
      fetchData();
    },
    [FilterAngkatan, SelectedKeys]
  );

  console.log("Mahasiswa Data:", data);

  return (
    <MainTemplate title="Mahasiswa" isSearchbar={true} SearchData={data} >
      <div className="flex flex-col px-60 py-30 justify-center items-center gap-10">
        {/* Bagian Header */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-[#017777] font-bold text-6xl mb-2">
            Mahasiswa PAD TRPL
          </h1>
          <h2 className="text-[#606060] font-light text-1xl">
            Meet our team who work behind TRPL's PAD.
          </h2>
        </div>
        {/* Bagian filter */}
        <div className="w-full flex flex-row justify-start items-center">
          <Dropdown shouldBlockScroll={false}>
            <DropdownTrigger>
              <Button
                className="border-1 border-[#BBBBBB] bg-[#FFFFFF] px-[20px] py-[12px] text-[#044645] mr-4 "
                color="neutral"
                radius="sm"
                startContent={
                  <img src={filter} alt="Filter Icon" width="20" height="20" />
                }
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Single Selection"
              selectedKeys={FilterAngkatan}
              selectionMode="single"
              onSelectionChange={setFilterAngkatan}
            >
              <DropdownSection title="Angkatan">
                <DropdownItem
                  key="All"
                  className={` ${
                    FilterAngkatan === "All"
                      ? "text-[#044645]"
                      : "text-[#BBBBBB]"
                  } `}
                >
                  All
                </DropdownItem>
                <DropdownItem
                  key="20"
                  className={` ${
                    FilterAngkatan === "20"
                      ? "text-[#044645]"
                      : "text-[#BBBBBB]"
                  } `}
                >
                  2020
                </DropdownItem>
                <DropdownItem
                  key="2021"
                  className={` ${
                    FilterAngkatan === "21"
                      ? "text-[#044645]"
                      : "text-[#BBBBBB]"
                  } `}
                >
                  2021
                </DropdownItem>
                <DropdownItem
                  key="22"
                  className={` ${
                    FilterAngkatan === "22"
                      ? "text-[#044645]"
                      : "text-[#BBBBBB]"
                  } `}
                >
                  2022
                </DropdownItem>
                <DropdownItem
                  key="23"
                  className={` ${
                    FilterAngkatan === "23"
                      ? "text-[#044645]"
                      : "text-[#BBBBBB]"
                  } `}
                >
                  2023
                </DropdownItem>
                <DropdownItem
                  key={currentyear}
                  className={` ${
                    FilterAngkatan === currentyear
                      ? "text-[#044645]"
                      : "text-[#BBBBBB]"
                  } `}
                >
                  {`20${currentyear}`}
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Dropdown shouldBlockScroll={false}>
            <DropdownTrigger>
              <Button
                id="filter_2"
                className="border-1 border-[#BBBBBB] bg-[#FFFFFF] px-[20px] py-[12px] text-[#044645]"
                endContent={
                  <img
                    src={ArrowDwn}
                    alt="Icon Filter 2"
                    height="15"
                    width="15"
                  />
                }
                radius="sm"
              >
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
              <DropdownItem
                key="New"
                className={` ${
                  SelectedValue === "New" ? "text-[#044645]" : "text-[#BBBBBB]"
                } `}
              >
                New
              </DropdownItem>
              <DropdownItem
                key="A-Z"
                className={` ${
                  SelectedValue === "A-Z" ? "text-[#044645]" : "text-[#BBBBBB]"
                }`}
              >
                A-Z
              </DropdownItem>
              <DropdownItem
                key="Z-A"
                className={` ${
                  SelectedValue === "Z-A" ? "text-[#044645]" : "text-[#BBBBBB]"
                }`}
              >
                Z-A
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* Bagian Card Mahasiswa */}
        <div className="grid grid-cols-4 gap-10 w-full">
          {data && data.length > 0 ? (
            data.map((mahasiswa) => (
              <MahasiwaCard
                key={mahasiswa.user_id}
                id={mahasiswa.user_id}
                name={mahasiswa.username}
                imageSrc={mahasiswa.profile_picture}
                angkatan={mahasiswa.angkatan}
              />
            ))
          ) : (
            <p>No mahasiswa data available.</p>
          )}
        </div>
      </div>
    </MainTemplate>
  );
}

export default Mahasiswa;
