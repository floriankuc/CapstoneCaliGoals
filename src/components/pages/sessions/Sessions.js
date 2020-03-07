import firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components/macro'
import NoPath from './NoPath'
import { Link } from 'react-router-dom'

const Sessions = ({ paths }) => {
  const [session, setSession] = useState([])
  // const [editing, setEditing] = useState([])

  useEffect(() => {
    if (paths.length > 0) {
      setSession(paths[0].selectedExercisesAreGoals)
      console.log(session)
    }
  }, [paths])

  function editSessionWithExercise(id) {
    const index = session.findIndex(exercise => exercise.id === id)
    setSession([
      ...session.slice(0, index),
      { ...session[index], editing: !session[index].editing, amountDone: '' },
      ...session.slice(index + 1),
    ])
    // const editingIndex = editing.indexOf(id)
    // if (editingIndex === -1) {
    //   setEditing([...editing, id])
    // } else {
    //   setEditing([
    //     ...editing.slice(0, editingIndex),
    //     ...editing.slice(editingIndex + 1),
    //   ])
    // }
  }

  function updateSessionExercise(id, value) {
    const index = session.findIndex(el => el.id === id)
    setSession([
      ...session.slice(0, index),
      { ...session[index], amountDone: value },
      ...session.slice(index + 1),
    ])
  }

  const handleSessionSubmit = e => {
    e.preventDefault()
    const selectedSessions = session.filter(sess => sess.editing === true)
    const cuDate = moment()
    const pathId = paths[0].id

    firebase
      .firestore()
      .collection('sessions')
      .add({
        time: cuDate._d,
        pathId,
        selectedSessions,
      })
    //session
    // console.log('sessionstate', session)
    // const sessions = session.filter(el => el.editing === true)
    // console.log(sessions.map(exercise => exercise.amountDone))
    // setSession([
    //   ...session,
    //   sessions.map(exercise => (...{amountDone = ''})),
    // ])

    const newState = session.map(item => ({ ...item, amountDone: '0' }))
    setSession(newState)
  }

  //ALT
  // function renderSelectedExercises() {
  //   return paths[0].selectedExercisesAreGoals.map(el => (
  //     <ExerciseDiv
  //       className={editing.includes(el.id) ? 'selected' : ''}
  //       key={el.id}
  //       onClick={() => editSessionWithExercise(el.id)}
  //     >
  //       {el.title} - {el.amount} {el.unit}
  //     </ExerciseDiv>
  //   ))
  // }

  function renderSelectedExercises() {
    if (session.length > 0) {
      return session.map(el => (
        <ExerciseDiv
          // className={editing.includes(el.id) ? 'selected' : ''}
          className={el.editing ? 'selected' : ''}
          key={el.id}
          onClick={() => editSessionWithExercise(el.id)}
        >
          {el.title} - {el.amount} {el.unit}
        </ExerciseDiv>
      ))
    }
  }

  return (
    <div>
      {paths.length > 0 ? (
        <>
          {paths.length > 0 && renderSelectedExercises()}
          {/* Creating session input forms */}
          <form onSubmit={handleSessionSubmit}>
            {session &&
              session
                .filter(el => el.editing === true)
                .map(el => (
                  <div style={{ width: '100%' }}>
                    <span>{el.title}</span>
                    <input
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
            <StyledLinkText>save this session</StyledLinkText>
          </form>
        </>
      ) : (
        <NoPath />
      )}
    </div>
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

export default Sessions
