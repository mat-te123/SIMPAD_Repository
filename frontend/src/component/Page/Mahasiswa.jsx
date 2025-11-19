import MainTemplate from "../Template/MainTemplate";
import { Button } from "@heroui/react";
import MahasiwaCard from "../ReuseableComponents/MahasiswaCard";
import AccountInfo from "../Logic/AccountInfo";
import { useState, useEffect } from "react";

function Mahasiswa() {
  const filter = "/settings-alt.svg";
  const ArrowDwn = "/ArrowDown.svg";

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await AccountInfo.getAllUser();
      setData(result);
    }
    fetchData();
  }, []);

  console.log("Mahasiswa Data:", data);

  return (
    <MainTemplate title="Mahasiswa" isSearchbar={true}>
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
          <Button
            className="border-1 border-[#BBBBBB] bg-[#FFFFFF] px-[20px] py-[12px] text-[#044645] mr-4 "
            radius="sm"
            color="neutral"
            endContent={
              <img
                src={ArrowDwn}
                alt="Arrow Down Icon"
                width="12"
                height="12"
              />
            }
          >
            New
          </Button>
        </div>
        {/* Bagian Card Mahasiswa */}
        <div className="flex flex-wrap w-full items-start">
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
