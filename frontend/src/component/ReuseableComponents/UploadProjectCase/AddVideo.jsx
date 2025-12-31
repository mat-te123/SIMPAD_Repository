import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";

import extractYouTubeID from "../../Logic/ExtractYoutubeID.jsx";


  

function AddVideo({ block_content = {}, onChange }) {

  const IDvideo = extractYouTubeID(block_content?.video_url);
  // console.log("Extracted Video ID:", IDvideo);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const LinkAttach = () => {
    onOpen();
    // console.log("Opening Modal");
  }

  return (
    <div className="w-full">
      {IDvideo ? (
        <iframe src={`https://www.youtube.com/embed/${IDvideo}`} width="100%" height="700px" title="YouTube video player" frameBorder="0"
        allowFullScreen
        />
      ) : (
        <div className="bg-[#E6F2F2] rounded-xl flex flex-col items-center justify-center p-4 w-full h-[600px] shadow-md">
          <span className="text-2xl">
            Attach youtube video <a onClick={LinkAttach} className="underline cursor-pointer hover:text-[#017777]">Link</a>
          </span>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
            <ModalContent>
              <ModalHeader>Add Youtube Video Link</ModalHeader>
              <ModalBody>
                <input 
                  type="text" 
                  placeholder="Enter Youtube Video Link"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  onChange={(e) => onChange(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#044645] text-white px-4 py-2 rounded-lg"
                  onPress={() => onOpenChange(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
}

export { AddVideo };
