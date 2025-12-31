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

function TeamInput({ onChange, ProjectManagerID, TeamName, setTeamName, setErrortitle, setErrordesc, ProjectType }) {
  const [MahasiswaData, setMahasiswaData] = useState([]);
  const [SearchData, setSearchData] = useState("");
  const [SelectedMahasiswa, setSelectedMahasiswa] = useState([]);
  const ProjectManagerId = ProjectManagerID;
  // console.log("Project Manager ID in TeamInput:", typeof ProjectManagerId);
  const URL = BackendURL;

  const UpdateRole = (user_id, role) => {
    setSelectedMahasiswa((prevSelected) =>
      prevSelected.map((mahasiswa) =>
        mahasiswa.user_id === user_id ? { ...mahasiswa, role: role } : mahasiswa
      )
    );
  };

  const filteredMahasiswa = MahasiswaData
  .filter((m) => m.user_id !== Number(ProjectManagerId))
  .filter((m) =>
    m.username.toLowerCase().includes(SearchData.toLowerCase())
)
  .filter((m) =>
    !SelectedMahasiswa.some((selected) => selected.user_id === m.user_id)
  );
 
  

  const idfilter = filteredMahasiswa.map((m) => m.user_id);

  // console.log("data filter", typeof idfilter);

  // console.log("Filtered Mahasiswa:", filteredMahasiswa);

  useEffect(() => {
    if (ProjectType) {
      const fetchMahasiswa = async () => {
        try {
          const result = await AccountInfo.getUsersWithoutProject(ProjectType);
          setMahasiswaData(result);
        } catch (error) {
          console.error("Error fetching Mahasiswa data:", error);
        }
      };
      fetchMahasiswa();
    }
  }, [ProjectType]);

  const SelectUserHandler = (mahasiswa) => {
    setSelectedMahasiswa((prevData) => {
      if (prevData.length >= 3) {
        setErrortitle("Team Limit Reached");
        setErrordesc("You can only add up to 3 team members.");
        return prevData;
      }

      if (prevData.some((u) => u.user_id === mahasiswa.user_id)) {
        setErrortitle("User Already Selected");
        setErrordesc("This user has already been added to the team.");
        return prevData;
      }

      return [...prevData, { ...mahasiswa, role: "None" }];
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(SelectedMahasiswa);
    }
  }, [SelectedMahasiswa]);

  const RemoveDataHandler = (userIdToRemove) => {
    setSelectedMahasiswa((prev) => prev.filter(user => user.user_id !== userIdToRemove));
  };

  return (
    <>
      <div className="w-[50%] justify-center items-center">
        <Input
        value={TeamName}
        onChange={(e) => setTeamName(e.target.value)}
          type="text"
          name="title"
          id="title"
          variant="underline"
          placeholder="Add your team name here"
          size="2md"
          textAlign="center"
          classNames={{
            input: "w-full text-4xl font-medium text-center",
            base: "w-full flex justify-center items-center mb-20",
          }}
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
                    <Dropdown placement="bottom-end" shouldBlockScroll={false}>
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
