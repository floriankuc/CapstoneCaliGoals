import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { mixins } from '../../../common/styles/theme'

const NoPath = () => {
  return (
    <div>
      <p>
        Session view not possible. Create a training path to enable the session
        log
      </p>
      <StyledLinkText to="/path">Create a new training path</StyledLinkText>
    </div>
  )
}

const StyledLinkText = styled(Link)`
  ${mixins.squareButton};
  margin: 0 auto;
`

export default NoPath
