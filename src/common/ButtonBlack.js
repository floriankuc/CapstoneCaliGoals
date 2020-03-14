import React from 'react'
import styled from 'styled-components/macro'
import { mixins } from '../common/styles/mixins'

const ButtonBlack = ({ children }) => {
  return <StyledButton>{children}</StyledButton>
}

const StyledButton = styled.button`
  ${mixins.squareButton};
  border: none;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  margin: 36px auto;

  &:hover,
  &:active {
    cursor: pointer;
  }
`

export default ButtonBlack
