import { AddImage } from "./UploadProjectCase/AddImage.jsx";
import { AddVideo } from "./UploadProjectCase/AddVideo.jsx";
import { AddText } from "./UploadProjectCase/AddText.jsx";



export default function BlockContainer({block}) {
    switch (block.type) {
        case "image":
            return <AddImage block={block} />;
        case "video":
            return <AddVideo block={block} />;
        case "text":
            return <AddText block={block} />;
        default:
            null;
    }
    
}
