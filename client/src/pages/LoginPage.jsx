import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAction } from '../store/authSlice';
import blogApis from '../utils/blogAPI';
import {Link} from 'react-router-dom'

const LoginPage = () => {

  const [emailId, setEmailId] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/"
  async function login(event) {
    event.preventDefault();
    try {
       const data = await blogApis.Account.login({EmailId: emailId, Password: password});
      //  console.log(data)
       dispatch(authAction.login({user: data, token: data.token}));
       window.localStorage.setItem("token", JSON.stringify(data.token))
       window.localStorage.setItem("user", JSON.stringify(data))
       navigate("/")        
      } catch (error) {
      console.log(error)
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

  return (
    <form className='login' onSubmit={login}>
        <h1 className='login-header'>Login</h1>
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
          <br/>
          <br/>
          <span style={{color: 'white'}}><b>Don't have an account &nbsp;&nbsp; 
            <Link style={{color: "rgb(0 106 213)"}} to={"/register"}>Register</Link></b></span>
          
    </form>
  )
}

export default LoginPage