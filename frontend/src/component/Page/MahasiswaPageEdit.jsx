import MainTemplate from "../Template/MainTemplate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo";
import { Button, Input } from "@heroui/react";

function MahasiswaPageEdit() {
  const { id } = useParams();

  // API data
  const [MahasiswaData, setMahasiswaData] = useState({});

  const angkatan = MahasiswaData.angkatan
    ? MahasiswaData.angkatan.split("/")[0]
    : "";

    

  useEffect(() => {
    async function fetchMahasiswaData() {
      // Fetch data for specific mahasiswa by id
      const result = await AccountInfo.getUserById(id);
      setMahasiswaData(result);
    }
    fetchMahasiswaData();
  }, [id]);

  console.log("Mahasiswa Detail Data:", MahasiswaData);

  return (
    <MainTemplate title="Mahasiswa Detail" isSearchbar={false}>
      {/* div utama */}
      <div className="h-fit w-full overflow-hidden flex flex-col">
        {/* div background image */}
        <div className="w-full h-[300px] overflow-hidden shrink-0">
          <img
            src={
              MahasiswaData.background
                ? MahasiswaData.background
                : "/PlaceHolder.svg"
            }
            alt="Background image"
            className="w-full object-cover h-full"
          />
        </div>
        {/* div content */}
        <div className="flex flex-col px-110 gap-20 relative">
          {/* Form Edit */}
          {/* Ini bagian Image */}
          <div className="absolute top-[-100px] z-48 left-0 w-full flex flex-col items-center justify-center ">
            {/* image utama */}
            <img
              src={
                MahasiswaData.profile_picture
                  ? MahasiswaData.profile_picture
                  : "/PlaceHolder.svg"
              }
              alt="Profile"
              className="h-50 w-50 rounded-full object-cover brightness-80"
            />
            {/* image kedua */}
            <Button
            variant="light"
            radius="full"
              isIconOnly
              className="absolute top-[0px] h-50 w-50 opacity-0 hover:opacity-100"
              startContent={
                <img
                  src="/UserInfo/camera.svg"
                  alt="Camera"
                  className=" h-25 w-25"
                />
              }
            />
          </div>
          <div className="flex flex-col mt-30 gap-5 mb-100">
            <div className="flex flex-col items-center justify-center gap-5">
              {/* Fullname */}
              <Input
                labelPlacement="outside-top"
                label="Full Name"
                placeholder={
                  MahasiswaData.username ? MahasiswaData.username : "Full Name"
                }
                onChange={(e) =>
                  setMahasiswaData({
                    ...MahasiswaData,
                    username: e.target.value,
                  })
                }
                size="lg"
                radius="lg"
              />
              {/* NIM */}
              <Input
                labelPlacement="outside-top"
                label="NIM"
                placeholder={MahasiswaData.nim ? MahasiswaData.nim : "NIM"}
                onChange={(e) =>
                  setMahasiswaData({ ...MahasiswaData, nim: e.target.value })
                }
                size="lg"
                radius="lg"
              />
              {/* Angkatan */}
              <Input
                labelPlacement="outside-top"
                disabled
                label="Angkatan"
                placeholder={
                  MahasiswaData.angkatan ? MahasiswaData.angkatan : "Angkatan"
                }
                value={angkatan}
                size="lg"
                radius="lg"
              />
              {/* Telephone */}
              <Input
                labelPlacement="outside-top"
                label="Phone Number"
                placeholder={
                  MahasiswaData.phone ? MahasiswaData.phone : "Phone Number"
                }
                onChange={(e) =>
                  setMahasiswaData({ ...MahasiswaData, phone: e.target.value })
                }
                size="lg"
                radius="lg"
              />
              {/* city */}
              <Input
                labelPlacement="outside-top"
                label="City"
                placeholder={MahasiswaData.city ? MahasiswaData.city : "City"}
                onChange={(e) =>
                  setMahasiswaData({ ...MahasiswaData, city: e.target.value })
                }
                size="lg"
                radius="lg"
              />
            </div>
            {/* Bagian Button */}
            <div className="flex flex-row">
              <Button
                className="font-bold border-[#044645] bg-[#017777] text-white px-[28px] py-[18px]"
                radius="sm"
              >
                Confirm
              </Button>
              <Button
                className="font-bold border-[#BBBBBB] bg-white text-black"
                radius="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}

export default MahasiswaPageEdit;
