import React from 'react'
import LoginForm from './LoginForm'
import styled from 'styled-components/macro'
import { colors, mixins } from '../../common/styles/theme'

const Login = ({ loginMode, setLoginMode }) => {
  return !loginMode ? (
    <LoginButton onClick={() => setLoginMode(true)}>Login</LoginButton>
  ) : (
    <>
      <LoginForm setLoginMode={setLoginMode} />
      <BackText onClick={() => setLoginMode(false)}>Back</BackText>
    </>
  )
}

const LoginButton = styled.div`
  ${mixins.squareButton};
  cursor: pointer;
`

const BackText = styled.p`
  margin: 0 auto;
  padding: 10px;
  color: ${colors.darkgrey};
  font-size: 16px;
  position: relative;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export default Login