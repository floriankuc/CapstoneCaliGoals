import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Auth.propTypes = {
  currentUser: PropTypes.object,
}

function Auth({ currentUser }) {
  const [signupMode, setSignupMode] = useState(false)
  const [loginMode, setLoginMode] = useState(false)

  return !currentUser ? (
    <LoginWrapper>
      {!loginMode ? (
        <Signup signupMode={signupMode} setSignupMode={setSignupMode} />
      ) : null}
      {!signupMode ? (
        <Login loginMode={loginMode} setLoginMode={setLoginMode} />
      ) : null}
    </LoginWrapper>
  ) : null
}

const LoginWrapper = styled.section`
  height: 150px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export default Auth
