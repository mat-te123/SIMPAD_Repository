import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function UploadProject({ id, type, isMahasiswa }) {
  const navigate = useNavigate();

  const ProjectHandleButton = () => {
    navigate(`/mahasiswa/${id}/editProject`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit w-full border-dashed border-2 border-gray-300 rounded-lg p-20 gap-6">
      <Button
        isIconOnly
        size="lg"
        className="bg-transparent"
        radius="full"
        onPress={ProjectHandleButton}
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
