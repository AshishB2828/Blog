import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const location = useLocation();

    return (
        isLoggedIn ? <Outlet/> : 
                <Navigate 
                    to={"/login"}
                    state={{from: location}}
                    replace
                    />
    )
}

export default RequireAuth