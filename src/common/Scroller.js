import React from 'react'
import styled from 'styled-components'

const Scroller = ({ children }) => {
  return <ScrollerContainer>{children}</ScrollerContainer>
}

const ScrollerContainer = styled.div`
  overflow-y: auto;
  padding: 12px;
`

export default Scroller
