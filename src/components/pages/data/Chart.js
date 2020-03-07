import React from 'react'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const Chart = ({ data, exercise, dataArr, goals }) => {
  const getSessionTimes = () => {
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
  //ACHSENBESCHRIFTUNG!!!

  const sampleDiagram = {
    labels: getSessionTimes(),
    datasets: [
      {
        label: exercise, //kommt von data, exercise drillt ab dort runter
        // backgroundColor: ['red'],
        borderColor: 'red',
        spanGaps: true,
        lineTension: 0,
        data: dataArr, //wie exercise von oben runterpassen pro iteration
      },
    ],
  }

  const compareGoalToSession = () => {
    return dataArr.some(result => result >= goals[0])
      ? 'Goal reached!'
      : 'Work it'
  }

  return (
    <div style={{ position: 'relative', width: 280, height: 300 }}>
      <p>{compareGoalToSession()}</p>
      <Line
        options={{
          plugins: { datalabels: { color: 'black', align: '2px' } },
          responsive: true,
          legend: { position: 'bottom' },
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
        }}
        data={sampleDiagram}
      />
    </div>
  )
}

export default Chart
