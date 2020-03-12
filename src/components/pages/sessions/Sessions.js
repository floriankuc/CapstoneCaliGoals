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
import { mixins } from '../../../common/styles/mixins'
import { colors } from '../../../common/styles/colors'
import FormHeadline from '../../../common/FormHeadline'

const Sessions = ({ path }) => {
  const [session, setSession] = useState([])

  useEffect(() => {
    path.length && setSession(path[0].selectedExercisesAreGoals)
  }, [path])

  return (
    <div>
      <h2>Session log</h2>
      <Toast enableMultiContainer containerId={'pathDeletedContainer'} />

      {path.length ? (
        <div>
          <FormHeadline number={'01'}>Your goals</FormHeadline>
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
        </div>
      ) : (
        <NoPath />
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
    const currentDate = moment()
    const pathId = path[0].id

    saveSession(currentDate._d, pathId, selectedSessions)

    const newState = session.map(item => ({
      ...item,
      amountDone: '0',
      editing: false,
    }))
    setSession(newState)

    toast('Session saved.', { containerId: 'sessionSavedContainer' })
  }

  function renderSelectedExercises() {
    if (session.length) {
      return session.map(exercise => (
        <ExerciseDiv
          className={exercise.editing ? 'selected' : ''}
          key={exercise.id}
          onClick={() => editSessionWithExercise(exercise.id)}
        >
          <p>{exercise.title}</p>
          <p>
            Goal: {exercise.amount} {exercise.unit}
          </p>
        </ExerciseDiv>
      ))
    }
  }
}

const StyledLinkTextRed = styled.button`
  ${mixins.squareButtonReverse};
  border: none;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  margin: 60px auto;

  &:hover,
  &:active {
    cursor: pointer;
  }
`

const ExerciseDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  grid-template-rows: 32px;
  align-items: center;
  padding: 8px;
  width: 100%;
  background: ${colors.lightestgrey};
  margin: 1px 0;

  &.selected,
  &:hover {
    color: ${colors.white};
    background: ${colors.black};
  }

  &:hover {
    cursor: pointer;
  }
`

Sessions.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Sessions
