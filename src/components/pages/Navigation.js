import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineLineChart,
} from 'react-icons/ai'

const Navigation = () => {
  return (
    <NavigationStyled>
      <LinkStyled exact to="/">
        <AiOutlineHome className="icon" />
        <AiOutlineHome className="iconfade" />
      </LinkStyled>
      <LinkStyled to="/path">
        <AiOutlinePlus className="icon" />
        <AiOutlinePlus className="iconfade" />
      </LinkStyled>
      <LinkStyled to="/sessions">
        <AiOutlineUnorderedList className="icon" />
      </LinkStyled>
      <LinkStyled to="/data">
        <AiOutlineLineChart className="icon" />
      </LinkStyled>
    </NavigationStyled>
  )
}

const LinkStyled = styled(NavLink)`
  flex-grow: 1;
  color: white;
  background: #fff;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  transition: all 0.5s ease-out;
  position: relative;

  .icon {
    font-size: 34px;
    transition: all 0.1s ease-out;
    color: #111;
    position: absolute;
    z-index: 1;
  }

  .iconfade {
    font-size: 34px;
    transition: all 0.1s ease-out;
    color: red;
    position: absolute;
  }

  &.active .icon {
    color: red;
  }
`

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  background: #111;
`

export default Navigation
