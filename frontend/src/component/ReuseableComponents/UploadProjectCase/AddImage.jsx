import { useRef, useState } from "react";
import { BackendURL } from "../../../utils/axiosClient";
import { Button } from "@heroui/react";

function AddImage({ block }) {
  const backendurl = BackendURL;
  const [Image, setImage] = useState(block.block_content.image || null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

  function UploadHandle() {
    fileInputRef.current.click();
  }

  function OnfileSelected(e) {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setImage(file.name);
      block.block_content.image = file.name;
    }
  }

  // console.log("Preview URL:", previewUrl);

  // console.log("Block Content Image:", block.block_content.image);

  return (
    <div className="w-full h-[600px]">
      {Image ? (
        <div className="relative w-full h-[600px]">
          <img
            src={previewUrl}
            alt="Gambar Project"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="relative bg-[#E6F2F2] rounded-xl flex flex-col items-center justify-center p-4 w-full h-[600px]">
          <span>
            Drag and drop media, or{" "}
            <a
              onClick={UploadHandle}
              className="underline cursor-pointer hover:text-[#017777]"
            >
              browse
            </a>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={OnfileSelected}
            />
          </span> 
        </div>
      )}
    </div>
  );
}

export { AddImage };
