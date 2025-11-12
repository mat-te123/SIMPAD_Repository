// library
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@heroui/react';
import { motion, AnimatePresence } from "framer-motion";

// Komponen
import './Register.css'
import AuthTemplate from '../Template/AuthTemplate.jsx';

// logic
import Insert from '../Logic/AccountInsert.jsx';

function Register() {
    const navigate = useNavigate(); // untuk navigasi halaman
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(''); // pesan utama
    const [desc, setDesc] = useState([]); // deskripsi tambahan
    const [alert, setAlert] = useState(null); // { color: 'success' | 'danger', title: string, message: string } unutk ngatur warna dan type



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        setAlert(null);
        setMessage('');
        setDesc([]);


        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            setAlert('danger');
            setMessage('Registration Failed');
            setDesc(['Please fill in all fields.']);
            console.log('Form Data:', formData); // debug log

            return;
        };

        const registerAccount = await Insert(
            formData.first_name,
            formData.last_name,
            formData.email,
            formData.password
        );

        console.log('Account registered:', registerAccount); // debug log

        if (registerAccount.success === true) {
            setAlert('success');
            setMessage('Registration Successful');
            setDesc(['You have successfully registered.']);

            setTimeout(() => {
                navigate('/login'); // arahkan ke halaman login setelah registrasi sukses
            }, 1000);
        } else {
            const allErrors = Object.values(registerAccount.errors).flat(); // gabungkan semua array error
            setAlert('danger');
            setMessage('Registration Failed');
            setDesc(allErrors); // simpan semua error
        }
    };


    return (
        <AuthTemplate title="Register" >
            <form className='Form-Place-Holder' onSubmit={handleSubmit}>
                <div className='Input-Place-Holder'>
                    <div className='First-Last-Name'>
                        <div className='FirstName'>
                            <label>First Name</label>
                            <input name='first_name' type="text" placeholder='First Name' onChange={handleChange} />
                        </div>
                        <div className='LastName'>
                            <label>Last Name</label>
                            <input name='last_name' type="text" placeholder='Last Name' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='Email'>
                        <label>Email</label>
                        <input name='email' type="email" placeholder='Email' onChange={handleChange} />
                    </div>
                    <div className='Password'>
                        <label>Password</label>
                        <input 
                        name='password' 
                        type="password" 
                        placeholder='Password' 
                        onChange={handleChange} />

                    </div>
                    <Button className='Register-btn' type="submit" >
                        Register
                    </Button>
                    <div className="w-full flex flex-col space-y-2">
                        <AnimatePresence>
                            {desc.length > 0 && desc.map((errorMsg, index) => (
                                <motion.div
                                    key={index}
                                    className="w-full"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }} // animasi satu-satu
                                >
                                    <Alert
                                        className="w-full"
                                        key={`${index}-${errorMsg}`}
                                        color={alert}
                                        description={errorMsg}
                                        onClose={() => setDesc(desc.filter((_, i) => i !== index))}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </form>
        </AuthTemplate>
    );
}

export default Register;