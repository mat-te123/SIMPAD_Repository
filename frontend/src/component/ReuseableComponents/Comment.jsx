import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

import AccountInfo from "../Logic/AccountInfo";

function Comment({
  id,
  photoProfile,
  username,
  timeMake,
  commentContent,
  usersessionid,
  usercommentid,
}) {
  const commentId = id;
  console.log("Comment ID:", commentId);
  const ProfilePicture = photoProfile;
  const Username = username || "SampleUser";
  const TimeMake = timeMake;
  const CommentContent = commentContent || "This is a sample comment content.";
  console.log("Comment Content:", CommentContent);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const DeleteHandle = async () => {
    try {
      const respond = await AccountInfo.DeleteComment(commentId);

      window.location.reload();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="relative flex flex-row items-center gap-5  group">
      <img
        src={ProfilePicture}
        alt="profile picture"
        className="h-13 w-13 rounded-full object-cover border-1 border-gray-300 shadow-lg/10"
      />
      <div className="flex flex-col items-start justify-center">
        <div className="flex flex-row gap-5 items-center w-full">
          <h1 className="text-lg font-bold">{Username}</h1>
          <span className="text-sm font-light text-gray-500">{TimeMake}</span>
        </div>
        <h2>{CommentContent}</h2>
      </div>
      {usersessionid === usercommentid && (
        <>
          <Button
            isIconOnly
            className="absolute right-0 top-[20%] h-8 w-8 bg-transparent hover:bg-transparent hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            onPress={onOpen}
          >
            <img src="/trash.svg" alt="Delete Comment" className="h-4 w-4" />
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            shouldBlockScroll={false}
            classNames={{
              backdrop: "bg-black/10",
              base: "bg-[#FFFFFF]/50 border-1 border-[#E2E8F0] backdrop-blur-lg shadow-lg/10",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Delete Comment</ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to delete this comment?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="shadow"
                      size="sm"
                      onPress={onClose}
                      className="bg-[#E2E8F0] border-1 border-[#044645] text-black"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="shadow"
                      size="sm"
                      className="bg-[#017777] border-1 border-[#044645] text-white"
                      onPress={DeleteHandle}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Comment;
