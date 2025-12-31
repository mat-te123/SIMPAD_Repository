import MainTemplate from "../Template/MainTemplate";
import { Button } from "@heroui/react";
import Company from "../ReuseableComponents/Company";
import { useState, Fragment, useEffect, use } from "react";
import Projectcontent from "./ProjectContent";
import "./index.css";

// API

import HomeApiData from "../Logic/HomeApiData";

function index() {
  const Arrow = "/Arrow.svg";
  const ArrowUp = "/ArrowUp.svg";
  const Briefcase = "/NotFoundContent/Briefcase.svg";

  const ScrollSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // API BACKEND
  // company data
  const [CompanyData, setCompanyData] = useState([]);

  useEffect(() => {
    async function fetchCompanyData() {
      const data = await HomeApiData.CompanyData();
      setCompanyData(data);
    }
    fetchCompanyData();
  }, []);

  console.log("Company Data:", CompanyData);

  const filledData =
    CompanyData.length < 5
      ? [...CompanyData, ...CompanyData, ...CompanyData]
      : CompanyData;

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
        setHasMore(false);
        if (isReplace) {
          setProjectData([]);
        }
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
    setHasMore(true); // Reset hasMore when page changes
    setPage(1); // Reset to first page
    loadprojects(1, ActiveTab, SelectedKeys, true);
  }, [ActiveTab, SelectedKeys]);

  useEffect(() => {
    if (page === 1) return; // Skip initial load since it's handled in other useEffect
    loadprojects(page, ActiveTab, SelectedKeys, false);
  }, [page]);

  console.log("Project Data:", ProjectData);

  return (
    <MainTemplate title="index" targetID="content" SearchData={ProjectData}>
      {/* Bagian Atas */}
      <div
        id="Upper"
        className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[rgba(100,254,254,0)] to-[rgba(60,152,152,0.28)] bg-white"
      >
        <div className="w-[1000px] flex flex-col items-center justify-center mb-[20px]">
          <h1 className=" w-full  tracking-tight text-[93px] text-center font-bold bg-gradient-to-r from-[#044645] to-[#0AACAA] bg-clip-text text-transparent">
            Temukan Beragam Proyek TRPL Disini !
          </h1>
          <h2 className="w-full text-center text-[18px] font-medium ">
            Karya-karya ini menunjukkan kreativitas, kemampuan teknis, dan
            inovasi dalam bidang teknologi perangkat lunak. Jelajahi ide-ide
            segar, solusi nyata, dan beragam aplikasi yang dikembangkan oleh
            para mahasiswa berbakat.
          </h2>
        </div>
        <Button
          className="w-[187px] h-[56px] py-[16px] px-[28px] text-[16px] font-bold border-1 border-[#044645] bg-[#017777] text-white"
          endContent={
            <img src={Arrow} alt="Logo Arrow" width="24" height="24"></img>
          }
          onPress={() => ScrollSection("content")}
        >
          Explore PAD
        </Button>
      </div>
      <div
        id="content"
        className="flex flex-col items-center justify-start w-full bg-white pt-20 gap-10"
      >
        {/* text awal */}
        <div className="flex flex-col items-center w-full px-40 mb-15 gap-8">
          <h1 className="text-[46px] font-bold tracking-tighter">
            Proyek Aplikasi Dasar
          </h1>
          <h2 className="text-[18px] font-medium text-center">
            PAD adalah proyek fundamental yang dirancang untuk membangun dasar
            kemampuan mahasiswa dalam pengembangan aplikasi. Melalui proyek ini,
            mahasiswa diperkenalkan pada konsep inti pemrograman, arsitektur
            aplikasi, dan alur kerja pengembangan perangkat lunak. Dalam PAD,
            setiap mahasiswa belajar mengubah kebutuhan sederhana menjadi solusi
            nyata—mulai dari perancangan antarmuka, logika program, hingga
            pengujian fungsional. Proyek ini menjadi pondasi penting sebelum
            memasuki pengembangan sistem yang lebih kompleks, sekaligus melatih
            ketelitian, kreativitas, dan kemampuan problem solving.
          </h2>
        </div>
        {/* LOGO Company infinte Scroll */}
        <div className="company-banner relative w-full overflow-hidden h-[200px]">
          {CompanyData.length === 0 ? (
            <div className="flex flex-row justify-center items-center gap-20">
              <img src={Briefcase} alt="Icon" width="250" height="250" />
              <div className="flex flex-col items-start justify-center w-[500px]">
                <h1 className={`text-[#0B1215] text-[36px] font-bold w-full`}>
                  No Partner Companies Yet
                </h1>
                <h2
                  className={`text-[#758694] text-[16px] font-medium w-[100%]`}
                >
                  We haven't partnered with any companies at the moment. If your
                  organization is interested in collaborating, feel free to
                  contact sv.trpl.
                </h2>
              </div>
            </div>
          ) : (
            <div className="w-full py-10 overflow-hidden bg-white">
              {/* The Mask Container */}
              <div className="flex w-full [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                {/* Track 1: Original */}
                <div className="flex animate-loop-scroll gap-10 pr-10 min-w-full">
                  {filledData.map((data, index) => (
                    <Company
                      key={`original-${index}`}
                      logo={data.company_image}
                      name={data.company_name}
                    />
                  ))}
                </div>

                {/* Track 2: Duplicate (for seamless effect) */}
                <div
                  className="flex animate-loop-scroll gap-10 pr-10 min-w-full"
                  aria-hidden="true"
                >
                  {filledData.map((data, index) => (
                    <Company
                      key={`duplicate-${index}`}
                      logo={data.company_image}
                      name={data.company_name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Kontent utama termasuk */}
        <Projectcontent
          ProjectData={ProjectData}
          ActiveTab={ActiveTab}
          setTab={setTab}
          SelectedKeys={SelectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
        <div
          id="ButtonLoadMore-Up"
          className="relative w-full flex items-center justify-end px-40 py-10 "
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

export default index;
