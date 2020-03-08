import firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components/macro'
import NoPath from './NoPath'
import SessionForm from './SessionForm'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '../../../common/Toast'

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
      {path.length > 0 ? (
        <>
          {renderSelectedExercises()}
          <SessionForm
            handleSessionSubmit={handleSessionSubmit}
            session={session}
            updateSessionExercise={updateSessionExercise}
          />
          <Toast enableMultiContainer containerId={'sessionSavedContainer'} />
        </>
      ) : (
        <NoPath />
      )}
    </div>
  )

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

    firebase
      .firestore()
      .collection('sessions')
      .add({
        time: cuDate._d,
        pathId,
        selectedSessions,
      })

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
