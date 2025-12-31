import MainTemplate from "../Template/MainTemplate";
import Projectcard from "../ReuseableComponents/ProjectCard";
import { Input, Button } from "@heroui/react";
import Projectcontent from "./ProjectContent";
import { useState, Fragment, useEffect } from "react";
import HomeApiData from "../Logic/HomeApiData";
import { BackendURL } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

// API Fetching

function ProjectPage() {
  const backendurl = BackendURL;
  const navigate = useNavigate();
  const SearchIcon = "/SearchIcon.svg";
  const ArrowUp = "/ArrowUp.svg";
  const Ornament = "/Ornament/CycleAccessorise.svg";

  const ScrollSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // API BACKEND

  // project data with infinite scroll adn filter

  const [ActiveTab, setTab] = useState("PAD1");
  const [SelectedKeys, setSelectedKeys] = useState(new Set(["New"]));

  const [ProjectData, setProjectData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadprojects = async (page, type, sort, isReplace = false) => {
    if (loading) return; // Prevent multiple simultaneous loads
    setLoading(true);
    try {
      const fixedType = type === "PAD1" ? "PAD 1" : "PAD 2";
      const sortParam = Array.from(sort).join("").replace(/_/g, "");

      const result = await HomeApiData.Pagination(page, fixedType, sortParam);
      if (!result || !result.data || result.data.length === 0) {
        if (isReplace) {
          setProjectData([]);
        }
        setHasMore(false);
      } else {
        setProjectData((prevProjects) => {
          if (isReplace) {
            return result.data;
          }

          return [...prevProjects, ...result.data];
        });
        setHasMore(result.next_page_url !== null);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setProjectData([]); // Reset project data when page changes
    setHasMore(true); // Reset hasMore when page changes
    setPage(1); // Reset to first page
    loadprojects(1, ActiveTab, SelectedKeys, true);
  }, [ActiveTab, SelectedKeys]);

  useEffect(() => {
    if (page === 1) return; // Skip initial load since it's handled in other useEffect
    loadprojects(page, ActiveTab, SelectedKeys, false);
  }, [page]);

  // Search Bar Logic
  const [SearchTerm, setSearchTerm] = useState("");
  const [SeactResults, setSearchResults] = useState([]);

  // Logic Function
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = ProjectData.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const resultHandleClick = (id) => {
    navigate(`/Project/${id}`);
    setSearchTerm("");
    setSearchResults([]);
  };

  console.log("Project Data:", ProjectData);

  return (
    <MainTemplate title="Project" isSearchbar={false}>
      {/* Konten Diatas */}
      <div
        className="relative w-full px-6 md:px-16 lg:px-32 py-8 min-h-[600px] lg:h-screen flex flex-row items-center justify-start bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)] bg-white overflow-hidden"
        id="Upper"
      >
        <div className="flex flex-row w-[50%] h-fit justify-between items-center gap-20 z-10">
          <div className="flex flex-col">
            <div className="gap-5">
              <h1 className="text-[80px] font-bold leading-[1.1]">
                Explore More Of{" "}
                <span className="bg-gradient-to-r from-[#044645] to-[#0AACAA] bg-clip-text text-transparent">
                  {" "}
                  TRPL{" "}
                </span>{" "}
                <span className="bg-gradient-to-r from-[#044645] to-[#0AACAA] bg-clip-text text-transparent">
                  PAD Projects
                </span>
              </h1>
              <h2 className="text-[18px] font-medium mt-10">
                Temukan berbagai proyek Aplikasi Dasar (PAD) dari mahasiswa TRPL
                yang penuh kreativitas dan inovasi. Setiap proyek menunjukkan
                kemampuan dasar pengembangan perangkat lunak yang dikembangkan
                melalui latihan nyata. Jelajahi lebih jauh untuk melihat
                bagaimana ide sederhana dapat diwujudkan menjadi aplikasi
                fungsional yang menarik dan bermanfaat.
              </h2>
            </div>
            <div className="relative w-full mt-10">
              <Input
                className="pt-10"
                size="lg"
                radius="xl"
                placeholder="Search"
                value={SearchTerm}
                onChange={handleSearchChange}
                endContent={<img src={SearchIcon} alt="Logo Search" />}
              />
              {SearchTerm.length > 0 && (
                <div className="absolute top-full z-10 w-full h-auto max-h-60 overflow-y-auto mt-2 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col">
                  {SeactResults.length > 0 ? (
                    SeactResults.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => resultHandleClick(item)}
                        className="cursor-pointer w-full bg-white hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
                      >
                        <div className="w-full flex flex-row items-center p-2">
                          <img
                            src={
                              item.cover_image_url
                                ? `${backendurl}storage/${item.cover_image_url}`
                                : item.profile_picture
                                ? `${backendurl}storage/${item.profile_picture}`
                                : "/PlaceHolder.svg"
                            }
                            alt={item.title || item.username}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex flex-col ml-3">
                            <span className="text-[1rem] font-medium text-gray-800">
                              {item.title || item.username}
                            </span>
                            <span className="text-[0.8rem] text-gray-500">
                              {item.project_type
                                ? item.project_type
                                : `Mahasiswa TRPL ${item.angkatan || ""}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // REMOVED: absolute top-full
                    <div className="p-4 text-sm text-gray-500 text-center">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute right-0 z-0">
          <img
            src={Ornament}
            alt="Ornament"
            className="h-[1000px] opacity-50"
          />
        </div>
      </div>
      {/* Main Content */}
      <div className="bg-white mt-10">
        {/* Bagian Project Card */}
        <Projectcontent
          ProjectData={ProjectData}
          ActiveTab={ActiveTab}
          setTab={setTab}
          SelectedKeys={SelectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
        <div
          id="ButtonLoadMore-Up"
          className="relative w-full flex items-center justify-end px-10 py-10 "
        >
          {/* Centered button */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Button
              size="lg"
              radius="sm"
              className="font-bold border-[#044645] bg-[#017777] text-white px-[28px] py-[18px]"
              isLoading={loading}
              onPress={() => {
                setPage((prevPage) => prevPage + 1);
              }}
              disabled={!hasMore || loading}
            >
              {loading
                ? "Loading..."
                : hasMore
                ? "Load More Projects"
                : "No More Projects"}
            </Button>
          </div>

          {/* Right-corner button */}
          <Button
            isIconOnly
            className="border border-[#BBBBBB] bg-[#FFFFFF] text-white "
            onPress={() => ScrollSection("Upper")}
          >
            <img src={ArrowUp} alt="LogoAtas" height="15" width="15" />
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProjectPage;
