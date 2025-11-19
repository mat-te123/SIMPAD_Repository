import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function MahasiwaCard({ id, name, imageSrc, angkatan }) {
  const resolvedImageSrc =
    !imageSrc || imageSrc === "" ? "/PlaceHolder.svg" : imageSrc;
  const nameMahasiswa = !name || name === "" ? "Nama Mahasiswa" : name;
  const angkatanMahasiswa =
    !angkatan || angkatan === "" ? "Mahasiswa TRPL 24" : angkatan;
    const navigate = useNavigate();

    const ButtonHandle = () => {
        navigate('/Mahasiswa/'+id);
    }



  return (
    <div className="flex flex-col justify-center items-center rounded-3xl bg-[#E6F2F2] p-10 h-fit w-fit gap-5">
      <img
        className="rounded-full h-40 w-40 object-cover mb-4"
        src={resolvedImageSrc}
        alt={name || "Profile"}
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-[#017777] text-xl font-bold">
            {nameMahasiswa}
        </h1>
        <h2 className="text-[#014848] text-md font-medium">
            {angkatanMahasiswa}
        </h2>
      </div>
      <Button
        className="bg-[#017777] border-1 border-[#044645] text-white"
        radius="lg"
        onPress={ButtonHandle}
        endContent={
          <img
            src="/arrow-right.svg"
            alt="Arrow Right"
            width="24"
            height="24"
          />
        }
      >
        Visit
      </Button>
    </div>
  );
}

export default MahasiwaCard;
