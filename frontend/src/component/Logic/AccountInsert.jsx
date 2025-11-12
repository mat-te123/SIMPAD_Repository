import axios from 'axios';

// AccountCheck.jsx
export async function checkAccount(first_name, last_name, email, password) {
  try {
    const response = await axios.post('http://localhost:8000/api/register', { 
      first_name, 
      last_name,
      email,
      password 
    });
    return {success: true}; // mengembalikan true atau false berdasarkan respons dari server
  } catch (error) {
    if (error.response && error.response.data) {
        return {
            status: 'error',
            errors: error.response.data
        };
    } else {
        return {
            status: 'error',
            errors: {
                general: ["An unexpected error occurred"]
            }
        };
        
        }
    
  }
}

export default checkAccount;
