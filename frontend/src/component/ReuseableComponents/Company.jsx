import { BackendURL } from "../../utils/axiosClient.js";

function Company({ logo, name }) {
  const baseurl = BackendURL;
  return (
    <div className="flex flex-row items-center justify-center bg-[#E6F1F1] py-[15px] px-[30px] rounded-lg gap-3 shadow-sm min-w-max">
      {/* min-w-max prevents text wrapping and keeps cards tidy */}
      <img
        src={`${baseurl}storage/${logo}`}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border bg-white"
      />
      <span className="text-[18px] font-bold text-[#697077] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
export default Company;
