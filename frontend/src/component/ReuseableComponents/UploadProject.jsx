import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function UploadProject({ id, type, isMahasiswa, ProjectType, ProjectYear, errormsg, errortitle }) {
  const navigate = useNavigate();

  const ProjectHandleButton = () => {
    if (ProjectYear === "" || ProjectType === "") {
      errortitle("NIM Not Found");
      errormsg("Please update your NIM in your profile first.");
      return;
    }
    navigate(`/mahasiswa/${id}/editProject/new`, { state: { projectType: ProjectType, projectYear: ProjectYear } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit w-full border-dashed border-2 border-gray-300 rounded-lg p-20 gap-6  transition-all duration-300 transform hover:border-gray-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#DBE7E8] hover:bg-gray-100 cursor-pointer"
     onClick={ProjectHandleButton}>
      <Button
        isIconOnly
        size="lg"
        className="bg-transparent"
        radius="full"
      >
        <img src="/plus-circle.svg" alt="Add Project" width="40" height="40" />
      </Button>
      <h1 className="text-black font-bold text-3xl text-center">
        {`Upload ${type} Project Portfolio`}
      </h1>
      <h2 className="text-gray-400 font-light text-xl text-center max-w-2xl">
        Make sure you are a Project Manager to be able to upload a new portfolio
      </h2>
    </div>
  );
}

export default UploadProject;
