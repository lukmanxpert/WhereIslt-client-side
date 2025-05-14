import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleLogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error(error);
        }
    };

    const links = (
        <>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/lost-and-found-items">Lost & Found Items</NavLink>
            {user && (
                <>
                    <NavLink to="/add-lost-and-found-items">Add Lost & Found Item</NavLink>
                    <NavLink to="/all-recovered-items">All Recovered Items</NavLink>
                    <NavLink to="/manage-my-items">Manage My Items</NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="navbar justify-between items-center bg-light_bg dark:bg-dark_bg text-gray-900 dark:text-white sticky top-0 z-[1000] shadow-lg px-4">
            <div className="flex items-center gap-4">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm text-center px-1 dropdown-content bg-gray-200 gap-4 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl hover-btn text-primary bg-transparent hover:bg-transparent hover:border-[#FF9800]">
                    WhereIsIt
                </Link>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {darkMode ? "🌙" : "☀️"}
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-4 px-1 group-hover">
                        {links}
                    </ul>
                </div>
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div title={user?.displayName} tabIndex={0} role="button">
                            <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt="" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-white font-bold dark:bg-gray-800 rounded-box w-52 p-2 shadow"
                        >
                            <li>
                                <button onClick={handleLogOut}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="btn hover-btn text-[#FF9800] bg-transparent hover:bg-transparent hover:border-[#FF9800]">
                            LogIn
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
