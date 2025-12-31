import MainTemplate from "../Template/MainTemplate";
import TeamCard from "../ReuseableComponents/TeamCard";
import { Alert, Button, user } from "@heroui/react";
import Comment from "../ReuseableComponents/Comment";
import { Input } from "@heroui/react";
import { useParams, useNavigate } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo";
import { BackendURL } from "../../utils/axiosClient";
import { useEffect, useState } from "react";
import extractYouTubeID from "../Logic/ExtractYoutubeID";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

function UserProjectPage() {
  // get project id from url
  const { id } = useParams();
  // Session User Id
  const { User, UserCompleteData } = useAuth();
  console.log("User Complete Data from Context:", UserCompleteData);
  console.log("User Id from Context:", User);
  console.log("Project Id from URL:", id);

  const backendUrl = BackendURL;
  const [Data, setData] = useState(null);
  const navigate = useNavigate();
  // Bagian Comment
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [LoadingSubmit, setLoadingSubmit] = useState(false);
  const [LoadingComments, setLoadingComments] = useState(true);
  const [errortitle, setErrortitle] = useState(null);
  const [errordesc, setErrordesc] = useState(null);

  const ArrowRight = "/arrow-right.svg";

  const icon = "/ProjectIcon.svg";

  // API data

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const response = await AccountInfo.ShowProjectById(id);
        setData(response);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }
    fetchProjectData();
  }, []);

  // Bagian Komentar

  const fetchComments = async (isRefetching = false) => {
    try {
      if (!isRefetching) setLoadingComments(true); // Only show loader on initial load

      const response = await AccountInfo.ShowComments(id);
      setCommentsList(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  // 2. Update the Submit Handler
  const CommentHandleSummit = async () =>{
    if (!User) {
      setErrortitle("Login Required");
      setErrordesc("You must be logged in to post a comment.");
      return;
    }
    // Prevent empty comments
    if (comment.trim() === "") {
      setErrortitle("Comment cannot be empty.");
      setErrordesc("Please write something before submitting your comment.");
      setLoadingSubmit(false);
      return;
    }

    setLoadingSubmit(true); // Disable button while sending

    try {
      const newComment = new FormData();
      newComment.append("content", comment);

      // Await the API call
      await AccountInfo.PostComment(id, newComment);

      // Success!
      setComment(""); // Clear the input field

      // THIS IS THE KEY: Re-fetch the comments to update the list
      await fetchComments(true);
    } catch (error) {
      console.error("Failed to post comment:", error);
      setErrortitle("Failed to post comment.");
      setErrordesc("An error occurred while posting your comment.");
      // Optional: Add a toast notification here for error
    } finally {
      setLoadingSubmit(false); // Re-enable button
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // error close
  useEffect(() => {
    if (errortitle || errordesc) {
      const timer = setTimeout(() => {
        setErrortitle(null);
        setErrordesc(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errortitle, errordesc]);

  console.log("Comments List:", commentsList);

  function timeAgo(timestamp) {
    const now = new Date();
    const created = new Date(timestamp);

    const diffMs = now - created; // selisih dalam millisecond
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return `Just now`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    return `${diffDay} days ago`;
  }

  if (!Data) {
    return (
      <MainTemplate isSearchbar={false} title="Project Detail">
        <div className="flex justify-center items-center h-[80vh]">
          <p>Loading project data...</p>
        </div>
      </MainTemplate>
    );
  }

  console.log("Full Data:", Data);
  const ProjectData = Data.project;
  const UserData = Data.users;
  console.log("Project Data:", ProjectData);
  console.log("User Data:", UserData);
  const manager = UserData.find((user) => user.role === "Project Manager");

  const VideoSource = ProjectData
    ? ProjectData.youtube_video_url
      ? `https://www.youtube.com/embed/${extractYouTubeID(
          ProjectData.youtube_video_url
        )}`
      : ""
    : "";
  const ImageSource = ProjectData
    ? ProjectData.cover_image_url
      ? `${backendUrl}storage/${ProjectData.cover_image_url}`
      : ""
    : "";

  return (
    <MainTemplate isSearchbar={false} title="Project Detail">
      <div className="flex flex-col bg-white py-20 px-100 gap-10">
        {/* Judul Project */}
        <h1 className="text-[70px] font-bold">
          {/* Placement sementara belum dihubungin ke database */}
          {ProjectData ? ProjectData.title : "Project Title"}
        </h1>
        {/* Bagian Content Project */}
        <div className="flex flex-col items-start justify-start gap-20">
          {/* Header Project */}
          <div className="flex flex-row justify-between items-center w-full">
            {/* Bagian kiri */}
            <div className="flex flex-row justify-start items-center gap-3">
              <img src={icon} alt="UserIcon" />
              {/* Placeholder sementara sebelum database */}
              <span>
                {manager ? manager.username : "Project Manager Name"} team
              </span>
            </div>
            {/* Bagian Kanan */}
            <div>
              <Button
                className="bg-[#017777] text-white "
                endContent={<img src={ArrowRight} alt="IconButton" />}
                onPress={() => {
                  navigate("/Mahasiswa/" + manager.user_id);
                }}
              >
                Get To Know
              </Button>
            </div>
          </div>
          {/* Gambar Project */}
          <div className="w-full h-[600px] bg-gray-500 flex items-center justify-center overflow-hidden">
            {ImageSource === "" ? (
              <p className="text-[white] text-xl">Image Place Holder</p>
            ) : (
              <img
                src={ImageSource}
                alt="Gambar Project"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          {/* Penjelasan Project */}
          <p>
            {ProjectData
              ? ProjectData.description
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."}
          </p>
          {/* video Project */}
          <div className="w-full h-[600px] bg-gray-500 flex items-center justify-center rounded-4xl mt-10">
            {VideoSource === "" ? (
              <p className="text-[white] text-xl">Video Place Holder</p>
            ) : (
              <iframe
                src={VideoSource}
                width="100%"
                height="700px"
                title="YouTube video player"
                allowFullScreen
              />
            )}
          </div>
          {/* bagian team */}
          <div className="bg-[#FBFBFB] border-1 border-[#E6E6E6] rounded-2xl p-10 flex flex-col w-full gap-10">
            <h1 className="text-[#017777] text-4xl font-bold w-full text-center">
              {/* Placement Sebelum Database */}
              {`About ${
                ProjectData.team_name
                  ? ProjectData.team_name + " team"
                  : `${manager.username}'s team`
              }`}
            </h1>
            {/* Row team */}
            <div className="grid grid-cols-4 gap-10 w-full">
              {/* Ini ngemap dari data JSON Backend */}
              {UserData &&
                UserData.map((user, index) => (
                  <TeamCard
                    key={index}
                    UserID = {user.user_id}
                    ProfilePic={
                      user.profile_picture
                        ? `${backendUrl}storage/${user.profile_picture}`
                        : "/PlaceHolder.svg"
                    }
                    Name={user.username}
                    Role={user.role}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* Bagian Comment */}
        <div className="bg-white border-1 border-[#E6EDED] px-10 pt-10 pb-50 rounded-3xl flex flex-col gap-5 shadow-lg">
          {/* Comment inser section */}
          <div className="flex flex-col ">
            <div className="flex flex-row gap-5 items-center justify-start">
              <img
                src={
                  UserCompleteData && UserCompleteData.profile_picture
                    ? `${backendUrl}storage/${UserCompleteData.profile_picture}`
                    : "/PlaceHolder.svg"
                }
                alt="FotoProfile"
                className="h-13 w-13 rounded-full object-cover"
              />
              <Input
                placeholder="Write your comment here..."
                className="w-full mt-5 mb-5"
                radius="md"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                isDisabled={User?false:true}
              />
              <Button
                className="bg-[#017777] text-white border-1 border-[#044645]"
                radius="full"
                onPress={CommentHandleSummit} // Calls the updated function
                isLoading={LoadingSubmit} // Use UI library loading prop if available
              >
                {LoadingSubmit ? "Posting..." : "Comment"}
              </Button>
            </div>
          </div>
          {/* Comment List Section */}
          <div className="flex flex-col">
            {LoadingComments ? (
              <p>Loading comments...</p>
            ) : commentsList && commentsList.length > 0 ? (
              commentsList.map((commentItem, index) => (
                // Hitung waktu komentar dibuat
                // const projecttTime = timeAgo(commentItem.created_at);
                <div key={index} className="mb-5">
                  <Comment
                    id={commentItem.comment_id}
                    usersessionid={User}
                    usercommentid={commentItem.user.user_id}
                    username={commentItem.user.username}
                    photoProfile={
                      commentItem.user.profile_picture
                        ? `${backendUrl}storage/${commentItem.user.profile_picture}`
                        : "/PlaceHolder.svg"
                    }
                    timeMake={timeAgo(commentItem.created_at)}
                    commentContent={commentItem.content}
                  />
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
      {/* Bagian Alert */}
      <AnimatePresence>
        {errortitle && errordesc && (
          <motion.div
            // initial State
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-10 left-1/2 z-[9999] w-[400px]"
          >
            <Alert
              description={errordesc}
              title={errortitle}
              color="danger"
              onClose={() => {
                setErrortitle(null);
                setErrordesc(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainTemplate>
  );
}

export default UserProjectPage;
