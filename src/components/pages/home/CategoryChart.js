import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'

const CategoryChart = ({ categoryData, categoryCount }) => {
  const chartData = {
    labels: categoryCount,
    datasets: [
      {
        backgroundColor: ['red', 'darkgrey', 'grey', 'pink'],
        data: categoryData,
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

CategoryChart.propTypes = {
  categoryData: PropTypes.array.isRequired,
  categoryCount: PropTypes.array.isRequired,
}

export default CategoryChart
