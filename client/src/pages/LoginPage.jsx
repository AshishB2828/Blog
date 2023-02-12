import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import blogApis from '../utils/blogAPI';
import { UserContext } from '../context/UserContetx';

const LoginPage = () => {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() =>{

  }, [])

  async function login(event) {
    event.preventDefault();
    try {
       const data = await blogApis.Account.login({EmailId: emailId, Password: password});
       console.log(data)
       window.localStorage.setItem("token", JSON.stringify(data.token))
        setUserInfo(data)
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