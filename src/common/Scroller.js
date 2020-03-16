import React from 'react'
import styled from 'styled-components/macro'

const Scroller = ({ children }) => {
  return <ScrollerContainer>{children}</ScrollerContainer>
}

const ScrollerContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
`

export default Scroller
