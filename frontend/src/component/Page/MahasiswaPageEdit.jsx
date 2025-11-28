import MainTemplate from "../Template/MainTemplate";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { BackendURL } from "../../utils/axiosClient.js";


function MahasiswaPageEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const URL = BackendURL;

  // API data
  const [MahasiswaData, setMahasiswaData] = useState({});

  const angkatan = MahasiswaData?.nim
    ? MahasiswaData.nim.split("/")[0]
    : "";
  console.log("angkatan:", angkatan);
    

  useEffect(() => {
    async function fetchMahasiswaData() {
      // Fetch data for specific mahasiswa by id
      const result = await AccountInfo.getUserById(id);
      setMahasiswaData(result);
    }
    fetchMahasiswaData();
  }, [id]);

  // end of API

  // Handle Photo Change
  const HandlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const HandleSubmit = async () => {
    const formData = new FormData();

    formData.append("username", MahasiswaData.username);
    formData.append("nim", MahasiswaData.nim);
    formData.append("phone_number", MahasiswaData.phone_number);
    formData.append("address", MahasiswaData.address);
    if (MahasiswaData.profile_picture instanceof File) {
      formData.append("profile_picture", MahasiswaData.profile_picture);
    }
    const result = await AccountInfo.updateUser(id, formData);
    console.log("Update Result:", result);
    navigate(`/mahasiswa/${id}`);
  }

  const HandleCancel = () => {
    navigate(`/mahasiswa/${id}`);
  }

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
                MahasiswaData.profile_picture instanceof File
                  ? MahasiswaData.preview
                  : `${URL}storage/${MahasiswaData.profile_picture}`
              }
              alt="Profile"
              className="h-50 w-50 rounded-full object-cover brightness-80"
            />
            {/* image kedua */}
            <Button
            onPress={HandlePhotoClick}
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
            {/* ini input gambar */}
            <input 
            type="file"
            accept="image/*"
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setMahasiswaData(
                  { ...MahasiswaData, 
                    profile_picture: file,
                    preview: URL.createObjectURL(file) }
                )
              }
            }}
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
                  MahasiswaData.phone_number ? MahasiswaData.phone_number : "Phone Number"
                }
                onChange={(e) =>
                  setMahasiswaData({ ...MahasiswaData, phone_number: e.target.value })
                }
                size="lg"
                radius="lg"
              />
              {/* city */}
              <Input
                labelPlacement="outside-top"
                label="City"
                placeholder={MahasiswaData.address ? MahasiswaData.address : "City"}
                onChange={(e) =>
                  setMahasiswaData({ ...MahasiswaData, address: e.target.value })
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
                onPress={HandleSubmit}
              >
                Confirm
              </Button>
              <Button
                className="font-bold border-[#BBBBBB] bg-white text-black"
                radius="sm"
                onPress={HandleCancel}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}

export default MahasiswaPageEdit;
