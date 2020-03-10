import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components/macro'
import NoPath from './NoPath'
import SessionForm from './SessionForm'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '../../../common/Toast'
import { deletePath, saveSession } from '../../../services'

const Sessions = ({ path }) => {
  const [session, setSession] = useState([])

  useEffect(() => {
    if (path.length > 0) {
      setSession(path[0].selectedExercisesAreGoals)
    }
  }, [path])

  return (
    <div>
      <h2>Session log</h2>
      <Toast enableMultiContainer containerId={'pathDeletedContainer'} />

      {path.length > 0 ? (
        <>
          {renderSelectedExercises()}
          <SessionForm
            handleSessionSubmit={handleSessionSubmit}
            session={session}
            updateSessionExercise={updateSessionExercise}
          />
          <StyledLinkTextRed onClick={() => handleDelete(path[0].id)}>
            Terminate current path
          </StyledLinkTextRed>
          <Toast enableMultiContainer containerId={'sessionSavedContainer'} />
        </>
      ) : (
        <>
          <NoPath />
        </>
      )}
    </div>
  )

  function handleDelete(id) {
    deletePath(id)
    toast('Path deleted.', { containerId: 'pathDeletedContainer' })
  }

  function editSessionWithExercise(id) {
    const index = session.findIndex(exercise => exercise.id === id)
    setSession([
      ...session.slice(0, index),
      { ...session[index], editing: !session[index].editing, amountDone: '' },
      ...session.slice(index + 1),
    ])
  }

  function updateSessionExercise(id, value) {
    const index = session.findIndex(el => el.id === id)
    setSession([
      ...session.slice(0, index),
      { ...session[index], amountDone: value },
      ...session.slice(index + 1),
    ])
  }

  function handleSessionSubmit(e) {
    e.preventDefault()
    const selectedSessions = session.filter(sess => sess.editing === true)
    const cuDate = moment()
    const pathId = path[0].id

    saveSession(cuDate._d, pathId, selectedSessions)

    const newState = session.map(item => ({
      ...item,
      amountDone: '0',
      editing: false,
    }))
    setSession(newState)

    toast('Session saved.', { containerId: 'sessionSavedContainer' })
  }

  function renderSelectedExercises() {
    if (session.length > 0) {
      return session.map(el => (
        <ExerciseDiv
          className={el.editing ? 'selected' : ''}
          key={el.id}
          onClick={() => editSessionWithExercise(el.id)}
        >
          {el.title} - {el.amount} {el.unit}
        </ExerciseDiv>
      ))
    }
  }
}

const StyledLinkTextRed = styled.button`
  margin: 30px auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: red;
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
    background: #111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

const ExerciseDiv = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #111;
  margin: 1px 0;

  &.selected {
    color: #fff;
    background: #111;
  }

  &:hover {
    cursor: pointer;
  }
`

Sessions.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Sessions
