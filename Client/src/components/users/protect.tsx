


import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Protect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const isAdmin = Cookies.get('isAdmin');
        if (!token) {
            navigate('/login');
        }

        else {
            if (isAdmin === "false")
                navigate('/user');
        }
    }, [navigate]);

    
    return <>{children}</>
};

