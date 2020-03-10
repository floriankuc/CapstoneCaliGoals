import React from 'react'
import styled from 'styled-components'

const Scroller = props => {
  return <ScrollerContainer>{props.children}</ScrollerContainer>
}

const ScrollerContainer = styled.div`
  overflow-y: auto;
  padding: 12px;
`

export default Scroller
