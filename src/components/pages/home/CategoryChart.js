import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import { colors } from '../../../common/styles/colors'

const CategoryChart = ({ categoryData, categoryCount }) => {
  const chartData = {
    labels: categoryCount,
    datasets: [
      {
        backgroundColor: [
          `${colors.red}`,
          `${colors.grey}`,
          `${colors.lightred}`,
          `${colors.darkgrey}`,
          `${colors.darkred}`,
          `${colors.lightgrey}`,
        ],
        data: categoryData,
        borderColor: `${colors.black}`,
        borderWidth: '1',
      },
    ],
  }

  const chartOptions = {
    plugins: {
      datalabels: { color: `${colors.black}` },
    },
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontFamily: 'Roboto',
        fontColor: `${colors.black}`,
        fontSize: 14,
      },
    },
  }

  return (
    <div
      className="chart-test"
      style={{
        position: 'relative',
        margin: '20px 0 50px 0',
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
