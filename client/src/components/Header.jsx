import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authAction, selectCurrentToken, selectCurrentUser } from '../store/authSlice';

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    
  },[])

 async function logout(){
  dispatch(authAction.logout());
   localStorage.removeItem("user");
   navigate("/login")
  }

  // if(loading) return <h1>Loading .....</h1>
  return (
    <header >
      <nav className='navbar'>
      <Link to={"/"} className="logo">MyBlog</Link>

        <div>
          {
             isLoggedIn && 
             <>
               <NavLink to={"/create-post"}><b>create new post</b></NavLink>
               <NavLink to={"/my-posts"}><b>my posts</b></NavLink>
               </>
          }
        </div>
        <div>
          {!isLoggedIn && 
          <>
            <Link to={"/login"}><b>Login</b></Link>
            <Link to={"/register"}><b>Register</b></Link>
          </>}
          {
            isLoggedIn && 
            <>
              <span><b>{user?.emailId}</b></span>
              <a onClick={logout}><b>logout</b></a>
            </>
          }
        </div>
      </nav>
  </header>
    )
}

export default Header