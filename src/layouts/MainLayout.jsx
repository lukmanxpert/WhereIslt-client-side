import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=''>
                <Outlet></Outlet>
                <Toaster position='top-right'></Toaster>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;