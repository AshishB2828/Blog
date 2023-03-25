import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = () => {
    const token = useSelector(state => state.token);
    const location = useLocation();

    return (
        token ? <Outlet/> : 
                <Navigate 
                    to={"/login"}
                    state={{from: location}}
                    replace
                    />
    )
}

export default RequireAuth