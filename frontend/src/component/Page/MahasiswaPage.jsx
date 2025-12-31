import MainTemplate from "../Template/MainTemplate";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo";
import UserInfoCard from "../ReuseableComponents/UserInfoCard";
import UserProjectContent from "../ReuseableComponents/UserProjectContent";
import { useAuth } from "../../context/AuthContext.jsx";
import UploadProject from "../ReuseableComponents/UploadProject.jsx";
import { BackendURL } from "../../utils/axiosClient.js";
import { Alert, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

function MahasiswaPage() {
  const { id } = useParams();
  const { User } = useAuth();
  console.log("Auth User ID:", User);
  const navigate = useNavigate();
  const AuthId = User ? User : null;
  const backendurl = BackendURL;
  console.log("Base URL:", backendurl);

  const handleClick = (tab) => {
    setTab(tab);
  };
  const [ActiveTab, setTab] = useState("PAD 1");

  // API data
  const [MahasiswaData, setMahasiswaData] = useState({});

  useEffect(() => {
    async function fetchMahasiswaData() {
      // Fetch data for specific mahasiswa by id
      const result = await AccountInfo.getUserById(id);
      setMahasiswaData(result);
    }
    fetchMahasiswaData();
  }, [id]);

  console.log("Mahasiswa Data:", MahasiswaData);

  const ProjectData = MahasiswaData.projects || [];

  console.log("Project Data:", ProjectData);
  // role pad1 dan pad2
  const pad1data = ProjectData.find(
    (project) => project.project_type === "PAD 1"
  );
  const pad2data = ProjectData.find(
    (project) => project.project_type === "PAD 2"
  );

  console.log("PAD1 Data:", pad1data);
  console.log("PAD2 Data:", pad2data);

  const pad1role = pad1data ? pad1data.pivot.role : "";
  const pad2role = pad2data ? pad2data.pivot.role : "";
  console.log("PAD1 Role:", pad1role);
  console.log("PAD2 Role:", pad2role);
  const MahasiswaYear = MahasiswaData?.nim
    ? MahasiswaData.nim.split("/")[0]
    : "";

  console.log("image file:  " + MahasiswaData.profile_picture);

  // PAD1 and PAD2 Handler
  const [errortitle, setErrortitle] = useState(null);
  const [errordesc, setErrordesc] = useState(null);

  const PAD12Handler = () => {
    if (MahasiswaData.nim === null || MahasiswaData.nim === undefined) {
      setErrortitle("NIM Not Found");
      setErrordesc("Please update your NIM in your profile first.");
      return;
    }
    const ProjectType = "PAD 1 dan 2";

    navigate("/mahasiswa/1/editProject/new", {
      state: { projectType: ProjectType, projectYear: MahasiswaYear },
    });
  };

  const isDualProject = ProjectData.some(project => project.project_type === "PAD 1 dan 2");

  console.log("Mahasiswa Detail Data:", MahasiswaData);

  return (
    <MainTemplate title="Mahasiswa Detail" isSearchbar={false}>
      {/* div utama */}
      <div className="w-full overflow-hidden flex flex-col">
        {/* div background image */}
        <div className="w-full h-[300px] shrink-0">
          <img
            src={
              MahasiswaData.background
                ? `${backendurl}storage/${MahasiswaData.background}`
                : "/PlaceHolder.svg"
            }
            alt="Background image"
            className="w-full object-cover h-full"
          />
        </div>
        {/* div content */}
        <div className="flex flex-row px-60 gap-20 relative">
          {/* Mahasiswa Info - Fixed z-index */}
          <div className="absolute top-[-100px] z-49">
            <UserInfoCard
              id={MahasiswaData.user_id}
              name={MahasiswaData.username}
              imageSrc={MahasiswaData.profile_picture}
              nim={MahasiswaData.nim}
              address={MahasiswaData.address}
              phone_number={MahasiswaData.phone_number}
              email={MahasiswaData.email}
            />
          </div>
          <div className="w-[500px] flex-1 items-end justify-start ml-[350px] pt-10 pb-10 h-fit">
            {/* 2. TAB SECTION: Only render tabs if the user is NOT a dual project user */}
            {!isDualProject ? (
              <div
                id="Option-PAD1"
                className="flex flex-row items-center border-b-4 border-[#D9D9D9] w-[100%] gap-5 mb-6"
              >
                <div>
                  <span
                    id="PAD1"
                    onClick={() => handleClick("PAD 1")}
                    className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[2px] after:w-full after:h-1 after:rounded-full after:transition-all after:duration-300 after:ease-in-out hover:font-bold transition-all duration-300 ease-in-out pb-2
          ${
            ActiveTab === "PAD 1"
              ? "after:bg-[#088B89] font-bold"
              : "after:bg-transparent font-normal"
          }`}
                  >
                    PAD 1
                  </span>
                </div>

                <div>
                  <span
                    id="PAD2"
                    onClick={() => handleClick("PAD 2")}
                    className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[2px] after:w-full after:h-1 after:rounded-full hover:font-bold transition-all duration-300 ease-in-out pb-2
          ${
            ActiveTab === "PAD 2"
              ? "after:bg-[#088B89] font-bold"
              : "after:bg-transparent font-normal"
          }`}
                  >
                    PAD 2
                  </span>
                </div>
              </div>
            ) : (
              <div
                id="Option-PAD1"
                className="flex flex-row items-center border-b-4 border-[#D9D9D9] w-[100%] gap-5 mb-6"
              >
                <div>
                  <span
                    id="PAD 1 dan 2"
                    className="relative cursor-pointer font-bold after:content-[''] after:absolute after:left-0 after:bottom-[2px] after:w-full after:h-1 after:rounded-full after:bg-[#088B89] pb-2"
                  >
                    PAD 1 dan 2
                  </span>
                </div>
              </div>
            )}

            {/* 3. CONTENT SECTION: Handle the list rendering logic here */}
            <div className="mt-8 w-full pb-10">
              {(() => {
                // Define which projects to show based on the condition
                const projectsToDisplay = ProjectData.filter((project) => {
                  if (isDualProject) return true; // Show ALL projects
                  return project.project_type === ActiveTab; // Show only ActiveTab projects
                });

                if (projectsToDisplay.length > 0) {
                  return projectsToDisplay.map((project) => (
                    <UserProjectContent
                      key={project.project_id}
                      projectid={project.project_id}
                      imageSrc={`${backendurl}storage/${project.cover_image_url}`}
                      name={project.title}
                      detail={project.description}
                      role={project.pivot.role}
                      Authid={AuthId}
                    />
                  ));
                } else {
                  // EMPTY STATE LOGIC
                  return AuthId === MahasiswaData.user_id ? (
                    <>
                      <UploadProject
                        id={MahasiswaData.user_id}
                        type={ActiveTab}
                        isMahasiswa={true}
                        ProjectType={ActiveTab}
                        ProjectYear={MahasiswaYear}
                        errortitle={setErrortitle}
                        errormsg={setErrordesc}
                      />
                      {/* Only show "Continue" alert if NOT dual project (logic optional based on your needs) */}
                      {!isDualProject && ActiveTab === "PAD 1" && !pad1data && (
                        <div className="mt-5">
                          <Alert
                            title="Continue Project?"
                            description="is this project continuing to PAD 2?"
                            endContent={
                              <Button
                                size="sm"
                                className="bg-[#017777] border-1 border-[#044645] text-white"
                                onPress={PAD12Handler}
                              >
                                yes
                              </Button>
                            }
                            classNames={{
                              base: "bg-[#DBE7E8] border-1 border-[#044645]",
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-20">
                      <img
                        src="/NotFoundContent/ban.svg"
                        alt="No Project"
                        className="w-32 h-32 mb-4"
                      />
                      <h1 className="text-[#0B1215] text-lg font-bold">
                        No Posts Available Yet
                      </h1>
                      <h2 className="text-[#758694] font-medium">
                        The user hasn't uploaded any content. Please check back
                        soon.
                      </h2>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
        {/* Pop Alert */}
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

export default MahasiswaPage;
