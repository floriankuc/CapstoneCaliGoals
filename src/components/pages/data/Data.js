import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from './Chart'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getSessions } from '../../../services'

const Data = ({ path }) => {
  const [id, setId] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    if (path[0]) {
      setId(path[0].id)
      getSessions(setData)
    }
  }, [path, id])

  return (
    <div>
      <h2>Statistics</h2>
      {data?.length ? (
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
    const sortedSessions = sortSessionsByTime()

    return sortedSessions.map(session => {
      const selectedSessionsExtracted = session.selectedSessions
      const date = new Date(session.time.seconds * 1000)
      const formattedDate = getDateWithYear(date)
      return (
        <div key={session.id}>
          <p>{formattedDate}</p>
          {renderSessionExercisesList(selectedSessionsExtracted)}
        </div>
      )
    })
  }

  function getDateWithYear(unformattedDate) {
    return unformattedDate.toLocaleTimeString([], {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
    })
  }
  function sortSessionsByTime() {
    return data.sort((a, b) => a.time.seconds - b.time.seconds)
  }

  function renderSessionExercisesList(array) {
    return array.map(sessionExercise => (
      <p key={sessionExercise.id}>
        {sessionExercise.title}: {sessionExercise.amountDone}
      </p>
    ))
  }

  function getSessionTimes() {
    const sortedSessions = data.sort((a, b) => a.time.seconds - b.time.seconds)
    const times = []
    sortedSessions.map(el => {
      let timeAsDate = new Date(el.time.seconds * 1000)
      times.push(getDateWithoutYear(timeAsDate))
    })
    return times
  }

  function getDateWithoutYear(unformattedDate) {
    return unformattedDate.toLocaleTimeString([], {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
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
    return Object.keys(extractedAmountsDone).map((exercise, i) => {
      let exerciseName = exercise
      return (
        <Chart
          key={i}
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
  margin: 20px auto;
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

Data.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Data
