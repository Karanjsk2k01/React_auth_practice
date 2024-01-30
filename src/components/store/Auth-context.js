import React, { createContext, useState } from "react";


const AuthContext = React.createContext({

  token: '',
  isLoggenIn: false,
  login: (token) => { },
  logout: () => { }

})


export const AuthProvider = (props) => {

  const [token, settoken] = useState(null);

  const isLoggenIn = !!token;

  const loginHandler = (token) => {
    settoken(token);
  }

  const logoutHandler = () => {
    settoken('');
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