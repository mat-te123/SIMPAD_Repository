import AdminData from "../Logic/AdminData";
import MainTemplate from "../Template/MainTemplate";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { BackendURL } from "../../utils/axiosClient";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  Input,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

// Optional: Simple Icons (You can replace these with your preferred icon library like lucide-react or heroicons)
const SearchIcon = () => (
  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="text-default-400 pointer-events-none flex-shrink-0"><path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
);

function DashBoard() {
  const navigate = useNavigate();
  const Baseurl = BackendURL;
  const { Token, isAdmin } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State for Counts & Data
  const [TotalUsers, setTotalUsers] = useState(0);
  const [TotalProjects, setTotalProjects] = useState(0);
  const [TotalCompanies, setTotalCompanies] = useState(0);
  const [TotalComments, setTotalComments] = useState(0);

  const [UsersData, setUsersData] = useState([]);
  const [ProjectsData, setProjectsData] = useState([]);
  const [CompaniesData, setCompaniesData] = useState([]);
  const [CommentsData, setCommentsData] = useState([]);

  // UI Control State
  const [SelectedTable, setSelectedTable] = useState("users");
  const [SearchQuery, setSearchQuery] = useState("");

  // --- FETCH DATA ---
  const fetchDashboardData = async () => {
    if (!Token || !isAdmin) return;
    try {
      const users = await AdminData.getAllUsers(Token);
      setTotalUsers(users.total || 0);
      setUsersData(users.data || []);

      const projects = await AdminData.getAllProjects(Token);
      setTotalProjects(projects.total || 0);
      setProjectsData(projects.data || []);

      const companies = await AdminData.getAllCompanies(Token);
      setTotalCompanies(companies.total || 0);
      setCompaniesData(companies.data || []);

      const comments = await AdminData.getAllComments(Token);
      setTotalComments(comments.total || 0);
      setCommentsData(comments.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [Token, isAdmin]);

  // --- ACTIONS: ADD COMPANY ---
  const ActionHandleClick = async () => {
    const imageFile = document.getElementById("image").files[0];
    const companyName = document.getElementById("name").value;

    const formData = new FormData();
    formData.append("company_image", imageFile);
    formData.append("company_name", companyName);

    try {
      await AdminData.AddCompany(Token, formData);
      onOpenChange(); // Close modal
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Failed to add company.");
    }
  };

  // --- ACTIONS: DELETE ---
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      return;
    }

    try {
      if (type === "user") {
        await AdminData.deleteUser(Token, id);
        setUsersData((prev) => prev.filter((item) => item.user_id !== id));
        setTotalUsers((prev) => prev - 1);
      } else if (type === "project") {
        await AdminData.deleteProject(Token, id);
        setProjectsData((prev) => prev.filter((item) => item.project_id !== id));
        setTotalProjects((prev) => prev - 1);
      } else if (type === "company") {
        await AdminData.deleteCompany(Token, id);
        setCompaniesData((prev) => prev.filter((item) => item.company_id !== id));
        setTotalCompanies((prev) => prev - 1);
      } else if (type === "comment") {
        await AdminData.deleteComment(Token, id);
        setCommentsData((prev) => prev.filter((item) => item.comment_id !== id));
        setTotalComments((prev) => prev - 1);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}.`);
    }
  };

  // --- SEARCH FILTER LOGIC ---
  const filteredData = useMemo(() => {
    const lowerQuery = SearchQuery.toLowerCase();
    
    if (SelectedTable === "users") {
      return UsersData.filter((user) => 
        user.username.toLowerCase().includes(lowerQuery) || 
        user.email.toLowerCase().includes(lowerQuery) ||
        (user.nim && user.nim.toString().includes(lowerQuery))
      );
    } 
    if (SelectedTable === "projects") {
      return ProjectsData.filter((project) => 
        project.title.toLowerCase().includes(lowerQuery) || 
        project.team_name.toLowerCase().includes(lowerQuery)
      );
    }
    if (SelectedTable === "companies") {
      return CompaniesData.filter((company) => 
        company.company_name.toLowerCase().includes(lowerQuery)
      );
    }
    if (SelectedTable === "comments") {
      return CommentsData.filter((comment) => 
        comment.content.toLowerCase().includes(lowerQuery) ||
        (comment.project && comment.project.title.toLowerCase().includes(lowerQuery)) ||
        (comment.user && comment.user.username.toLowerCase().includes(lowerQuery))
      );
    }
    return [];
  }, [SearchQuery, SelectedTable, UsersData, ProjectsData, CompaniesData, CommentsData]);


  return (
    <MainTemplate>
      <div className="p-15 mt-10 px-40">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-blue-500">
            <h2 className="text-gray-500 font-medium">Total Users</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">{TotalUsers}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-green-500">
            <h2 className="text-gray-500 font-medium">Total Projects</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">{TotalProjects}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-purple-500">
            <h2 className="text-gray-500 font-medium">Total Companies</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">{TotalCompanies}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-gray-500 font-medium">Total Comments</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">{TotalComments}</p>
          </div>
        </div>

        {/* --- TABLE CONTROLS (SEARCH & FILTER) --- */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold capitalize">
              {SelectedTable} Directory
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              {/* Search Input */}
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[15rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder={`Search ${SelectedTable}...`}
                size="sm"
                startContent={<SearchIcon />}
                type="search"
                value={SearchQuery}
                onValueChange={setSearchQuery} // HeroUI specific prop for onChange
              />

              {/* Table Selection Dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="solid" color="primary" className="bg-[#017777] border-1 border-[#044645] radius-lg p-5">
                    View: {SelectedTable.charAt(0).toUpperCase() + SelectedTable.slice(1)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Table Selection"
                  onAction={(key) => {
                    setSelectedTable(key);
                    setSearchQuery(""); // Clear search when switching tables
                  }}
                >
                  <DropdownItem key="users">Users</DropdownItem>
                  <DropdownItem key="projects">Projects</DropdownItem>
                  <DropdownItem key="companies">Companies</DropdownItem>
                  <DropdownItem key="comments">Comments</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {/* Add Company Button */}
              {SelectedTable === "companies" && (
                <Button onPress={onOpen} className="bg-[#DBE7E8] border-1 border-[#044645] radius-lg">Add New Company</Button>
              )}
            </div>
          </div>

          {/* Add Company Modal */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Add New Company</ModalHeader>
                  <ModalBody>
                    <label htmlFor="image" className="text-sm font-semibold">Company Logo</label>
                    <input type="file" id="image" name="image" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"/>
                    
                    <label htmlFor="name" className="text-sm font-semibold">Company Name</label>
                    <Input id="name" name="name" placeholder="Enter company name" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                    <Button color="primary" onPress={ActionHandleClick}>Save</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* --- TABLE DISPLAY --- */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-sm uppercase text-gray-600">
                  {/* Dynamic Headers based on selection */}
                  {SelectedTable === "users" && (
                    <>
                      <th className="px-4 py-3 border text-left">ID</th>
                      <th className="px-4 py-3 border text-left">User Profile</th>
                      <th className="px-4 py-3 border text-left">Email</th>
                      <th className="px-4 py-3 border text-left">NIM</th>
                      <th className="px-4 py-3 border text-center">Actions</th>
                    </>
                  )}
                  {SelectedTable === "projects" && (
                    <>
                      <th className="px-4 py-3 border text-left">ID</th>
                      <th className="px-4 py-3 border text-left">Project</th>
                      <th className="px-4 py-3 border text-left">Team</th>
                      <th className="px-4 py-3 border text-left">Year</th>
                      <th className="px-4 py-3 border text-left">Type</th>
                      <th className="px-4 py-3 border text-center">Actions</th>
                    </>
                  )}
                  {SelectedTable === "companies" && (
                    <>
                      <th className="px-4 py-3 border text-left">ID</th>
                      <th className="px-4 py-3 border text-left">Image</th>
                      <th className="px-4 py-3 border text-left">Name</th>
                      <th className="px-4 py-3 border text-left">Joined Date</th>
                      <th className="px-4 py-3 border text-center">Actions</th>
                    </>
                  )}
                  {SelectedTable === "comments" && (
                    <>
                      <th className="px-4 py-3 border text-left">ID</th>
                      <th className="px-4 py-3 border text-left">Content</th>
                      <th className="px-4 py-3 border text-left">Project</th>
                      <th className="px-4 py-3 border text-left">User</th>
                      <th className="px-4 py-3 border text-left">Date Posted</th>
                      <th className="px-4 py-3 border text-center">Actions</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="text-gray-700 text-sm">
                {/* 1. USERS */}
                {SelectedTable === "users" && filteredData.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border">{user.user_id}</td>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold overflow-hidden">
                          {user.profile_picture ? (
                            <img src={user.profile_picture} alt="" className="w-full h-full object-cover" />
                          ) : (
                            user.username.charAt(0).toUpperCase()
                          )}
                        </div>
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border">{user.email}</td>
                    <td className="px-4 py-3 border">{user.nim || "-"}</td>
                    <td className="px-4 py-3 border text-center">
                      <Button 
                        size="sm" 
                        color="danger" 
                        variant="flat" 
                        onPress={() => handleDelete(user.user_id, "user")}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* 2. PROJECTS */}
                {SelectedTable === "projects" && filteredData.map((project) => (
                  <tr key={project.project_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border">{project.project_id}</td>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center gap-3">
                        {project.cover_image_url && (
                          <img src={project.cover_image_url} alt="Cover" className="w-12 h-8 object-cover rounded shadow-sm" />
                        )}
                        <span className="font-bold text-blue-600 hover:underline cursor-pointer" onClick={() => navigate(`/project/${project.project_id}`)}>{project.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border">{project.team_name}</td>
                    <td className="px-4 py-3 border">{project.project_year}</td>
                    <td className="px-4 py-3 border">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs border border-gray-300">
                        {project.project_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <Button 
                        size="sm" 
                        color="danger" 
                        variant="flat" 
                        onPress={() => handleDelete(project.project_id, "project")}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* 3. COMPANIES */}
                {SelectedTable === "companies" && filteredData.map((company) => (
                  <tr key={company.company_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border">{company.company_id}</td>
                    <td className="px-4 py-3 border">
                      <img 
                        src={`${Baseurl}storage/${company.company_image}`} 
                        alt="Logo" 
                        className="w-10 h-10 rounded-full object-cover border" 
                        onError={(e) => {e.target.src = "https://via.placeholder.com/40"}} // Fallback image
                      />
                    </td>
                    <td className="px-4 py-3 border">{company.company_name}</td>
                    <td className="px-4 py-3 border">
                      {new Date(company.created_at).toLocaleDateString("id-ID", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <Button 
                        size="sm" 
                        color="danger" 
                        variant="flat" 
                        onPress={() => handleDelete(company.company_id, "company")}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {/* 4. COMMENTS */}
                {SelectedTable === "comments" && filteredData.map((comment) => (
                  <tr key={comment.comment_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border">{comment.comment_id}</td>
                    <td className="px-4 py-3 border">{comment.content}</td>
                    <td className="px-4 py-3 border">
                      {comment.project ? (
                        <span className="font-bold text-blue-600 hover:underline cursor-pointer" onClick={() => navigate(`/project/${comment.project.project_id}`)}>
                          {comment.project.title}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-3 border">
                      {comment.user ? comment.user.username : "N/A"}
                    </td>
                    <td className="px-4 py-3 border">
                      {new Date(comment.created_at).toLocaleDateString("id-ID", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <Button 
                        size="sm" 
                        color="danger" 
                        variant="flat" 
                        onPress={() => handleDelete(comment.comment_id, "comment")}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* EMPTY STATE */}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500 bg-gray-50">
                      {SearchQuery ? `No results found for "${SearchQuery}"` : `No data found for ${SelectedTable}.`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}

export default DashBoard;