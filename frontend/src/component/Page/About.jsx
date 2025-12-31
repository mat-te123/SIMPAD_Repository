import MainTemplate from "../Template/MainTemplate";
import TeamCard from "../ReuseableComponents/TeamCard";
import extractYouTubeID from "../Logic/ExtractYoutubeID";

function About() {
  // gambar masih placement
  const PADTEAM = {
    PM : {
      ProfilePic : "/PlaceHolder.svg",
      Name : "Erico Ali Gutama",
      Role : "Project Manager"
    },
    Frontend : {
      ProfilePic : "/PlaceHolder.svg",
      Name : "Delviano Khayru Attahira",
      Role : "Frontend"
    },
    Backend : {
      ProfilePic : "/PlaceHolder.svg",
      Name : "Daveena Alexandra Pentury",
      Role : "Backend"
    },
    UIUX : {
      ProfilePic : "/PlaceHolder.svg",
      Name : "Rainard Zulfan Pratama",
      Role : "Designer"
    }

  }
  const IDvideo = extractYouTubeID("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  

  const CircleContent = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1328"
      height="461"
      viewBox="0 0 1328 461"
      fill="none"
    >
      <g filter="url(#filter0_n_181_1734)">
        <circle
          cx="965.5"
          cy="1043.5"
          r="1043.5"
          fill="url(#paint0_radial_181_1734)"
        />
      </g>
      <defs>
        <filter
          id="filter0_n_181_1734"
          x="-78"
          y="0"
          width="2087"
          height="2087"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.71428573131561279 0.71428573131561279"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="5133"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect1_noise_181_1734">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
        <radialGradient
          id="paint0_radial_181_1734"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(460 1148 -898.862 1280.71 506 67.4998)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#014848" />
          <stop offset="1" stopColor="#02AEAE" />
        </radialGradient>
      </defs>
    </svg>
  );

  return (
    <MainTemplate title="About" isSearchbar={false}>
      {/* Main Div */}
      <div className="flex flex-col bg-white px-70 py-25 gap-20">
        {/* Bagian Atas */}
        <div className="flex flex-col w-full bg-[#E6F2F2] h-fit rounded-3xl gap-5 shadow-lg/5">
          {/* Bagian Text */}
          <div className="flex flex-row items-center w-full py-10 px-10 justify-center gap-30">
            <h1 className="text-[60px] text-[#014848] font-bold">
              About SIM PAD
            </h1>
            <p className="w-[50%] text-[#014848] text-[20px]">
              SIM PAD (Sistem Informasi Manajemen Proyek Aplikasi Dasar) adalah
              platform yang dirancang untuk mempermudah pengelolaan,
              pendokumentasian, dan publikasi proyek Aplikasi Dasar mahasiswa
              TRPL. Melalui sistem ini, setiap proyek dapat ditampilkan secara
              lebih terstruktur—mulai dari deskripsi, tujuan, fitur, hingga
              hasil akhirnya. SIM PAD membantu dosen dan mahasiswa dalam
              memantau progres, melakukan evaluasi, serta memberikan akses yang
              lebih luas bagi siapa saja yang ingin melihat karya-karya
              mahasiswa. Dengan hadirnya SIM PAD, proses pembelajaran menjadi
              lebih transparan, terukur, dan mendorong mahasiswa untuk terus
              menghasilkan proyek yang lebih baik setiap semesternya.
            </p>
          </div>
          {/* bagian bulat */}
          <div className="w-full flex justify-end rounded-b-3xl overflow-hidden">
            {CircleContent}
          </div>
        </div>
        {/* Bagian  Video */}
        <div>
          {IDvideo === "" ? (
            <div className="w-full h-[800px] bg-gray-300 flex items-center justify-center rounded-3xl shadow-lg/5">
              <p className="text-gray-600 text-xl">Video Placeholder</p>
            </div>
          ) : (
            <iframe src={`https://www.youtube.com/embed/${IDvideo}`} width="100%" height="700px" title="YouTube video player" frameBorder="0"
        allowFullScreen
        />
          )}
        </div>
        {/* Bagian Bawah */}
        <div className="grid grid-cols-4 gap-1 justify-items-center bg-[#FAFAFA] border-1 border-[#D9D9D9] rounded-3xl p-10 shadow-lg/5">
          {/* Card Team */}
          {PADTEAM && Object.keys(PADTEAM).map((key) => (
            <TeamCard
              key={key}
              ProfilePic={PADTEAM[key].ProfilePic? PADTEAM[key].ProfilePic : "/PlaceHolder.svg"}
              Name={PADTEAM[key].Name}
              Role={PADTEAM[key].Role}
            />
          ))}
        </div>
      </div>
    </MainTemplate>
  );
}

export default About;
