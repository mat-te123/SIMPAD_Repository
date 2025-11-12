import MainTemplate from "../Template/MainTemplate";


function About() {

    const videoURL = "";

    const CircleContent = (<svg xmlns="http://www.w3.org/2000/svg" width="1328" height="461" viewBox="0 0 1328 461" fill="none">
        <g filter="url(#filter0_n_181_1734)">
            <circle cx="965.5" cy="1043.5" r="1043.5" fill="url(#paint0_radial_181_1734)" />
        </g>
        <defs>
            <filter id="filter0_n_181_1734" x="-78" y="0" width="2087" height="2087" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feTurbulence type="fractalNoise" baseFrequency="0.71428573131561279 0.71428573131561279" stitchTiles="stitch" numOctaves="3" result="noise" seed="5133" />
                <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                </feComponentTransfer>
                <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                <feMerge result="effect1_noise_181_1734">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                </feMerge>
            </filter>
            <radialGradient id="paint0_radial_181_1734" cx="0" cy="0" r="1" gradientTransform="matrix(460 1148 -898.862 1280.71 506 67.4998)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#014848" />
                <stop offset="1" stopColor="#02AEAE" />
            </radialGradient>
        </defs>
    </svg>)



    return (
        <MainTemplate title="About">
            {/* Main Div */}
            <div className="flex flex-col bg-white px-20 py-25 gap-20">
                {/* Bagian Atas */}
                <div className="flex flex-col w-full bg-[#E6F2F2] h-fit rounded-3xl gap-20 shadow-xl">
                    {/* Bagian Text */}
                    <div className="flex flex-row items-center w-full py-10 px-10 justify-center gap-30">
                        <h1 className="text-[60px] text-[#014848] font-bold">
                            About SIM PAD
                        </h1>
                        <p className="w-[50%] text-[#014848] text-[20px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut  posuere mauris. Donec luctus vulputate enim, sed ullamcorper velit  aliquet sit amet. Cras ut blandit est. Mauris non nulla enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia  curae; Fusce mattis enim vitae eleifend ultrices. Integer pretium auctor leo, eu tempus neque mollis consequat. Duis rutrum ante quis placerat  lacinia. Sed sit amet arcu elementum, tempor tellus vel, tristique eros. Suspendisse potenti. Vestibulum et diam sit amet lectus placerat  scelerisque ac vitae diam. Cras feugiat pellentesque fermentum. Ut quis  est sit amet neque gravida laoreet. Pellentesque nisl est, dictum a  augue et, malesuada auctor nisl.
                        </p>
                    </div>
                    {/* bagian bulat */}
                    <div className="w-full flex justify-end rounded-b-3xl overflow-hidden">
                        {CircleContent}
                    </div>
                </div>
                {/* Bagian  Video */}
                <div >
                    {videoURL === "" ? (
                        <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center rounded-3xl shadow-xl">
                            <p className="text-gray-600 text-xl">Video Placeholder</p>
                        </div>
                    ) : (
                        <video width="100%" height="500px" controls>
                            <source src={videoURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                {/* Bagain Bawah */}
                <div className="flex flex-row justify-center w-full gap-20">
                    {/* Bagian kiri */}
                    <div className="flex flex-col bg-[#E6F1F1] w-full rounded-3xl p-10 shadow-xl pb-30">    
                        <h1 className="text-[60px] font-bold text-[#014848]">
                            About SIMPAD
                        </h1>
                        <p className="text-[#014848]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut  posuere mauris. Donec luctus vulputate enim, sed ullamcorper velit  aliquet sit amet. Cras ut blandit est. Mauris non nulla enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia  curae; Fusce mattis enim vitae eleifend ultrices. Integer pretium auctor leo, eu tempus neque mollis consequat. Duis rutrum ante quis placerat  lacinia. Sed sit amet arcu elementum, tempor tellus vel, tristique eros. Suspendisse potenti. Vestibulum et diam sit amet lectus placerat  scelerisque ac vitae diam. Cras feugiat pellentesque fermentum. Ut quis  est sit amet neque gravida laoreet. Pellentesque nisl est, dictum a  augue et, malesuada auctor nisl.
                        </p>

                    </div>
                    {/* bagian Kanan */}
                    <div className="flex flex-col bg-[#E6F1F1] w-full rounded-3xl p-10 shadow-xl pb-30">
                        <h1 className="text-[60px] font-bold text-[#014848]">
                            About SIMPAD
                        </h1>
                        <p className="text-[#014848]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut  posuere mauris. Donec luctus vulputate enim, sed ullamcorper velit  aliquet sit amet. Cras ut blandit est. Mauris non nulla enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia  curae; Fusce mattis enim vitae eleifend ultrices. Integer pretium auctor leo, eu tempus neque mollis consequat. Duis rutrum ante quis placerat  lacinia. Sed sit amet arcu elementum, tempor tellus vel, tristique eros. Suspendisse potenti. Vestibulum et diam sit amet lectus placerat  scelerisque ac vitae diam. Cras feugiat pellentesque fermentum. Ut quis  est sit amet neque gravida laoreet. Pellentesque nisl est, dictum a  augue et, malesuada auctor nisl.
                        </p>

                    </div>
                </div>
            </div>
        </MainTemplate>
    )



}

export default About;