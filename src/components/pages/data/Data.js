import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from './Chart'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Data = ({ path }) => {
  const [id, setId] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    if (path[0]) {
      setId(path[0].id)
      const unsubscribe = firebase
        .firestore()
        .collection('sessions')
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setData(data)
        })
      return () => unsubscribe()
    }
  }, [path, id])

  return (
    <div>
      {data.length > 0 ? (
        <div style={{ position: 'relative', width: 300, height: 400 }}>
          {renderSessions()}
          {renderCharts()}
        </div>
      ) : (
        <>
          <p>No training session data to display</p>
          <StyledLinkText to="/sessions">Log your session</StyledLinkText>
        </>
      )}
    </div>
  )

  function renderSessions() {
    const sortedSessions = data.sort((a, b) => a.time.seconds - b.time.seconds)

    return sortedSessions.map(session => {
      const selectedSessionsExtracted = session.selectedSessions
      const date = new Date(session.time.seconds * 1000)
      const formattedDate = date.toLocaleTimeString([], {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
      })
      return (
        <div>
          <p>{formattedDate}</p>
          {renderSessionExercisesList(selectedSessionsExtracted)}
        </div>
      )
    })
  }

  function renderSessionExercisesList(array) {
    return array.map(sessionExercise => (
      <p>
        {sessionExercise.title}: {sessionExercise.amountDone}
      </p>
    ))
  }

  function getSessionTimes() {
    const sortedSessions = data.sort((a, b) => a.time.seconds - b.time.seconds)
    const times = []

    sortedSessions.map(el => {
      let timeAsDate = new Date(el.time.seconds * 1000)
      times.push(
        timeAsDate.toLocaleTimeString([], {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    })
    return times
  }

  function getAmountsDone() {
    const selectedSessions = data.map(session => session.selectedSessions)
    return selectedSessions.flat().reduce(
      (result, item) => ({
        ...result,
        [item['title']]: [...(result[item['title']] || []), item['amountDone']],
      }),
      {}
    )
  }

  function getGoals() {
    const selectedSessions = data.map(session => session.selectedSessions)
    return selectedSessions.flat().reduce(
      (result, item) => ({
        ...result,
        [item['title']]: [...(result[item['title']] || []), item['amount']],
      }),
      {}
    )
  }

  function renderCharts() {
    const extractedAmountsDone = getAmountsDone()
    const goals = getGoals()
    const times = getSessionTimes()
    return Object.keys(extractedAmountsDone).map(exercise => {
      let exerciseName = exercise
      return (
        <Chart
          times={times}
          goals={goals[exercise]}
          dataArr={extractedAmountsDone[exercise]}
          data={data}
          exercise={exerciseName}
        />
      )
    })
  }
}

const StyledLinkText = styled(Link)`
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

export default Data
