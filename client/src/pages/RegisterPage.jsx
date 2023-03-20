import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import blogApis from '../utils/blogAPI';

const RegisterPage = () => {

  const [emailId, setEmailId] = useState("")
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [password2, setPassword2] = useState("")
  const [password2Invalid, setPassword2Invalid] = useState(false)
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false)


  async function register(event) {
    event.preventDefault();
    if(password2Invalid || passwordInvalid || emailInvalid ) return;
    setLoading(true);
    try {
       const data = await blogApis.Account.register({EmailId: emailId, Password: password});
       console.log( "Data  => ", data)
        setRedirect(true);
        setLoading(false);
      } catch (error) {
      console.log(error)
      if(error.response?.status == 400){
        const errMsg = error.response?.data ?? "Something went wrong!"
        toast.error(errMsg)
      }
      setLoading(false);
    }
  }

function ValidateLoginFields(fieldName, e){
  if(fieldName == "email"){
    console.log(fieldName)
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
  if(fieldName == "password2"){
    console.log({password, password2})
    if(password!= password2) setPassword2Invalid(true);
    else setPassword2Invalid(false)
  }
}


function ValidateFieldOnKeyUp(fieldName, e){
  if(fieldName == 'password2'){
    if(password === password2) setPassword2Invalid(false)
    else setPassword2Invalid(true)
  }
}

if(redirect) {
  return <Navigate to={"/login"}/>
}

if(loading) {
  return <Loading/>
}

  return (
    <form className='login' onSubmit={register}>
        <h1 >Register</h1>
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
        <input type="password" placeholder='confirm-password' value={password2} 
        onChange={e => setPassword2(e.target.value)} 
        onBlur={e => ValidateLoginFields('password2',e)}
        onKeyDown={e => ValidateFieldOnKeyUp('password2',e)}
        />
        {password2Invalid && <small style={{color:"red"}}>Password and Confirm Password don't match</small>}

          <button disabled={password2Invalid || passwordInvalid || emailInvalid }>Register</button>
    </form>
  )
}

export default RegisterPage