import { useEffect, useState } from "react";
import { createContext } from "react";
import { isTokenExist } from "../utils/getToken";


export const UserContext = createContext({});


export function UserContextProvider({children}) {

    const [userInfo, setUserInfo] = useState({id: null});
    useEffect(()=>{
        if(isTokenExist()){
            var userDetails =  JSON.parse(localStorage.getItem("user"));
            setUserInfo({...userDetails, token: JSON.parse(localStorage.getItem("token"))})
        }
    },[])
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}