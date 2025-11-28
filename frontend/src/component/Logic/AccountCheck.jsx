import axios from 'axios';

// AccountCheck.jsx

export async function checkAccountWithGoogle(email) {
  try {
    const response = await axios.post('http://localhost:8000/api/login/google', {
      email,
    })

    console.log('Account check response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error checking account:', error)
    return false
  }
  
}

export default checkAccountWithGoogle;


