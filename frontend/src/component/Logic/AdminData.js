import axios from "axios";

const BASE_URL = "http://localhost:8000/api/admin";

const AdminData = {
  // ... (Keep existing GET and POST functions) ...

  getAllUsers: async (token) => {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  getAllProjects: async (token) => {
    const response = await axios.get(`${BASE_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  getAllCompanies: async (token) => {
    const response = await axios.get(`${BASE_URL}/companies`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  getAllComments: async (token) => {
    const response = await axios.get(`${BASE_URL}/comments`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  AddCompany: async (token, companyData) => {
    const response = await axios.post(`${BASE_URL}/addcompany`, companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // --- NEW DELETE FUNCTIONS ---

  deleteUser: async (token, id) => {
    const response = await axios.delete(`${BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  deleteProject: async (token, id) => {
    const response = await axios.delete(`${BASE_URL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  deleteCompany: async (token, id) => {
    const response = await axios.delete(`${BASE_URL}/companies/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  deleteComment: async (token, id) => {
    const response = await axios.delete(`${BASE_URL}/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  }
};

export default AdminData;