import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { googleLogin, setUser, signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const userCredential = await googleLogin();
            setUser(userCredential.user);
            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            signInUser(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    toast.success('Login successful');
                    navigate('/');
                })
                .catch((error) => {
                    toast.error(error.message);
                    console.log(error);
                });
        } catch (error) {
            toast.error('error.message');
            console.error(error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark_bg px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Login | WhereIsIt</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-950 rounded shadow-md">
                <h2 className="text-2xl font-bold dark:text-white text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium dark:text-white text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full dark:bg-dark_bg px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full dark:bg-dark_bg px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Login
                    </button>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <button onClick={handleGoogleLogin}
                        type="button"
                        className="flex items-center px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
                    >
                        <FaGoogle className="mr-2" />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;