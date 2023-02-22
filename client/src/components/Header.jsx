import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContetx';
import blogApis from '../utils/blogAPI';
import { useNavigate } from "react-router-dom";
import { isTokenExist } from '../utils/getToken';

const Header = () => {

  const [emailId, setEmailId] = useState(null)
  const [loading, setLoading] = useState(true)
  const { userInfo, setUserInfo } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(isTokenExist()){
        checkUserAuthenticated();
      }else{
        navigate("/login")
      }
  },[userInfo?.id])

  async function checkUserAuthenticated(){
    try {
      setLoading(true)
      let response = await blogApis.Account.profile();
      let token  = window.localStorage.getItem('token');
      setUserInfo({...response, token});
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

 async function logout(){
  localStorage.removeItem("token");
  setUserInfo(null);
  navigate("/login")
  }

  // if(loading) return <h1>Loading .....</h1>
  return (
    <header>
    <Link to={"/"} className="logo">MyBlog</Link>
    <nav>
      {!userInfo?.id && 
      <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </>}
      {
        userInfo?.id && 
        <>
          <NavLink to={"/create-post"}>create new post</NavLink>
          <NavLink to={"/my-posts"}>my posts</NavLink>
          <a onClick={logout}>logout</a>
        </>
      }
    </nav>
  </header>
    )
}

export default Header