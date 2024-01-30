import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import React, { createContext, useState } from "react";


const AuthContext = React.createContext({

  token: '',
  isLoggenIn: false,
  login: (token) => { },
  logout: () => { }

})


export const AuthProvider = (props) => {

  let initialtoken = localStorage.getItem('token')

  const [token, settoken] = useState(initialtoken);

  const isLoggenIn = !!token;

  const loginHandler = (token) => {
    settoken(token);

    localStorage.setItem('token', token)
  }

  const logoutHandler = () => {
    settoken('');

    localStorage.removeItem('token')
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