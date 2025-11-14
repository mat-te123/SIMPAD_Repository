import axios from "axios";

// Take Company Data from Backend API

export async function CompanyData() {
    try {

        const response = await axios.get("http://localhost:8000/api/company");

        return response.data.status === "error" ? [] : response.data;
        
    } catch (error) {
        console.error("Error fetching company data:", error);
        return [ ]; // Return empty array on error
        
    }
}

// Take Project Data from Backend API

export async function ProjectData() {
    try {

        const response = await axios.get("http://localhost:8000/api/project");

        return response.data.status === "error" ? [] : response.data;
        
    } catch (error) {
        console.error("Error fetching project data:", error);
        return [ ]; // Return empty array on error
        
    }
}



export default {CompanyData, ProjectData};