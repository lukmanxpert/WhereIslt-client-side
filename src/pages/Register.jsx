import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Register = () => {
    const { registerUser, googleLogin, setUser, updateUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        // Handle register logic here
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one special character');
            return;
        }
        try {
            registerUser(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    updateUser(name, photoUrl);
                    toast.success('Registration successful');
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = () => {
        // Handle Google login logic here
        googleLogin()
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            }
            );
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark_bg">
            <Helmet>
                <title>Register | WhereIsIt</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-950 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center dark:text-white">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="w-full dark:bg-dark_bg px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoUrl"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="Enter your photo URL"
                            required
                            className="w-full dark:bg-dark_bg px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full dark:bg-dark_bg px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full dark:bg-dark_bg px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Register
                    </button>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
                    >
                        <FaGoogle className="mr-2" />
                        Login with Google
                    </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;