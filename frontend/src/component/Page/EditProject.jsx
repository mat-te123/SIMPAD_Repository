import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  Alert,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import BlockContainer from "../ReuseableComponents/BlockContainer";
import TeamInput from "../ReuseableComponents/TeamInput";
import MainTemplate from "../Template/MainTemplate";
import { useAuth } from "../../context/AuthContext";

function EditProject() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const { User } = useAuth();
  console.log("User ID from params:", User);
  const navigate = useNavigate();
  const [MahasiswaProjectData, setMahasiswaProjectData] = useState({
    title: "",
    description: "",
    cover_image_url: null,
    youtube_video_url: "",
    project_year: "",
    project_type: "",
  });

  const [TeamData, setTeamData] = useState([]);
  const [TeamName, setTeamName] = useState("");
  console.log("Team Name in EditProject:", TeamName);
  const ProjectManajerData = {
    user_id: Number(User),
    role: "Project Manager",
  };
  const location = useLocation();
  const projectTypeFromState = location.state?.projectType || null;
  const projectYearFromState = location.state?.projectYear || null;

  // edit project
  const editdata = location.state?.editdata || null;

  // Error state
  const [errortitle, setErrortitle] = useState("");
  const [errordesc, setErrordesc] = useState("");

  // UseEffect to fetch existing project data if editing
  useEffect(() => {
    async function fetchProjectData() {
      if (editdata) {
        const respond = await AccountInfo.ShowProjectById(editdata.id);
        const Data = respond.project;
        console.log("Fetched Project Data for Editing:", respond.project);
        setMahasiswaProjectData({
          title: Data.title || "",
          description: Data.description || "",
          cover_image_url: Data.cover_image_url || null,
          youtube_video_url: Data.youtube_video_url || "",
          project_year: Data.project_year || "",
          project_type: Data.project_type || "",
        });
        setTeamName(Data.team_name || "");
      }
    }
    fetchProjectData();
  }, [editdata]);

  console.log("Mahasiswa Project Data State:", MahasiswaProjectData);


  const HandleSubmit = () => {
    const formData = new FormData();

    if (!MahasiswaProjectData.title) {
      setErrortitle("Title is required.");
      setErrordesc("Please enter a title for the project.");
      return;
    }

    if (!MahasiswaProjectData.project_year && !projectYearFromState) {
      setErrortitle("Project Year is required.");
      setErrordesc("Please enter the project year.");
      return;
    }

    if (!MahasiswaProjectData.cover_image_url) {
      setErrortitle("Cover Image is required.");
      setErrordesc("Please upload a cover image for the project.");
      return;
    }

    if (!MahasiswaProjectData.description) {
      setErrortitle("Description is required.");
      setErrordesc("Please enter a description for the project.");
      return;
    }

    if (!MahasiswaProjectData.youtube_video_url) {
      setErrortitle("Youtube Video URL is required.");
      setErrordesc("Please enter a Youtube video URL for the project.");
      return;
    }

    if (TeamData.length < 2) {
      setErrortitle("Team Members Required.");
      setErrordesc("Please add at least one team member to the project.");
      return;
    }

    formData.append("title", MahasiswaProjectData.title);
    formData.append("description", MahasiswaProjectData.description);

    if (MahasiswaProjectData.cover_image_url instanceof File) {
      formData.append("cover_image_url", MahasiswaProjectData.cover_image_url);
    }

    formData.append(
      "youtube_video_url",
      MahasiswaProjectData.youtube_video_url
    );

    if (projectYearFromState) {
      formData.append("project_year", `20${projectYearFromState}`);
    } else {
      formData.append("project_year", MahasiswaProjectData.project_year);
    }

    formData.append("project_type", projectTypeFromState);

    TeamData.forEach((member, index) => {
      formData.append(`students[${index}][user_id]`, member.user_id);
      formData.append(`students[${index}][role]`, member.role);
    });

    formData.append("team_name", TeamName);

    console.log("form data:", ...formData);
    console.log("Mahasiswa Project Data:", MahasiswaProjectData);
    console.log("cover_image_url:", MahasiswaProjectData.cover_image_url);
    console.log(
      "cover_image_url:",
      typeof MahasiswaProjectData.cover_image_url
    );
    const DataObjects = Object.fromEntries(formData.entries());
    console.log("Data Objects:", DataObjects);

    AccountInfo.CreateProject(User, formData)
  .then((response) => {
    // Assuming response is truthy on success
    console.log("Project created successfully:", response);
    navigate(`/Mahasiswa/${User}`);
  })
  .catch((error) => {
    // Extract the exact message from Laravel
    const serverMessage = error.response?.data?.message || error.message || "Unknown Error";
    
    setErrortitle("Failed to create project");
    setErrordesc(serverMessage);
  });
  };

  const HandleUpdate = () => {
    const formData = new FormData();

    if (!MahasiswaProjectData.title) {
      setErrortitle("Title is required.");
      setErrordesc("Please enter a title for the project.");
      return;
    }

    if (!MahasiswaProjectData.cover_image_url) {
      setErrortitle("Cover Image is required.");
      setErrordesc("Please upload a cover image for the project.");
      return;
    }

    if (!MahasiswaProjectData.description) {
      setErrortitle("Description is required.");
      setErrordesc("Please enter a description for the project.");
      return;
    }

    if (!MahasiswaProjectData.youtube_video_url) {
      setErrortitle("Youtube Video URL is required.");
      setErrordesc("Please enter a Youtube video URL for the project.");
      return;
    }

    formData.append("title", MahasiswaProjectData.title);
    formData.append("description", MahasiswaProjectData.description);

    if (MahasiswaProjectData.cover_image_url instanceof File) {
      formData.append("cover_image_url", MahasiswaProjectData.cover_image_url);
    }

    formData.append(
      "youtube_video_url",
      MahasiswaProjectData.youtube_video_url
    );

    formData.append("team_name", TeamName);

    formData.append("_method", "PUT"); // For Laravel to recognize it as a PUT request

    console.log("form data:", ...formData);
    console.log("Mahasiswa Project Data:", MahasiswaProjectData);
    console.log("cover_image_url:", MahasiswaProjectData.cover_image_url);
    console.log(
      "cover_image_url:",
      typeof MahasiswaProjectData.cover_image_url
    );
    const DataObjects = Object.fromEntries(formData.entries());
    console.log("Data Objects Update:", DataObjects);

    AccountInfo.UpdateProject(editdata.id, formData).then((response) => {
      if (response) {
        console.log("Project updated successfully:", response);
        navigate(`/Mahasiswa/${User}`);
      } else {
        console.error("Failed to update project.");
      }
    });
  };

  const HandleDelete = () => {
    AccountInfo.DeleteProject(editdata.id).then((response) => {
      if (response) {
        console.log("Project deleted successfully:", response);
        navigate(`/Mahasiswa/${User}`);
      } else {
        console.error("Failed to delete project.");
      }
    });
  };

  // console.log("Mahasiswa Project Data:", MahasiswaProjectData);

  return (
    <MainTemplate isSearchbar={false}>
      <div>
        <div className="flex flex-col px-90 bg-white overflow-auto pt-20">
          {/* Bagian Atas */}
          <div className="w-full h-20 flex flex-row justify-between items-center">
            {/* Button 1 */}
            <div>
              <Button
                onPress={(e) => navigate(-1)}
                className="bg-[#FFFFFF] border-1 border-[#BBBBBB] shadow-sm"
              >
                Cancel
              </Button>
            </div>
            {/* Button 2 */}
            <div className="w-fit flex flex-row gap-10">
              {!editdata ? (
                <Button
                  onPress={HandleSubmit}
                  className="bg-[#017777] border-1 border-[#044645] text-white"
                >
                  Post
                </Button>
              ) : (
                <>
                <Button
                  onPress={onOpen}
                  className="bg-[#DBE7E8] border-1 border-[#044645] text-Black"
                >
                  Delete Project
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
                  <ModalContent>
                    { (onClose) => (
                      <>
                      <ModalHeader>
                      <h1 className="text-2xl font-bold">Confirm Deletion</h1>
                    </ModalHeader>
                    <ModalBody>
                      <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                    </ModalBody>
                    <ModalFooter>
                      <div className="flex justify-end gap-4">
                        <Button
                          variant="bordered"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-[#FF4D4F] border-1 border-[#FF4D4F] text-white"
                          onPress={() => {
                            HandleDelete();
                            document.querySelector('button[aria-label="Close"]').click();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </ModalFooter>
                    </>
                    )}
                  </ModalContent>
                </Modal>
                <Button
                  onPress={HandleUpdate}
                  className="bg-[#017777] border-1 border-[#044645] text-white"
                >
                  Edit Project
                </Button>
              </>
              )}
            </div>
          </div>
          <div className="flex flex-col py-10">
            <form
              action=""
              method="post"
              encType="multipart/form-data"
              className="relative flex flex-col items-start justify-items-start gap-10"
            >
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
                value={
                  MahasiswaProjectData.title ? MahasiswaProjectData.title : ""
                }
              />

              <div className="w-full flex flex-row gap-5 items-center justify-between">
                <div>
                  <h1 className="border-b-1 border-black">
                    Project Year:
                    {projectYearFromState
                      ? ` 20${projectYearFromState}`
                      : ` ${MahasiswaProjectData.project_year}`}
                  </h1>
                </div>
                <div>
                  <h1 className="border-b-1 border-black">
                    Project Type:{" "}
                    {projectTypeFromState
                      ? projectTypeFromState
                      : `${MahasiswaProjectData.project_type}`}
                  </h1>
                </div>
              </div>

              <BlockContainer
                block={{ type: "image" }}
                onChange={(content) => {
                  setMahasiswaProjectData({
                    ...MahasiswaProjectData,
                    cover_image_url: content,
                  });
                }}
                block_content={{ image: MahasiswaProjectData.cover_image_url }}
              />

              <BlockContainer
                block={{ type: "text" }}
                onChange={(content) => {
                  setMahasiswaProjectData({
                    ...MahasiswaProjectData,
                    description: content,
                  });
                }}
                block_content={{ text: MahasiswaProjectData.description }}
              />

              <BlockContainer
                block={{ type: "video" }}
                onChange={(content) => {
                  setMahasiswaProjectData({
                    ...MahasiswaProjectData,
                    youtube_video_url: content,
                  });
                }}
                block_content={{
                  video_url: MahasiswaProjectData.youtube_video_url,
                }}
              />
            </form>
            <div
              className={`mt-20 border-1 border-[#044645] rounded-2xl bg-[#FDFDFD] p-10 items-center justify-center
              ${editdata ? "hidden" : "flex flex-col"}`}
            >
              {/* Search Bar */}
              <TeamInput
                onChange={(data) => {
                  const Datafiltered = [
                    ProjectManajerData,
                    ...data.map((item) => ({
                      user_id: item.user_id,
                      role: item.role,
                    })),
                  ];

                  setTeamData(Datafiltered);

                  console.log("Team Data Updated:", Datafiltered);
                }}
                TeamName={TeamName}
                setTeamName={setTeamName}
                ProjectManagerID={ProjectManajerData.user_id}
                setErrortitle={setErrortitle}
                setErrordesc={setErrordesc}
                ProjectType={
                  projectTypeFromState
                    ? projectTypeFromState
                    : MahasiswaProjectData.project_type
                }
              />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {errortitle && errordesc && (
            <motion.div
              // initial State
              initial={{ opacity: 0, y: -50 }}
              // Animate to
              animate={{ opacity: 1, y: 0 }}
              // Exit
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[400px]"
            >
              <Alert
                description={errordesc}
                title={errortitle}
                color="danger"
                onClose={() => setErrortitle(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainTemplate>
  );
}

export default EditProject;
