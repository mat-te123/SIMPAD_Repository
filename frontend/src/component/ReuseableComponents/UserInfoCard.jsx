import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function UserInfoCard({ id, imageSrc, name, nim, email, city, phone }) {

  const navigate = useNavigate();

  const EditButton = () => {
    navigate(`/Mahasiswa/Edit/${id}`);
  }

  return (
    <div className="flex flex-col items-start w-fit h-fit gap-3">
      <img src={imageSrc? imageSrc : "/PlaceHolder.svg"} alt="picture" className="h-50 w-50 rounded-full object-cover" />
      {/* h1 dan h2 */}
      <div>
        <h1 className="text-[#0B1215] font-bold text-2xl">
            {name}
        </h1>
        <h2 className="text-[#606060] font-light">
            {nim? nim : "NIM not provided"}
        </h2>
      </div>
      {/* email */}
      <div className="flex flex-row items-center gap-2">
        <img src="/UserInfo/mail.svg" alt="email" className="h-6 w-6"/>
        <span className="text-sm">
            {email ? email : "No email provided"}
        </span>
      </div>
      {/* kota */}
      <div className="flex flex-row items-center gap-2">
        <img src="/UserInfo/city.svg" alt="city" className="h-6 w-6"/>
        <span className="text-sm">
            {city ? city : "No city provided"}
        </span>
      </div>
      {/* no telfon */}
      <div className="flex flex-row items-center gap-2">
        <img src="/UserInfo/phone.svg" alt="phone" className="h-6 w-6"/>
        <span className="text-sm">
            {phone ? phone : "No phone number provided"}
        </span>
      </div>
      <Button className="bg-[#017777] border-1 border-[#044645] text-white mt-4 font-bold"
      radius="sm"
      onPress={EditButton}>
        Edit Profile
    </Button>
    </div>
  );
}

export default UserInfoCard;
