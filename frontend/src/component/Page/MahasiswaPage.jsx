import MainTemplate from "../Template/MainTemplate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo";
import UserInfoCard from "../ReuseableComponents/UserInfoCard";
import UserProjectContent from "../ReuseableComponents/UserProjectContent";
import { Button } from "@heroui/react";

function MahasiswaPage() {
  const { id } = useParams();

  const handleClick = (tab) => {
    setTab(tab);
  };
  const [ActiveTab, setTab] = useState("PAD1");

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

  console.log("Mahasiswa Detail Data:", MahasiswaData);

  return (
    <MainTemplate title="Mahasiswa Detail" isSearchbar={false}>
      {/* div utama */}
      <div className="h-screen w-full overflow-hidden flex flex-col">
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
        <div className="flex flex-row px-60 gap-20 relative">
          {/* Mahasiswa Info - Fixed z-index */}
          <div className="absolute top-[-100px] z-49">
            <UserInfoCard
              id={MahasiswaData.user_id}
              name={MahasiswaData.username}
              imageSrc={MahasiswaData.profile_picture}
              angkatan={MahasiswaData.angkatan}
              email={MahasiswaData.email}
              bio={MahasiswaData.bio}
            />
          </div>

          {/* Main content with proper spacing */}
          <div className="overflow-y-auto w-[500px] flex-1 items-end justify-start ml-[350px] pt-20 pb-10">
            {/* bagian PAD 1 dan 2 */}
            <div
              id="Option-PAD1"
              className="flex flex-row items-center border-b-4 border-[#D9D9D9] w-[100%] gap-5 mb-6"
            >
              <div>
                <span
                  id="PAD1"
                  onClick={() => handleClick("PAD1")}
                  className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-[0px] after:w-full after:h-1 after:rounded-full after:transition-all after:duration-300 after:ease-in-out hover:font-bold transition-all duration-300 ease-in-out pb-2
          ${
            ActiveTab === "PAD1" ? "after:bg-[#088B89]" : "after:bg-transparent"
          }
          ${ActiveTab === "PAD1" ? "font-bold" : "font-normal"}`}
                >
                  PAD 1
                </span>
              </div>

              <div>
                <span
                  id="PAD2"
                  onClick={() => handleClick("PAD2")}
                  className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-[0px] after:w-full after:h-1 after:rounded-full hover:font-bold transition-all duration-300 ease-in-out pb-2
          ${
            ActiveTab === "PAD2" ? "after:bg-[#088B89]" : "after:bg-transparent"
          }
          ${ActiveTab === "PAD2" ? "font-bold" : "font-normal"}`}
                >
                  PAD 2
                </span>
              </div>
            </div>

            {/* Bagian Content */}
            <div className="mt-8">
              {MahasiswaData.projects &&
              MahasiswaData.projects.filter(
                (project) => project.project_type === ActiveTab
              ).length > 0 ? (
                MahasiswaData.projects
                  .filter((project) => project.project_type === ActiveTab)
                  .map((project) => (
                    <UserProjectContent
                      key={project.project_id}
                      imageSrc={project.cover_image_url}
                      name={project.title}
                      detail={project.description}
                      role={project.project_type}
                      filter={ActiveTab}
                    />
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center h-fit w-full border-dashed border-2 border-gray-300 rounded-lg p-20 gap-6">
                  <Button isIconOnly size="lg" className="bg-transparent" radius="full">
                    <img
                      src="/plus-circle.svg"
                      alt="Add Project"
                      width="40"
                      height="40"
                    />
                  </Button>
                  <h1 className="text-black font-bold text-3xl text-center">
                    {`Upload ${ActiveTab} Project Portfolio`}
                  </h1>
                  <h2 className="text-gray-400 font-light text-xl text-center max-w-2xl">
                    Make sure you are a Project Manager to be able to upload a
                    new portfolio
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}

export default MahasiswaPage;
