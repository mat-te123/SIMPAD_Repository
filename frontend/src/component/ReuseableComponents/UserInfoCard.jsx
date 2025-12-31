import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { BackendURL } from "../../utils/axiosClient";

// Auth file for spesific user info
import { useAuth } from "../../context/AuthContext";

function UserInfoCard({ id, imageSrc, name, nim, email, address, phone_number }) {
  const URL = BackendURL;

  const { User } = useAuth();
  const AuthId = User ? User : null;

  const navigate = useNavigate();

  const EditButton = () => {
    navigate(`/Mahasiswa/Edit/${id}`);
  }

  return (
    <div className="flex flex-col items-start w-[300px] h-fit gap-3">
      <img src={imageSrc? `${URL}storage/${imageSrc}` : "/PlaceHolder.svg"} alt="picture" className="h-50 w-50 rounded-full object-cover shadow-lg/10" />
      {/* h1 dan h2 */}
      <div>
        <h1 className="text-[#0B1215] font-bold text-2xl truncate overflow-hidden text-ellipsis whitespace-nowrap w-[250px]">
            {name}
        </h1>
        <h2 className="text-[#606060] font-light">
            {nim==null || nim === "" || nim === "null" ? "NIM not provided" : nim}
        </h2>
      </div>
      {/* email */}
      <div className="flex flex-row items-center gap-2">
        <img src="/UserInfo/mail.svg" alt="email" className="h-6 w-6"/>
        <span className="text-sm  truncate overflow-hidden text-ellipsis whitespace-nowrap w-[200px]">
            {email==null || email === "" || email === "null" ? "No email provided" : email}
        </span>
      </div>
      {/* kota */}
      <div className="flex flex-row items-center gap-2">
        <img src="/UserInfo/city.svg" alt="city" className="h-6 w-6"/>
        <span className="text-sm">
            {address==null || address === "" || address === "null" ? "No city provided" : address}
        </span>
      </div>
      {/* no telfon */}
      <div className="flex flex-row items-center gap-2">
        <img src="/UserInfo/phone.svg" alt="phone" className="h-6 w-6"/>
        <span className="text-sm">
            {phone_number==null || phone_number === "" || phone_number === "null" ? "No phone number provided" : phone_number}
        </span>
      </div>
      <Button className={`bg-[#017777] border-1 border-[#044645] text-white mt-4 font-bold ${AuthId === id ? "flex" : "hidden"}`}
      radius="sm"
      onPress={EditButton}>
        Edit Profile
    </Button>
    </div>
  );
}

export default UserInfoCard;
