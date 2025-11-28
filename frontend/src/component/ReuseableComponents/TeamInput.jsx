import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AccountInfo from "../Logic/AccountInfo";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { BackendURL } from "../../utils/axiosClient.js";

function TeamInput() {
  const [MahasiswaData, setMahasiswaData] = useState([]);
  const [SearchData, setSearchData] = useState("");
  const [SelectedMahasiswa, setSelectedMahasiswa] = useState([]);

  const UpdateRole = (user_id, role) => {
    setSelectedMahasiswa((prevSelected) =>
      prevSelected.map((mahasiswa) =>
        mahasiswa.user_id === user_id ? { ...mahasiswa, role: role } : mahasiswa
      )
    );
  };
  const URL = BackendURL;

  const filteredMahasiswa = MahasiswaData.filter((mahasiswa) =>
    mahasiswa.username.toLowerCase().includes(SearchData.toLowerCase())
  );

  console.log("Filtered Mahasiswa:", filteredMahasiswa);

  useEffect(() => {
    async function fetchData() {
      const result = await AccountInfo.getAllUser();
      setMahasiswaData(result);
    }
    fetchData();
  }, []);

  const SelectUserHandler = (mahasiswa) => {
    if (SelectedMahasiswa.length >= 3) {
      alert("Maximum of 3 users can be selected");
      return;
    }
      
    if (!SelectedMahasiswa.some((m) => m.user_id === mahasiswa.user_id)) {
        setSelectedMahasiswa([...SelectedMahasiswa, mahasiswa]);
        console.log("Selected Mahasiswa:", SelectedMahasiswa);
      } else {
        alert("User already selected");
        return
      }

    setSelectedMahasiswa([
      ...SelectedMahasiswa,
      { ...mahasiswa, role: "None" },
    ]);
  };

  const RemoveDataHandler = () => {
    setSelectedMahasiswa((prevSelected) => prevSelected.slice(0, -1));
  };

  return (
    <>
      <div className="w-[50%] justify-center items-center">
        <Input
          type="text"
          name="title"
          id="title"
          variant="underline"
          placeholder="Add your team name here"
          size="2md"
          textAlign="center"
          className="text-4xl font-extrabold mb-10 text-center"
        />
      </div>
      {/* Bagian dalam */}
      <div className="w-full flex flex-col items-center p-10 rounded-xl drop-shadow-xl bg-white border-1">
        <h1 className="text-5xl font-bold mb-5 ">Select User</h1>
        <Input
          value={SearchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Search User"
          type="text"
          size="lg"
          rounded="full"
          variant="bordered"
          classNames={{
            input: "text-md font-light",
          }}
        />

        <div className="h-[400px] overflow-x-auto mt-5 scroll-smooth w-full">
          {/* Selected Mahaswa */}
          <div className="mb-10 border-2 rounded-xl pb-5 p-5 border-dashed">
            <h1 className="font-bold text-2xl ">Selected User</h1>
            <div>
              {SelectedMahasiswa.map((mahasiswa, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start gap-4 mb-4 mt-4 bg-[#E6F2F2] p-2 rounded-xl cursor-pointer"
                >
                  <div className="flex flex-row items-center justify-start gap-4">
                    <img
                      src={
                        mahasiswa.profile_picture
                          ? `${URL}storage/${mahasiswa.profile_picture}`
                          : "/PlaceHolder.svg"
                      }
                      alt="foto profile"
                      className="w-15 h-15 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-start justify-center">
                      <h1 className="font-bold text-[#333333] text-lg">
                        {mahasiswa.username}
                      </h1>
                      <h2 className="font-light text-[#044645] text-sm">
                        {mahasiswa.nim ? mahasiswa.nim : "Not provided by user"}
                      </h2>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-row items-center justify-center gap-4">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="bg-[#044645] text-white px-4 py-2 rounded-lg">
                          {mahasiswa.role ? mahasiswa.role : "Select Role"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={new Set([mahasiswa.role])}
                        onSelectionChange={(key) => {
                          const selectedRole = Array.from(key)[0];
                          UpdateRole(mahasiswa.user_id, selectedRole);
                        }}
                      >
                        <DropdownItem key="None" disabled>
                          None
                        </DropdownItem>
                        <DropdownItem key="Front-end">Front-end</DropdownItem>
                        <DropdownItem key="Back-end">Back-end</DropdownItem>
                        <DropdownItem key="UI/UX">UI/UX</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button onPress={RemoveDataHandler}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mahasiswa list */}
          {filteredMahasiswa.map((mahasiswa, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-start gap-4 mb-4 mt-4 hover:bg-gray-200 p-2 rounded-xl cursor-pointer"
              onClick={() => SelectUserHandler(mahasiswa)}
            >
              {/* Mahasiswa List */}
              <img
                src={
                  mahasiswa.profile_picture
                    ? `${URL}storage/${mahasiswa.profile_picture}`
                    : "/PlaceHolder.svg"
                }
                alt="foto profile"
                className="w-15 h-15 rounded-full object-cover"
              />
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-bold text-[#333333] text-lg">
                  {mahasiswa.username}
                </h1>
                <h2 className="font-light text-[#044645] text-sm">
                  {mahasiswa.nim ? mahasiswa.nim : "Not provided by user"}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeamInput;
