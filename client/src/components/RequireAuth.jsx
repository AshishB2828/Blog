import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { selectCurrentToken } from '../store/authSlice';

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return (
        token ? <Outlet/> : 
                <Navigate 
                    to={"/login"}
                    replace
                    />

    )
}

export default RequireAuth