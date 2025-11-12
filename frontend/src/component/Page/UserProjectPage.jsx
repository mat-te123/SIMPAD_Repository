import MainTemplate from "../Template/MainTemplate";
import TeamCard from "../ReuseableComponents/TeamCard";
import { Button } from "@heroui/react";

function UserProjectPage() {

    const ArrowRight = '/arrow-right.svg';

    const VideoSource = ""
    const ImageSource = ""

    return (

        <MainTemplate>
            <div className="flex flex-col bg-white py-30 px-60">
                {/* Judul Project */}
                <h1 className="text-[70px] font-bold">
                    {/* Placement sementara belum dihubungin ke database */}
                    Sistem Informasi Manajeman PAD
                </h1>
                {/* Bagian Content Project */}
                <div>
                    {/* Header Project */}
                    <div className="flex flex-row justify-between items-center w-full">
                        {/* Bagian kiri */}
                        <div className="flex flex-row justify-start items-center">
                            <img src="" alt="UserIcon" />
                            {/* Placeholder sementara sebelum database */}
                            <span>
                                Team X
                            </span>
                        </div>
                        {/* Bagian Kanan */}
                        <div>
                            <Button className="bg-[#017777] text-white "
                            endContent={ <img src={ArrowRight} alt="IconButton" />}>
                                Get To Know
                            </Button>
                        </div>
                    </div>
                    {/* Gambar Project */}
                    <div>
                        {VideoSource === "" ? }
                        <img src="" alt="Gambar Project" />
                    </div>
                    {/* Penjelasan Project */}
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex mollitia distinctio sunt fugiat perspiciatis modi rem molestias a facere quo architecto ducimus pariatur dolor cupiditate tempore, aspernatur veniam velit officia.
                    </p>
                    {/* video Project */}
                    <div>
                        <video src="" alt="Tempat Video"></video>
                    </div>
                    {/* penjelasan Kedua */}
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus temporibus dolorem sequi optio inventore reiciendis, eaque nobis iure expedita consequatur ipsam neque possimus sit consequuntur atque deserunt eveniet earum deleniti!
                    </p>
                    {/* bagian team */}
                    <div>
                        <h1>
                            {/* Placement Sebelum Database */}
                            About team X

                        </h1>
                        {/* Row team */}
                        <div className="flex flex-row ">
                            {/* Ini ngemap dari data JSON Backend */}
                            <TeamCard />
                        </div>
                    </div>
                </div>
            </div>
            {/* Bagian Comment */}
            <div className="bg-[#E6E6E6] px-20 py-5">
                <div className="bg-white px-5 pt-5 pb-15">

                </div>

           </div>
        </MainTemplate>


    )

}

export default UserProjectPage;