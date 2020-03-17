import React from 'react'
import styled from 'styled-components/macro'
import { colors } from './styles/theme'
import PropTypes from 'prop-types'

const FormHeadline = ({ number, children }) => {
  return (
    <>
      <p>
        <StyledSpan>{number} </StyledSpan>
        {children}
      </p>
    </>
  )
}

const StyledSpan = styled.span`
  color: ${colors.red};
  width: 32px;
  display: inline-block;
  font-family: Spartan, sans-serif;
`

FormHeadline.propTypes = {
  number: PropTypes.string,
}

export default FormHeadline
