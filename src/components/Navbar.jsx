import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const links = <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/lost-and-found-items">Lost & Found Items</NavLink>
    </>
    return (
        <div className="navbar bg-base-100">
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
                <div>
                    <Link to="/login" className="btn hover-btn text-[#FF9800] bg-transparent hover:bg-transparent hover:border-[#FF9800]">LogIn</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;