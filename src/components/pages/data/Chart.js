import React from 'react'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { colors } from '../../../common/styles/theme'

Chart.propTypes = {
  exercise: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  dataArr: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  goals: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  times: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  units: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

function Chart({ exercise, dataArr, goals, times, units }) {
  const exerciseChart = {
    labels: times,
    datasets: [
      {
        label: exercise,
        borderColor: colors.red,
        backgroundColor: 'transparent',
        spanGaps: true,
        lineTension: 0,
        data: dataArr,
      },
    ],
  }

  const chartOptions = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      datalabels: {
        color: colors.black,
        backgroundColor: colors.red,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      fontFamily: 'Roboto',
      fontSize: 15,
      labels: {
        fontFamily: 'Roboto, sans-serif',
        fontColor: `${colors.black}`,
        fontSize: 15,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: 'black',
            fontSize: 14,
          },
          scaleLabel: {
            display: true,
            labelString: units,
            fontColor: 'black',
            fontSize: 14,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'black',
            fontSize: 14,
          },
          scaleLabel: {
            fontColor: 'black',
            fontSize: 14,
          },
        },
      ],
    },
  }

  return (
    <ChartContainer>
      {compareGoalToSession()}
      <Line options={chartOptions} data={exerciseChart} />
    </ChartContainer>
  )

  function compareGoalToSession() {
    return dataArr.some(result => result >= goals[0]) ? (
      <GoalStatusTextReached>
        {' '}
        Goal of {goals[0]} reached!
      </GoalStatusTextReached>
    ) : (
      <GoalStatusTextKeepGoing>
        {goals[0]} isn't far off!
      </GoalStatusTextKeepGoing>
    )
  }
}

const GoalStatusTextKeepGoing = styled.p`
  color: ${colors.white};
  background: ${colors.red};
  display: inline-block;
  padding: 4px;
  margin-bottom: 8px;
`

const GoalStatusTextReached = styled.p`
  color: ${colors.white};
  background: ${colors.black};
  display: inline-block;
  margin-bottom: 8px;
  padding: 4px;
`

const ChartContainer = styled.section`
  position: relative;
  width: 100%;
  height: 220px;
  margin: 70px 0;
`

export default Chart
