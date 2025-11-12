import axios from 'axios';

// AccountCheck.jsx
export async function checkAccount(username, password) {
  try {
    const response = await axios.post('http://localhost:8000/api/login', { 
      username, 
      password 
    });
    return response.data.status  === 'success' ; // mengembalikan true atau false berdasarkan respons dari server
  } catch (error) {
    console.error('Error checking account:', error);
    return false; // jika ada error, anggap akun tidak ada
    
  }
}

export async function checkAccountWithGoogle(email) {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email,
    })
    return response.data.status === 'success';
  } catch (error) {
    console.error('Error checking account:', error)
    return false
  }
  
}

export default checkAccount; checkAccountWithGoogle


