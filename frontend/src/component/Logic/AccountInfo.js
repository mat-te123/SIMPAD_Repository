import axios from "axios";

const APIURL = "http://localhost:8000/api/";

// Ambil semua data user
async function getAllUser(angkatan, sort) {
  try {
    const params = {
      angkatan: angkatan,
      sort: sort,
    };
    const response = await axios.get(`${APIURL}mahasiswa`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// ambil data user berdasarkan ID
async function getUserById(id) {
  try {
    const response = await axios.get(`${APIURL}mahasiswa/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return [];
  }
}

// Update Data User
async function updateUser(id, updatedData) {
  try {
    const response = await axios.post(`${APIURL}profile/update`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

async function CreateProject(id, projectData) {
  try {
    const response = await axios.post(`${APIURL}addproject`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function UpdateProject(id, projectData) {
  try {
    const response = await axios.post(`${APIURL}editproject/${id}`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    return null;
  }
}

async function DeleteProject(id) {
  try {
    const response = await axios.delete(`${APIURL}deleteproject/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    return null;
  }
}

async function ShowProjectById(id) {
  try {
    const response = await axios.get(`${APIURL}project/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

async function PostComment(Projectid, data) {
  try {
    const response = await axios.post(
      `${APIURL}project/${Projectid}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    return null;
  }
}

async function ShowComments(Projectid) {
  try {
    const response = await axios.get(`${APIURL}project/${Projectid}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

async function DeleteComment(Commentid) {
  try {
    const response = await axios.delete(`${APIURL}comments/${Commentid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  }
}

async function getUsersWithoutProject(projectType) {
    try {
        const response = await axios.get(`${APIURL}users/available`, {
            params: {
                project_type: projectType
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching available users:", error);
        return [];
    }
}

export default {
  getAllUser,
  getUserById,
  updateUser,
  CreateProject,
  DeleteProject,
  ShowProjectById,
  PostComment,
  ShowComments,
  DeleteComment,
  UpdateProject,
  getUsersWithoutProject
};
