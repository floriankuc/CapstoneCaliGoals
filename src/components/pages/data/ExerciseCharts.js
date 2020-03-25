import React from 'react'
import Chart from './Chart'
import { Line } from 'react-chartjs-2'
import { getDateWithoutYear, sortByTime, getSessionDate } from '../../../utils'
import PropTypes from 'prop-types'

ExerciseCharts.propTypes = {
  data: PropTypes.array.isRequired,
}

function ExerciseCharts({ data }) {
  return <section>{renderCharts()}</section>

  function renderCharts() {
    const extractedAmountsDone = getExerciseData('amountDone', data)
    const goals = getExerciseData('amount', data)
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

  function getExerciseData(string, objectOfSessions) {
    const selectedSessions = getSelectedSessions(objectOfSessions)
    return selectedSessions.flat().reduce(
      (result, item) => ({
        ...result,
        [item['title']]: [...(result[item['title']] || []), item[`${string}`]],
      }),
      {}
    )
  }

  function getUnits() {
    const units = getExerciseData('unit', data)
    return Object.values(units).map(el =>
      el.reduce((a, b) => (a === b ? a : b))
    )
  }

  function getSessionTimes() {
    const sortedSessions = sortByTime(data)
    const times = []
    sortedSessions.forEach(session => {
      let timeAsDate = getSessionDate(session)
      times.push(getDateWithoutYear(timeAsDate))
    })
    return times
  }

  function getSelectedSessions(sessionObject) {
    return sessionObject.map(session => session.selectedSessions)
  }
}

export default ExerciseCharts
