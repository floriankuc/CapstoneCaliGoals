import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

const Auth = ({ currentUser }) => {
  const [signupMode, setSignupMode] = useState(false)
  const [loginMode, setLoginMode] = useState(false)

  return !currentUser ? (
    <div
      style={{
        height: 150,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      {!loginMode ? (
        <Signup signupMode={signupMode} setSignupMode={setSignupMode} />
      ) : null}
      {!signupMode ? (
        <Login loginMode={loginMode} setLoginMode={setLoginMode} />
      ) : null}
    </div>
  ) : null
}

export default Auth
