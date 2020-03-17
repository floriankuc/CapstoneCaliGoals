import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components/macro'
import FormHeadline from '../../../common/FormHeadline'
import { colors, mixins } from '../../../common/styles/theme'
import TransitionWrapper from '../../../common/TransitionWrapper'
import { deletePath, saveSession } from '../../../services'
import NoPath from './NoPath'
import SessionForm from './SessionForm'

Sessions.propTypes = {
  path: PropTypes.array.isRequired,
}

function Sessions({ path }) {
  const [session, setSession] = useState([])
  let history = useHistory()

  useEffect(() => {
    path.length && setSession(path[0].selectedExercisesAreGoals)
  }, [path])

  return (
    <TransitionWrapper>
      <h2>Session log</h2>
      {path.length ? (
        <div>
          <FormHeadline number={'01'}>Your goals</FormHeadline>
          {renderSelectedExercises()}
          <SessionForm
            handleSessionSubmit={handleSessionSubmit}
            session={session}
            updateSessionExercise={updateSessionExercise}
          />
          <ButtonRed
            data-cy="deleteButton"
            onClick={() => handleDelete(path[0].id)}
          >
            Terminate current path
          </ButtonRed>
        </div>
      ) : (
        <>
          <NoPath />
        </>
      )}
    </TransitionWrapper>
  )

  function handleDelete(id) {
    deletePath(id)
    toast('Path deleted.', { containerId: 'pathDeletedContainer' })
    history.push('/')
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
          data-cy="exerciseDiv"
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

const ButtonRed = styled.button`
  ${mixins.squareButtonReverse};
  font-size: 16px;
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

export default Sessions
