import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { mixins } from '../../../common/styles/theme'

const NoPath = () => {
  return (
    <>
      <p>
        Session view not possible. Create a training path to enable the session
        log
      </p>
      <StyledLinkText to="/path">Create a new training path</StyledLinkText>
    </>
  )
}

const StyledLinkText = styled(Link)`
  ${mixins.squareButton};
  margin: 0 auto;
`

export default NoPath
