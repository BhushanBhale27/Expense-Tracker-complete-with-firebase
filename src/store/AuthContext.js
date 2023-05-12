import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  mail: '',
  isLoggedIn: false,
  login: (token, mail) => {},
  logout: () => {}
})

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const initialMail = localStorage.getItem('mail')

  const [token, setToken] = useState(initialToken)
  const [mail, setMail] = useState(initialMail)

  function loginHandler(token, mail) {
    localStorage.setItem('token', token)
    localStorage.setItem('mail', mail)
    setToken(token);
    setMail(mail)
  }

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null)
    setMail(null)
    localStorage.removeItem('token')
    localStorage.removeItem('mail')
  }

  const contextValue = {
    token: token,
    mail: mail,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
