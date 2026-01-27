import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;