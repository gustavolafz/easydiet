import React from 'react';
import NavBar from '../components/NavBar';

const PrivateLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    );
};

export default PrivateLayout;