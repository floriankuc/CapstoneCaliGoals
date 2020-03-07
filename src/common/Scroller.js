import React from 'react'
import styled from 'styled-components'

const Scrollerr = props => {
  return <Scroller>{props.children}</Scroller>
}

const Scroller = styled.div`
  overflow-y: auto;
  padding: 12px;
`

export default Scrollerr
