import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineLineChart,
} from 'react-icons/ai'

const Navigation = ({ path }) => {
  const [isPath, setIsPath] = useState()

  useEffect(() => {
    if (path.length > 0) {
      setIsPath(true)
    } else {
      setIsPath(false)
    }
  }, [path])

  return (
    <NavigationStyled data-test="nav">
      <LinkStyled exact to="/" data-test="link">
        <AiOutlineHome className="icon" />
      </LinkStyled>
      {!isPath ? (
        <LinkStyled to="/path" data-test="link">
          <AiOutlinePlus className="icon" />
        </LinkStyled>
      ) : (
        <>
          <LinkStyled to="/sessions" data-test="link">
            <AiOutlineUnorderedList className="icon" />
          </LinkStyled>
          <LinkStyled to="/data" data-test="link">
            <AiOutlineLineChart className="icon" />
          </LinkStyled>
        </>
      )}
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
    font-size: 36px;
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
