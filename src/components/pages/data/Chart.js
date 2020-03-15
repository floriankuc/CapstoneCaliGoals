import React from 'react'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { colors } from '../../../common/styles/theme'

const Chart = ({ exercise, dataArr, goals, times, units }) => {
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
        top: 20,
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
    legend: { position: 'bottom', fontFamily: 'Roboto' },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: units,
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
      <p>Goal of {goals[0]} reached!</p>
    ) : (
      <p>Keep going.</p>
    )
  }
}

const ChartContainer = styled.section`
  position: relative;
  width: 100%;
  height: 220px;
  margin-bottom: 50px;
`

Chart.propTypes = {
  exercise: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  dataArr: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  goals: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  times: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  units: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default Chart
