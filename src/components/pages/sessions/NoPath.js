import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

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
  margin: 0 auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;

  &:hover:after {
    top: -6px;
    left: 6px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    background: red;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

export default NoPath
