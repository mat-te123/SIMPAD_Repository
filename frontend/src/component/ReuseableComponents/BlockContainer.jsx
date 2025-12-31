import { AddImage } from "./UploadProjectCase/AddImage.jsx";
import { AddVideo } from "./UploadProjectCase/AddVideo.jsx";
import { AddText } from "./UploadProjectCase/AddText.jsx";



export default function BlockContainer({ block, block_content, onChange }) {
  switch (block.type) {
    case "image":
      return <AddImage block_content={block_content} onChange={onChange} />;
    case "video":
      return <AddVideo block_content={block_content} onChange={onChange} />;
    case "text":
      return <AddText block_content={block_content} onChange={onChange} />;
    default:
      return null;
  }
}

