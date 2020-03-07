import React from 'react'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const Chart = ({ exercise, dataArr, goals, times }) => {
  //TODO: ACHSENBESCHRIFTUNG!

  const exerciseChart = {
    labels: times,
    datasets: [
      {
        label: exercise,
        // backgroundColor: ['red'],
        borderColor: 'red',
        spanGaps: true,
        lineTension: 0,
        data: dataArr,
      },
    ],
  }

  const chartOptions = {
    plugins: { datalabels: { color: 'black', align: '2px' } },
    responsive: true,
    legend: { position: 'bottom', fontFamily: 'Roboto' },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
  }

  return (
    <div style={{ position: 'relative', width: 280, height: 300 }}>
      {compareGoalToSession()}
      <Line options={chartOptions} data={exerciseChart} />
    </div>
  )

  function compareGoalToSession() {
    return dataArr.some(result => result >= goals[0])
      ? 'Goal reached!'
      : 'Almost there. Go again!'
  }
}

export default Chart
