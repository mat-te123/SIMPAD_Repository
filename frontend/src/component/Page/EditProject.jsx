import { form } from "@heroui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountInfo from "../Logic/AccountInfo";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/react";
import BlockContainer from "../ReuseableComponents/BlockContainer";
import TeamInput from "../ReuseableComponents/TeamInput";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [MahasiswaProjectData, setMahasiswaProjectData] = useState({});
  const [blocks, setBlocks] = useState([]);
  console.log("Blocks Data:", blocks);
  const [TemporaryData, SetTemporaryData] = useState({});

  function Addblock(type) {
    setBlocks(
      [
        ...blocks,
        {
          id: crypto.randomUUID(),
          type: type,
          block_content : {}
        }
      ]
    )
    
  }

  console.log("block type", blocks.type);

  function Assist() {
    setBorder(!isBorder);
    document.documentElement.classList.toggle("assist", !isBorder);
  }

  const [isBorder, setBorder] = useState(true);

  const HandleSubmit = () => {
    const formData = new FormData();

    formData.append("project_title", MahasiswaProjectData.title);
    formData.append("project_description", MahasiswaProjectData.description);
    formData.append("project_link", MahasiswaProjectData.youtube_video_url);
    formData.append("project_file", MahasiswaProjectData.project_year);
    formData.append("project_year", MahasiswaProjectData.project_type);

    // Bagian upload Foto masih bingung

    const result = AccountInfo.CreateProject(id, formData);
    console.log("Update Result:", result);
  };

  console.log("Mahasiswa Project Data:", MahasiswaProjectData);

  return (
    <div className="w-screen h-screen flex flex-col px-60 bg-white overflow-auto">
      {/* <div className="fixed z-100 top-0 left-0 py-6 px-5">
        <button
          className="bg-red-600 p-2 rounded-xl text-white cursor-pointer font-bold hover:bg-red-700"
          onClick={Assist}
        >
          {isBorder ? "Disable Assist" : "use Assist"}
        </button>
      </div> */}
      {/* Bagian Atas */}
      <div className="w-full h-20 flex flex-row justify-between items-center">
        {/* Button 1 */}
        <div>
          <Button onPress={(e) => navigate(-1)}>Cancel</Button>
        </div>
        {/* Button 2 */}
        <div className="w-fit flex flex-row gap-10">
          <Button>Save As Draft</Button>
          <Button onPress={HandleSubmit}>Post</Button>
        </div>
      </div>
      <div className="flex flex-col py-10 px-30">
        <form action="" method="post" encType="multipart/form-data" className="relative flex flex-col items-start justify-items-start gap-10">
          <Input
            type="text"
            name="title"
            id="title"
            variant="underline"
            placeholder="Project Title"
            size="2md"
            className="w-full text-4xl font-bold"
            onChange={(e) =>
              setMahasiswaProjectData({
                ...MahasiswaProjectData,
                title: e.target.value,
              })
            }
          />
          {blocks.map((block) => (
            <div key={block.id} className="relative w-full h-fit flex flex-col items-start justify-start">
              <BlockContainer block={block} onChange={(content) => {
                setBlocks(blocks.map(b => b.id === block.id ? { ...b, block_content: content } : b));
                SetTemporaryData({ ...TemporaryData, [block.id]: content });
              }} />
              <Button
                onPress={() => {
                  setBlocks(blocks.filter(b => b.id !== block.id));
                }}
                color="danger"
                className={`absolute ${block.type === "text" ? "-top-1.5 right-7" : "top-4 right-7"} z-10`}
                isIconOnly
                startContent={<img src="/trash.svg" alt="Delete" className="h-5 w-5 object-contain" />}
              />
            </div>
          ))}
        </form>
        {/* Bagain Button Tambah BLock */}
        <div className="relative flex items-center mt-20">
          <hr className="w-full border-1 rounded-2xl" />
          <div className="absolute left-1/2 -translate-x-1/2  z-10 bg-white px-4">
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-[#E6F2F2] border border-[#044645] p-8 text-xl font-bold rounded-3xl">
                  + Add New Block
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                onAction={(key) => Addblock(key)}>
                <DropdownItem key="image">Image</DropdownItem>
                <DropdownItem key="video">Video</DropdownItem>
                <DropdownItem key="text">Text</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Bagian Team */}
        <div className="mt-20 border-2 border-[#044645] rounded-2xl bg-[#FDFDFD] p-10 flex flex-col items-center justify-center">
          {/* Search Bar */}  
          <TeamInput />
        </div>
      </div>
    </div>
  );
}

export default EditProject;
