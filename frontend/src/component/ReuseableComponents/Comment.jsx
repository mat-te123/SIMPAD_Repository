function Comment({ idUser }) {
  const ProfilePicture = "./PlaceHolder.svg";
  const username = "Username";
  const TimeMake = "2 hours ago";
  const CommentContent = "This is a sample comment content.";
  return (
    <div className="flex flex-row items-center gap-5">
      <img
        src={ProfilePicture}
        alt="profile picture"
        className="h-13 w-13 rounded-full object-cover"
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-5 items-center w-full">
          <h1 className="text-lg font-bold">{username}</h1>
          <span className="text-sm font-light text-gray-500">{TimeMake}</span>
        </div>
        <h2>{CommentContent}</h2>
      </div>
    </div>
  );
}

export default Comment;
