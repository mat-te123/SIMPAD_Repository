import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import AccountInfo from "../Logic/AccountInfo.js";
import { useEffect, useState } from "react";
import { BackendURL } from "../../utils/axiosClient.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./navbar.css";

function Navbar({ title, isSearchbar, SearchData }) {
  const backendurl = BackendURL;
  const logo = "/sim.svg";
  const search = "/SearchIcon.svg";
  const profile = "/user.svg";
  const navigate = useNavigate();
  const hovercss =
    "hover:border-b-1 hover:border-[#044645] active:text-[#044645]";
  const activecss = "border-b-2 border-[#044645] text-[#044645] font-semibold";

  const { User, Token, LogOut, isAdmin } = useAuth();
  console.log("is user admin:", isAdmin);
  const [MahasiswaName, setMahasiswaName] = useState("");

  useEffect(() => {
    const fetchMahasiswaName = async () => {
      if (User) {
        try {
          const result = await AccountInfo.getUserById(User);
          setMahasiswaName(result.username);
        } catch (error) {
          console.error("Error fetching Mahasiswa name:", error);
        }
      } else {
        setMahasiswaName("");
      }
    };
    fetchMahasiswaName();
  }, [User]);

  const LogOutHandle = () => {
    LogOut();
    navigate("/login");
  };

  const LoginButton = () => {
    navigate("/login");
  };

  // Search logic
  const [SearchTerm, setSearchTerm] = useState("");
  const [SeactResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0 && Array.isArray(SearchData) && SearchData.length > 0) {
      const firstItem = SearchData[0];

      if (firstItem.hasOwnProperty("user_id")) {
        // Search Mahasiswa by Username
        const results = SearchData.filter((item) =>
          item.username?.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
      } else if (firstItem.hasOwnProperty("project_id")) {
        // Search Project by Title
        const results = SearchData.filter((item) =>
          item.title?.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  };

  const resultHandleClick = (item) => {
    if (item.user_id) {
      navigate(`/Mahasiswa/${item.user_id}`);
    } else {
      navigate(`/Project/${item.project_id}`);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="flex items-center justify-between gap-5 h-[60px] w-full p-10 py-2">
      <div className="flex flex-row items-center justify-start gap-10">
        <img src={logo} alt="Logo SimPAD" className="object-cover w-9 h-9" />
        <div className="flex items-center justify-items-start gap-10 w-[80%]">
          <div className={`${isSearchbar ? "flex" : "hidden"}`}>
            <div className="relative flex flex-col w-full">
              <Input
                endContent={
                  <img src={search} alt="Logo Search" width="25" height="25" />
                }
                placeholder="search"
                size="sm"
                radius="md"
                classNames={{
                  input: "w-[500px]",
                  inputWrapper: "border-1 border-[#D3E1E1] bg-[#E9EBEB]",
                }}
                value={SearchTerm}
                onChange={handleSearchChange}
              />
              {SearchTerm.length > 0 && (
                <div className="absolute top-full z-10 w-full h-auto max-h-60 overflow-y-auto mt-2 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col">
                  {SeactResults.length > 0 ? (
                    SeactResults.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => resultHandleClick(item)}
                        className="cursor-pointer w-full bg-white hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
                      >
                        <div className="w-full flex flex-row items-center p-2">
                          <img
                            src={
                              item.cover_image_url
                                ? `${backendurl}storage/${item.cover_image_url}`
                                : item.profile_picture
                                ? `${backendurl}storage/${item.profile_picture}`
                                : "/PlaceHolder.svg"
                            }
                            alt={item.title || item.username}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex flex-col ml-3">
                            <span className="text-[1rem] font-medium text-gray-800">
                              {item.title || item.username}
                            </span>
                            <span className="text-[0.8rem] text-gray-500">
                              {item.project_type
                                ? item.project_type
                                : `Mahasiswa TRPL ${item.angkatan || ""}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // REMOVED: absolute top-full
                    <div className="p-4 text-sm text-gray-500 text-center">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-20 font-thin text-sm text-black-600">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activecss : hovercss)}
            >
              Home
            </NavLink>
            <NavLink
              to="/Project"
              className={({ isActive }) => (isActive ? activecss : hovercss)}
            >
              Project
            </NavLink>
            <NavLink
              to="/Mahasiswa"
              className={({ isActive }) => (isActive ? activecss : hovercss)}
            >
              Mahasiswa
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) => (isActive ? activecss : hovercss)}
            >
              About
            </NavLink>
          </nav>
        </div>
      </div>

      {/* User Profile / Login */}
      <div className="flex items-center gap-4">
        {Token ? (
          <div className="flex items-center gap-2">
            <Dropdown placement="bottom-end" shouldBlockScroll={false}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="border border-[#044645] bg-[#017777] text-white rounded-full"
                >
                  <img
                    src={profile}
                    alt="Logo Profile"
                    width="25"
                    height="25"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu" variant="shadow">
                <DropdownSection>
                  <DropdownItem
                    key="profile"
                    className="font-bold text-[#044645]"
                    description={isAdmin? "View Dashboard" : "View user profile"}
                    color="primary"
                    onPress={() =>
                      navigate(
                        isAdmin ? "/admin/dashboard" : `/Mahasiswa/${User}`
                      )
                    }
                  >
                    {isAdmin
                      ? `${MahasiswaName}(admin)`
                      : MahasiswaName
                      ? ` ${MahasiswaName}`
                      : "Profile"}
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                  <DropdownItem
                    key="logout"
                    className="text-red-600 font-semibold"
                    onPress={LogOutHandle}
                    color="danger"
                    startContent={
                      <img
                        src="/exit.svg"
                        alt="Logout"
                        width="20"
                        height="20"
                      />
                    }
                  >
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <Button
            size="sm"
            className="LoginButton drop-shadow-md"
            onPress={LoginButton}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
