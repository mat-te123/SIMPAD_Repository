import axios from "axios";


const APIURL = "http://localhost:8000/api/";

// Ambil semua data user
async function getAllUser() {
    try {
        const response = await axios.get(`${APIURL}mahasiswa`);
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
        
    } catch (error) {
        console.error("Error creating project:", error);
        return null;
    }
    
}

export default {getAllUser, getUserById, updateUser, CreateProject};