import { Button } from "@heroui/react";



function UserProjectContent({ imageSrc, name, detail, role, filter }) {
  return (
    <div className="w-fit h-fit flex flex-col items-start justify-start gap-10">
      <img src={imageSrc ? imageSrc : "/PlaceHolder.svg"} alt="" />
      <h1>
        {name}
      </h1>
      <h2>
        {detail}
      </h2>
      <span>
        {"Role: " + role}
      </span>
      <Button className="bg-[#017777] border-1 border-[#044645] text-white mt-4"
      radius="sm"
      endContent={
        <img
          src="/Arrow.svg"
          alt="Arrow Right"
          width="24"
          height="24"
        />
      }>
        Explore PAD
      </Button>
    </div>
  );
}

export default UserProjectContent;
