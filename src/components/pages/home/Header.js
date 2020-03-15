import React from 'react'
import hexagon from './hexagon.svg'
import styled from 'styled-components/macro'

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo src={hexagon} />
      <h1>Caligoals</h1>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`

const Logo = styled.img`
  width: 50px;
  margin-bottom: 16px;
`

export default Header
