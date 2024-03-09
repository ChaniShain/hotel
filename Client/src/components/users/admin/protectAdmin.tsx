


import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [isPermission, setisPermission] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get('token');
        const isAdmin = Cookies.get('isAdmin');
        if (!token) {
            navigate('/login');
        }

        else {
            
            if (isAdmin === "false"){
                navigate('/login');

            }
            else
                setisPermission(true)
        }
    }, [navigate]);


    return isPermission?<>{children}</>:null
};

