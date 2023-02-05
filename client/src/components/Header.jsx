import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import blogApis from '../utils/blogAPI';

const Header = () => {

  const [emailId, setEmailId] = useState(null)

  useEffect(() => {
      checkUserAuthenticated();
  },[])

  async function checkUserAuthenticated(){
    try {
      let response = await blogApis.Account.profile();
      console.log(response);
      setEmailId(response?.emailId)

    } catch (error) {
      console.log(error)
    }
  }

 async function logout(){
  localStorage.removeItem("token");
  setEmailId(null)
 }

  return (
    <header>
    <Link to={"/"} className="logo">MyBlog</Link>
    <nav>
      {!emailId && 
      <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </>}
      {
        emailId && 
        <>
          <NavLink to={"/create"}>create new post</NavLink>
          <a onClick={logout}>logout</a>
        </>
      }
    </nav>
  </header>
    )
}

export default Header