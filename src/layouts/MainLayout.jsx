import React from 'react';
import Navbar from '../components/sharedComponents/navbar/Navbar';
import Footer from '../components/sharedComponents/footer/Footer';

const MainLayout = () => {
        return (
                <div>
                       <Navbar></Navbar>
                        <h1 className='h-screen'>Main Layout</h1>

                        <Footer></Footer>
                        
                </div>
        );
};

export default MainLayout;