import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { colors, mixins } from '../../common/styles/theme'

LoginForm.propTypes = {
  setLoginMode: PropTypes.func.isRequired,
}

function LoginForm({ setLoginMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form style={{ marginTop: 80 }} onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <StyledInput
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <StyledInput
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <LoginButton data-cy="loginsubmit">Login</LoginButton>
    </form>
  )

  function handleLogin(e) {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      setEmail('')
      setPassword('')
      setLoginMode(false)
      toast('Logged in.', { containerId: 'toast' })
    })
  }
}

const StyledInput = styled.input`
  font-size: 16px;
  height: 32px;
  width: 100%;
  display: block;
  border: none;
  box-shadow: 0 1px 0 0 ${colors.black};
  font-family: Roboto;
  font-weight: 200;

  &:focus {
    box-shadow: 0 2px 0 0 ${colors.black};
  }
`

const LoginButton = styled.button`
  ${mixins.squareButton};
  margin-top: 30px;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 200;
  height: 50px;

  &:hover {
    cursor: pointer;
  }
`

export default LoginForm
