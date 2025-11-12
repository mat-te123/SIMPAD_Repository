// Libraries
import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Input } from '@heroui/react';
import { motion, AnimatePresence } from "framer-motion";

// Komponen
import './Login.css';
import AuthTemplate from '../Template/AuthTemplate';

// Logic
import Check from '../Logic/AccountCheck';

function Login() {
  const navigate = useNavigate(); // untuk navigasi halaman
  const [message, setMessage] = useState(''); // pesan utama
  const [desc, setDesc] = useState(''); // deskripsi tambahan
  const [alert, setAlert] = useState(null); // { color: 'success' | 'danger', title: string, message: string } unutk ngatur warna dan type
  const [formData, setFormData] = useState({ username: '', password: '' }); // data form
  // element unutk heroUI



  //daftar fungsi 


  // buat masukin data ke formdata
  const handelchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // buat handle login
  const loginhandel = async (e) => {
    e.preventDefault(); // cegah reload halaman

    if (!formData.username || !formData.password) {
      setAlert('danger');
      setMessage('Login Failed');
      setDesc('Please enter both username and password.');


      return;
    }

    const accountExists = await Check(formData.username, formData.password);
    // cek akun

    console.log('Account exists:', accountExists); // debug log

    if (accountExists === true) {
      setAlert('success');
      setMessage('Login Successful');
      setDesc('You have successfully logged in.');
      // Simulate a delay before navigation
      setTimeout(() => {
        navigate('/demo'); // arahkan ke halaman demo setelah login sukses
      }, 1000);
    } else {
      setAlert('danger');
      setMessage('Login Failed');
      setDesc('Invalid username or password.');
    }
  };



  return (

    <AuthTemplate title="Log In">
      <form onSubmit={loginhandel} className="Form-Place-Holder" >
        <div className="Input-Place-Holder">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handelchange}

          />
        </div>

        <div className="Input-Place-Holder">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handelchange}
            aria-required="false"


          />
        </div>

        <div className="Remeber-Forgot-Container">
          <div className="Remember-Me">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe"> Remember me</label>
          </div>
          <div className="Forgot-Password">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <div className='w-full '>
          <Button type="submit" className='Login-btn '>
            Log in
          </Button>
        </div>
        <div>
          <AnimatePresence>
            {message && (
              <motion.div
                key="alert"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  color={alert}
                  description={desc}
                  onClose={alert === 'danger' ? () => setMessage('') : null}
                >
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </AuthTemplate>
  );
}

export default Login;
