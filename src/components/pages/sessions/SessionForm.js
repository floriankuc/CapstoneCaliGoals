import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

const SessionForm = ({
  handleSessionSubmit,
  session,
  updateSessionExercise,
}) => {
  return (
    <form onSubmit={handleSessionSubmit}>
      {session &&
        editingTheseExercises().map(session => (
          <div style={{ width: '100%' }}>
            <span>{session.title}</span>
            <input
              required
              className="input"
              data-id={session.id}
              name={session.title}
              type="number"
              value={session.amountDone || ''}
              onChange={e => updateSessionExercise(session.id, e.target.value)}
            />
            <span>{session.unit}</span>
          </div>
        ))}
      <StyledLinkText>Save session</StyledLinkText>
    </form>
  )

  function editingTheseExercises() {
    return session.filter(session => session.editing === true)
  }
}

const StyledLinkText = styled.button`
  margin: 0 auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;

  &:hover:after {
    top: -6px;
    left: 6px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    background: red;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

SessionForm.propTypes = {
  handleSessionSubmit: PropTypes.func.isRequired,
  session: PropTypes.array.isRequired,
  updateSessionExercise: PropTypes.func.isRequired,
}

export default SessionForm
