import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import blogApis from '../utils/blogAPI';

const LoginPage = () => {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false);

  useEffect(() =>{

  }, [])

  async function login(event) {
    event.preventDefault();
    try {
       const data = await blogApis.Account.login({EmailId: emailId, Password: password});
       console.log(data)
       window.localStorage.setItem("token", JSON.stringify(data.token))
        setRedirect(true);
      
      } catch (error) {
      console.log(error)
    }
  }

if(redirect) {
  return <Navigate to={"/"}/>
}

  return (
    <form className='login' onSubmit={login}>
        <h1 >Login</h1>
        <input type="text" placeholder='email' 
        value={emailId} onChange={e => setEmailId(e.target.value)}/>
        <input type="password" placeholder='password' value={password} 
        onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
    </form>
  )
}

export default LoginPage