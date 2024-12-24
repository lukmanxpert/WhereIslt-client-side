import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const handleLogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error(error);
        }
    }
    const links = <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/lost-and-found-items">Lost & Found Items</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 z-[1000] shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm gap dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl hover-btn text-[#FF9800] bg-transparent hover:bg-transparent hover:border-[#FF9800]">WhereIsIt</Link>
            </div>
            <div className='navbar-end gap-6'>
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-4 px-1">
                        {links}
                    </ul>
                </div>
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div title={user?.displayName} tabIndex={0} role="button" className="">
                                <img className='h-10 w-10 rounded-full' src={user?.photoURL} alt="" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow">
                                <li>
                                    <NavLink to="/add-lost-and-found-items">Add Lost & Found Item Page</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/all-recovered-items">All Recovered Items Page</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manage-my-items">Manage My Items Page</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogOut}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="btn hover-btn text-[#FF9800] bg-transparent hover:bg-transparent hover:border-[#FF9800]">LogIn</Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;