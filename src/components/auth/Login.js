import React from 'react'
import LoginForm from './LoginForm'
import styled from 'styled-components/macro'
import { colors, mixins } from '../../common/styles/theme'
import PropTypes from 'prop-types'

Login.propTypes = {
  loginMode: PropTypes.bool.isRequired,
  setLoginMode: PropTypes.func.isRequired,
}

function Login({ loginMode, setLoginMode }) {
  return !loginMode ? (
    <LoginButton data-cy="loginbutton" onClick={() => setLoginMode(true)}>
      Login
    </LoginButton>
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
