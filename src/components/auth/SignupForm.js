import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { colors, mixins } from '../../common/styles/theme'

SignupForm.propTypes = {
  setSignupMode: PropTypes.func.isRequired,
}

function SignupForm({ setSignupMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form style={{ marginTop: 80 }} onSubmit={handleSignUp}>
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
      <SignupButton>Sign up</SignupButton>
    </form>
  )

  function handleSignUp(e) {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      setEmail('')
      setPassword('')
      setSignupMode(false)
      toast('Signed up.', { containerId: 'toast' })
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

const SignupButton = styled.button`
  ${mixins.squareButton};
  margin-top: 30px;
  font-size: 18px;
  font-family: Roboto;
  font-weight: 200;
  height: 50px;

  &:hover {
    cursor: pointer;
  }
`

export default SignupForm
