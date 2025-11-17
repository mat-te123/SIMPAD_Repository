import MainTemplate from "../Template/MainTemplate";
import TeamCard from "../ReuseableComponents/TeamCard";
import { Button } from "@heroui/react";
import Comment from "../ReuseableComponents/Comment";
import { Input } from "@heroui/react";

function UserProjectPage() {

    const ArrowRight = '/arrow-right.svg';
    const placeholder = '/PlaceHolder.svg';

    const VideoSource = ""
    const ImageSource = ""
    const icon = "ProjectIcon.svg";

    // sementara
    const isComment = null;

    return (

        <MainTemplate>
            <div className="flex flex-col bg-white py-20 px-60 gap-10">
                {/* Judul Project */}
                <h1 className="text-[70px] font-bold">
                    {/* Placement sementara belum dihubungin ke database */}
                    Sistem Informasi Manajeman PAD
                </h1>
                {/* Bagian Content Project */}
                <div className="flex flex-col gap-15">
                    {/* Header Project */}
                    <div className="flex flex-row justify-between items-center w-full">
                        {/* Bagian kiri */}
                        <div className="flex flex-row justify-start items-center gap-3">
                            <img src={icon} alt="UserIcon" />
                            {/* Placeholder sementara sebelum database */}
                            <span>
                                Team X
                            </span>
                        </div>
                        {/* Bagian Kanan */}
                        <div>
                            <Button className="bg-[#017777] text-white "
                                endContent={<img src={ArrowRight} alt="IconButton" />}>
                                Get To Know
                            </Button>
                        </div>
                    </div>
                    {/* Gambar Project */}
                    <div className="w-full h-[600px] bg-gray-500 flex items-center justify-center rounded-4xl">
                        {ImageSource === "" ? (
                            <p className="text-[white] text-xl">
                                Image Place Holder
                            </p>
                        ) : (
                            <img src={ImageSource} alt="Gambar Project" />
                        )}
                    </div>
                    {/* Penjelasan Project */}
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex mollitia distinctio sunt fugiat perspiciatis modi rem molestias a facere quo architecto ducimus pariatur dolor cupiditate tempore, aspernatur veniam velit officia.
                    </p>
                    {/* video Project */}
                    <div className="w-full h-[600px] bg-gray-500 flex items-center justify-center rounded-4xl">
                        {VideoSource === "" ? (
                            <p className="text-[white] text-xl">
                                Video Place Holder
                            </p>
                        ) : (
                            <video src={VideoSource} alt="Video Project"></video>
                        )}
                    </div>
                    {/* penjelasan Kedua */}
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus temporibus dolorem sequi optio inventore reiciendis, eaque nobis iure expedita consequatur ipsam neque possimus sit consequuntur atque deserunt eveniet earum deleniti!
                    </p>
                    {/* bagian team */}
                    <div className="bg-[#FBFBFB] border-1 border-[#E6E6E6] rounded-2xl p-10 flex flex-col w-full gap-10">
                        <h1 className="text-[#017777] text-4xl font-bold w-full text-center">
                            {/* Placement Sebelum Database */}
                            About team X

                        </h1>
                        {/* Row team */}
                        <div className="flex flex-row w-full">
                            {/* Ini ngemap dari data JSON Backend */}
                            <TeamCard ProfilePic="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Bagian Comment */}
            <div className="bg-[#E6E6E6] px-60 py-5 mb-20">
                <div className="bg-white px-10 pt-10 pb-50 rounded-3xl flex flex-col gap-5">
                    {/* Comment inser section */}
                    <div className="flex flex-col ">
                        <div className="flex flex-row gap-5 items-center justify-start">
                            <img src={placeholder} alt="FotoProfile" className="h-13 w-13 rounded-full object-cover" />
                            <Input
                                placeholder="Write your comment here..."
                                className="w-full mt-5 mb-5"
                                radius="md"
                                rows={4}
                            />
                        </div>
                        <div className="flex w-full justify-end">
                            <Button
                                className="bg-[#017777] text-white border-1 border-[#044645]"
                                radius="full">
                                Comment
                            </Button>
                        </div>
                    </div>
                    {/* Comment List Section */}
                    <div className="flex flex-col">
                        {/* Sementara Logika gini belum disambung ke database */}
                        {isComment === null ? (
                            <Comment />
                        ) : (
                            // Ini belum di map dari database
                            <Comment />
                        )}

                    </div>

                </div>

            </div>
        </MainTemplate>


    )

}

export default UserProjectPage;