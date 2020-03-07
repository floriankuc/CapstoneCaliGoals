import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const CategoryChart = props => {
  const chartData = {
    labels: props.categoryCount,
    datasets: [
      {
        backgroundColor: ['red', 'darkgrey', 'grey', 'pink'],
        data: props.categoryData,
        borderColor: '#111',
        borderWidth: '1',
      },
    ],
  }

  const chartOptions = {
    plugins: { datalabels: { color: 'black' } },
    responsive: true,
    legend: { position: 'bottom', fontFamily: 'Roboto' },
  }

  return (
    <div
      style={{
        position: 'relative',
        margin: '40px 0',
        width: '100%',
      }}
    >
      <Doughnut options={chartOptions} data={chartData} />
    </div>
  )
}

export default CategoryChart
