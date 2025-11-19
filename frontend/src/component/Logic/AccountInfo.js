import axios from "axios";



// Ambil semua data user
async function getAllUser() {
    try {
        const response = await axios.get("http://localhost:8000/api/mahasiswa");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}


// ambil data user berdasarkan ID
async function getUserById(id) {
    try {
        const response = await axios.get(`http://localhost:8000/api/mahasiswa/${id}`);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return [];
        
    }
}

// Update Data User
async function updateUser(id, updatedData) {
    try {
        const response = await axios.post(`http://localhost:8000/api/profile/update`, updatedData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
}

export default {getAllUser, getUserById, updateUser};