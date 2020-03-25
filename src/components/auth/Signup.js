import React from 'react'
import SignupForm from './SignupForm'
import styled from 'styled-components/macro'
import { mixins, colors } from '../../common/styles/theme'

const Signup = ({ signupMode, setSignupMode }) => {
  return !signupMode ? (
    <SignUpButton onClick={() => setSignupMode(true)}>Sign up</SignUpButton>
  ) : (
    <>
      <SignupForm setSignupMode={setSignupMode} />
      <BackText onClick={() => setSignupMode(false)}>Back</BackText>
    </>
  )
}

const SignUpButton = styled.div`
  ${mixins.squareButton};

  &:hover {
    cursor: pointer;
  }
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

export default Signup
