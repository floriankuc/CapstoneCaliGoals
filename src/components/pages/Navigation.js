import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineLineChart,
} from 'react-icons/ai'
import { colors } from '../../common/styles/theme'

Navigation.propTypes = {
  path: PropTypes.array.isRequired,
  inputFocus: PropTypes.bool.isRequired,
}

function Navigation({ path, inputFocus }) {
  const [isPath, setIsPath] = useState()

  useEffect(() => {
    if (path.length > 0) {
      setIsPath(true)
    } else {
      setIsPath(false)
    }
  }, [path])

  return (
    <NavigationStyled display={inputFocus ? 'none' : 'grid'} data-test="nav">
      <LinkStyled exact to="/" data-test="link">
        <AiOutlineHome className="icon" />
        {inputFocus ? 'focused' : ''}
      </LinkStyled>
      {!isPath ? (
        <LinkStyled to="/path" data-test="link">
          <AiOutlinePlus className="icon" />
        </LinkStyled>
      ) : (
        <>
          <LinkStyled to="/sessions" data-cy="navbutton" data-test="link">
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
  outline: none;

  .icon {
    font-size: 32px;
    transition: all 0.1s ease-out;
    color: ${colors.black};
    position: absolute;
    z-index: 1;
  }

  &.active .icon {
    color: ${colors.red};
    outline: none;
  }
`

const NavigationStyled = styled.nav`
  display: ${props => props.display};
  grid-auto-flow: column;
`

export default Navigation
