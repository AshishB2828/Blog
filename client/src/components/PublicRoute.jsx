import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { selectCurrentToken } from '../store/authSlice';

const PublicRoute = () => {
    const token = useSelector(selectCurrentToken);
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/"

    return (
        token ? <Navigate to={"/"}/> : 
                <Outlet/>
    )
}

export default PublicRoute