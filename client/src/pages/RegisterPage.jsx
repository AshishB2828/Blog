import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

const RegisterPage = () => {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() =>{

  }, [])

  async function register(event) {
    event.preventDefault();
    try {
       const {data} = await axios.post("https://localhost:7019/api/account/register",{emailId, password});
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='register' onSubmit={register}>
      <h1 >Register</h1>
        <input type="text" placeholder='email' 
        value={emailId} onChange={e => setEmailId(e.target.value)}/>
        <input type="password" placeholder='password' value={password} 
        onChange={e => setPassword(e.target.value)} />
        <button>Register</button>
    </form>
  )
}

export default RegisterPage