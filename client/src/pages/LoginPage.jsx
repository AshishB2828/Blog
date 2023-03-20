import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import blogApis from '../utils/blogAPI';
import { UserContext } from '../context/UserContetx';
import {toast} from 'react-toastify';
import Loading from '../components/Loading';


const LoginPage = () => {

  const [emailId, setEmailId] = useState("")
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false)


  async function login(event) {
    event.preventDefault();
    setLoading(true);
  
    try {
       const data = await blogApis.Account.login({EmailId: emailId, Password: password});
      //  console.log(data)
       window.localStorage.setItem("token", JSON.stringify(data.token))
       window.localStorage.setItem("user", JSON.stringify(data))
        setUserInfo(data)
        setRedirect(true);
        setLoading(false);

        
      } catch (error) {
      console.log(error)
      if(error.response?.status == 400) {
        const errorMsg = error.response.data ?? "Please check the email and password!"
        toast.error(errorMsg, {
          position: toast.POSITION.TOP_LEFT
        });
        
      }
      setLoading(false);
    }
  }

function ValidateLoginFields(fieldName, e){
  if(fieldName == "email"){
    // console.log(fieldName)
    if(!emailId.includes('@')) {
      setEmailInvalid(true)
    }else{
      setEmailInvalid(false)
    }
  }
  if(fieldName == "password"){
    if(!password) setPasswordInvalid(true);
    else setPasswordInvalid(false)
  }
}


if(redirect) {
  return <Navigate to={"/"}/>
}
if(loading) {
  return <Loading />
}
  return (
    <form className='login' onSubmit={login}>
        <h1 >Login</h1>
        <input type="text" placeholder='email' 
        value={emailId} onChange={e => setEmailId(e.target.value)}
          onBlur={e => ValidateLoginFields('email',e)}
        />
        {emailInvalid && <small style={{color:"red"}}>Email Required</small>}
        <input type="password" placeholder='password' value={password} 
        onChange={e => setPassword(e.target.value)} 
        onBlur={e => ValidateLoginFields('password',e)}
        />
       { passwordInvalid && <small style={{color:"red"}}>Password Required</small>}
        
          <button disabled={passwordInvalid || emailInvalid }>Login</button>
    </form>
  )
}

export default LoginPage