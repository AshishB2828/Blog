import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContetx';
import blogApis from '../utils/blogAPI';

const Header = () => {

  const [emailId, setEmailId] = useState(null)
  const { userInfo, setUserInfo } = useContext(UserContext)
  useEffect(() => {
      checkUserAuthenticated();
  },[])

  async function checkUserAuthenticated(){
    try {
      let response = await blogApis.Account.profile();
      //console.log(response);
      setUserInfo(response);
    } catch (error) {
      console.log(error)
    }
  }

 async function logout(){
  localStorage.removeItem("token");
  setUserInfo(null);
}

  return (
    <header>
    <Link to={"/"} className="logo">MyBlog</Link>
    <nav>
      {!userInfo?.emailId && 
      <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </>}
      {
        userInfo?.emailId && 
        <>
          <NavLink to={"/create-post"}>create new post</NavLink>
          <a onClick={logout}>logout</a>
        </>
      }
    </nav>
  </header>
    )
}

export default Header