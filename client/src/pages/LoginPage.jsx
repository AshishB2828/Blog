import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAction } from '../store/authSlice';
import blogApis from '../utils/blogAPI';
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

const LoginPage = () => {

  const [emailId, setEmailId] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    setLoading(true)
    try {
       const data = await blogApis.Account.login({EmailId: emailId, Password: password});
       dispatch(authAction.login({user: data, token: data.token}));
       window.localStorage.setItem("blog-token", JSON.stringify(data.token))
       window.localStorage.setItem("blog-user", JSON.stringify(data))
       navigate("/")        
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
      finally{
        setLoading(false)
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
        
          <button disabled={passwordInvalid || emailInvalid }>{
             loading? "Loading....": "Login"
          }</button>
          <br/>
          <br/>
          <span style={{color: 'white'}}><b>Don't have an account &nbsp;&nbsp; 
            <Link style={{color: "rgb(0 106 213)"}} to={"/register"}>Register</Link></b></span>
          
    </form>
  )
}

export default LoginPage