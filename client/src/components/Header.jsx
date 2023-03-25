import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom'
import blogApis from '../utils/blogAPI';
import { useNavigate } from "react-router-dom";
import { isTokenExist } from '../utils/getToken';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/authSlice';

const Header = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
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
    <header>
    <Link to={"/"} className="logo">MyBlog</Link>
    <nav>
      {!isLoggedIn && 
      <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </>}
      {
        isLoggedIn && 
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