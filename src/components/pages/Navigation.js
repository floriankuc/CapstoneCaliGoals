import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { NavLink, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineLineChart,
  AiOutlineLogout,
} from 'react-icons/ai'
import { colors } from '../../common/styles/theme'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

Navigation.propTypes = {
  path: PropTypes.array.isRequired,
  inputFocus: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
}

function Navigation({ path, inputFocus, currentUser }) {
  const [isPath, setIsPath] = useState()

  useEffect(() => {
    if (path.length > 0) {
      setIsPath(true)
    } else {
      setIsPath(false)
    }
  }, [path])

  let history = useHistory()

  return (
    <>
      {currentUser ? (
        <NavigationStyled
          display={inputFocus ? 'none' : 'grid'}
          data-test="nav"
        >
          <LinkStyled exact to="/" data-test="link">
            <AiOutlineHome className="icon" />
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
          <LinkStyled to="" data-test="link">
            <AiOutlineLogout className="logout-icon" onClick={handleLogout} />
          </LinkStyled>
        </NavigationStyled>
      ) : (
        ''
      )}
    </>
  )

  function handleLogout(e) {
    e.preventDefault()
    auth.signOut().then(() => {
      toast('Logged out.', { containerId: 'toast' })
    })
    history.push('/')
  }
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

  .icon,
  .logout-icon {
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
