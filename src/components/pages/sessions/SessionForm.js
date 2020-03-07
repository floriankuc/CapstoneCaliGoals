import React from 'react'
import styled from 'styled-components/macro'

const SessionForm = ({
  handleSessionSubmit,
  session,
  updateSessionExercise,
}) => {
  return (
    <form onSubmit={handleSessionSubmit}>
      {session &&
        session
          .filter(el => el.editing === true)
          .map(el => (
            <div style={{ width: '100%' }}>
              <span>{el.title}</span>
              <input
                required
                className="input"
                data-id={el.id}
                name={el.title}
                type="number"
                value={el.amountDone || ''}
                onChange={event =>
                  updateSessionExercise(el.id, event.target.value)
                }
              />
              <span>{el.unit}</span>
            </div>
          ))}
      <StyledLinkText>Save session</StyledLinkText>
    </form>
  )
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

export default SessionForm
