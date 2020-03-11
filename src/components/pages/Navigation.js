import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineLineChart,
} from 'react-icons/ai'
import { colors } from '../../common/styles/colors'

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
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  transition: all 0.5s ease-out;
  position: relative;

  .icon {
    font-size: 32px;
    transition: all 0.1s ease-out;
    color: ${colors.black};
    position: absolute;
    z-index: 1;
  }

  &.active .icon {
    color: ${colors.red};
  }
`

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
`

export default Navigation
