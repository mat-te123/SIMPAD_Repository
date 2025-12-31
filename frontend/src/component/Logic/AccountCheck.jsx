import axios from 'axios';

// AccountCheck.jsx
export async function checkAccountWithGoogle(email) {
  try {
    const response = await axios.post('http://localhost:8000/api/login/google', {
      email,
    });
    
    // Scenario 1: Backend returns 200 OK
    console.log('Account check response:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error checking account:', error);

    if (error.response && error.response.data) {
        return error.response.data; 
    }
    
    return { status: "error", message: "Network error. Please check your connection." };
  }
}

export default checkAccountWithGoogle;