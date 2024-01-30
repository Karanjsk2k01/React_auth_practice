import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import React, { createContext, useEffect, useState } from "react";


const AuthContext = React.createContext({

  token: '',
  isLoggenIn: false,
  login: (token) => { },
  logout: () => { }

})


export const AuthProvider = (props) => {

  let initialtoken = localStorage.getItem('token')
  const [token, settoken] = useState(initialtoken);


  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => {
        localStorage.setItem('expiredToken', token)
      }, 5 * 60 * 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [token]);


  useEffect(() => {

    const expiredToken = localStorage.getItem('expiredToken')
    const initialtoken = localStorage.getItem('token')

    if (expiredToken === initialtoken) {
      logoutHandler()
    }
  }, [])


  const isLoggenIn = !!token;

  const loginHandler = (token) => {
    settoken(token);

    localStorage.setItem('token', token)

  }

  const logoutHandler = () => {
    settoken('');
    localStorage.removeItem('token')
    localStorage.removeItem('expiredToken')
  }

  const contextValue = {

    token: token,
    isLoggenIn: isLoggenIn,
    login: loginHandler,
    logout: logoutHandler
  }



  return <AuthContext.Provider value={contextValue} > {props.children}</AuthContext.Provider>
}


export default AuthContext;