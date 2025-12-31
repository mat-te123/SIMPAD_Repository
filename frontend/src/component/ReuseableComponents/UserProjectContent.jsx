import { Button } from "@heroui/react";
import { useNavigate, useParams } from "react-router-dom";



function UserProjectContent({ projectid, imageSrc, name, detail, role, Authid }) {
  const navigate = useNavigate();
  const {id} = useParams();

  const dict = {
    id: projectid,
    isedit: true,
  }

  const isOwner = Number(Authid) === Number(id);

  const editHandleClick = () => {
    navigate(`/mahasiswa/${projectid}/editProject/new`, {
      state: {
        editdata: dict,
      },
    });
  }
  return (
    <div className="w-full h-fit flex flex-col items-start justify-start gap-0">
      <img src={imageSrc ? imageSrc : "/PlaceHolder.svg"} className="object-cover w-[600px] h-[350px] overflow-hidden rounded-2xl "/>
      <h1 className="font-bold text-4xl mt-3 ">
        {name}
      </h1>
      <h2 className="w-full mt-5 text-zinc-800 text-base font-normal leading-4"> 
        {detail}
      </h2>
      <span className="mt-5">
        {"Role: " + role}
      </span>
      <div className="w-fit h-fit flex flex-row gap-4">
      <Button className="bg-[#017777] border-1 border-[#044645] text-white mt-4"
      radius="sm"
      endContent={
        <img
          src="/Arrow.svg"
          alt="Arrow Right"
          width="24"
          height="24"
        />
      }
      onPress={() => navigate(`/Project/${projectid}`)}>
        Explore PAD
      </Button>
      {role === "Project Manager" && (
        <Button className={`bg-[#DBE7E8] border-1 border-[#044645] text-black mt-4 ${isOwner ? 'flex' : 'hidden'}`}
        radius="sm"
        onPress={editHandleClick}>
          Edit Project
        </Button>
      )}
      </div>
    </div>
  );
}

export default UserProjectContent;
