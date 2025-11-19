import axios from 'axios';

// AccountCheck.jsx

export async function checkAccountWithGoogle(email) {
  try {
    const response = await axios.post('http://localhost:8000/api/login/google', {
      email,
    })
    return response.data.status === 'success';
  } catch (error) {
    console.error('Error checking account:', error)
    return false
  }
  
}

export default checkAccountWithGoogle;


