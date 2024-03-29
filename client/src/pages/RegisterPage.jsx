import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import blogApis from '../utils/blogAPI';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';


const RegisterPage = () => {

  const [emailId, setEmailId] = useState("")
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [password2, setPassword2] = useState("")
  const [password2Invalid, setPassword2Invalid] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  async function register(event) {
    event.preventDefault();
    if(password2Invalid || passwordInvalid || emailInvalid ) return;
    try {
       const data = await blogApis.Account.register({EmailId: emailId, Password: password});
       console.log( "Data  => ", data)
        navigate("/login")
      } catch (error) {
      console.log(error)
      const errMsg = error?.response?.data ? error.response.data : "Somethingwent wrong"
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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


  return (
    <form className='login' onSubmit={register}>
        <h1 className='register-header'>Register</h1>
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

          <button disabled={password2Invalid || passwordInvalid || emailInvalid }>{
             loading? "Loading....": "Register"
          }</button>
          <br/>
          <br/>
          <span style={{color: 'white'}}><b>Already have an account &nbsp;&nbsp; <Link style={{color: "rgb(0 106 213)"}} to={"/login"}>Login</Link></b></span>
    </form>
  )
}

export default RegisterPage