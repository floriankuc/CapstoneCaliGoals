import React from 'react'
import styled from 'styled-components/macro'
import { colors } from '../common/styles/colors'

const NumberSpan = ({ children }) => {
  return <StyledSpan>{children}</StyledSpan>
}

const StyledSpan = styled.span`
  color: ${colors.red};
  font-family: Spartan, sans-serif;
`

export default NumberSpan
