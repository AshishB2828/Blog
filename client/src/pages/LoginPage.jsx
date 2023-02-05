import React, { useEffect, useState } from 'react'
import axios from 'axios';

const LoginPage = () => {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() =>{

  }, [])

  async function login(event) {
    event.preventDefault();
    try {
       const {data} = await axios.post("https://localhost:7019/api/account/login",{emailId, password});
    } catch (error) {
      console.log(error)
    }
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