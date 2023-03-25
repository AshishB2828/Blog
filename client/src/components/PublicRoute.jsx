import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const PublicRoute = () => {
    const token = useSelector(state => state.token);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    return (
        token ? <Navigate to={from}/> : 
                <Outlet/>
    )
}

export default PublicRoute