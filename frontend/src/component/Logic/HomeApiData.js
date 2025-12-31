import axios from "axios";

// Take Company Data from Backend API

const APIURL = "http://localhost:8000/api/";

export async function CompanyData() {
    try {

        const response = await axios.get(`${APIURL}company`);

        return response.data.status === "error" ? [] : response.data;
        
    } catch (error) {
        console.error("Error fetching company data:", error);
        return [ ]; // Return empty array on error
        
    }
}

// Take Project Data from Backend API

export async function ProjectData() {
    try {

        const response = await axios.get(`${APIURL}project`);

        return response.data.status === "error" ? [] : response.data;
        
    } catch (error) {
        console.error("Error fetching project data:", error);
        return [ ]; // Return empty array on error
        
    }
}

async function Pagination(page, type="PAD 1", Sort) {
    try {

        const params = {
            page: page,
            project_type: type,
            sort: Sort
        }
        const response = await axios.get(`${APIURL}projects`, { params });
        return response.data;
        
    } catch (error) {
        console.error("Error fetching paginated projects:", error);
        return null;
    }
    
}



export default {CompanyData, ProjectData, Pagination};