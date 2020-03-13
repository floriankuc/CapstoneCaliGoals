import React from 'react'
import Chart from './Chart'
import { Line } from 'react-chartjs-2'
import { getDateWithoutYear } from '../../../utils'
import PropTypes from 'prop-types'

const ExerciseCharts = ({ data }) => {
  return <div>{renderCharts()}</div>

  function getSessionTimes() {
    const sortedSessions = data.sort((a, b) => a.time.seconds - b.time.seconds)
    const times = []
    sortedSessions.map(session => {
      let timeAsDate = new Date(session.time.seconds * 1000)
      times.push(getDateWithoutYear(timeAsDate))
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

  function getUnits() {
    const selectedSessions = data.map(session => session.selectedSessions)
    const units = selectedSessions.flat().reduce(
      (result, item) => ({
        ...result,
        [item['title']]: [...(result[item['title']] || []), item['unit']],
      }),
      {}
    )
    return Object.values(units).map(el =>
      el.reduce((a, b) => (a === b ? a : b))
    )
  }

  function renderCharts() {
    const extractedAmountsDone = getAmountsDone()
    const goals = getGoals()
    const times = getSessionTimes()
    const units = getUnits()
    return Object.keys(extractedAmountsDone).map((exercise, i) => {
      let exerciseName = exercise
      return (
        <Chart
          data-testid="chart"
          key={i}
          times={times}
          goals={goals[exercise]}
          dataArr={extractedAmountsDone[exercise]}
          data={data}
          exercise={exerciseName}
          units={units[i]}
        />
      )
    })
  }
}

ExerciseCharts.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ExerciseCharts
