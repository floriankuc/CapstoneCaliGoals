import PropTypes from 'prop-types'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { colors } from '../../../common/styles/theme'
import styled from 'styled-components'

CategoryChart.propTypes = {
  categoryData: PropTypes.array.isRequired,
  categoryCount: PropTypes.array.isRequired,
}

function CategoryChart({ categoryData, categoryCount }) {
  const chartData = {
    labels: categoryCount,
    datasets: [
      {
        backgroundColor: [
          `${colors.red}`,
          `${colors.lightgrey}`,
          `${colors.darkred}`,
          `${colors.grey}`,
          `${colors.lightred}`,
          `${colors.darkgrey}`,
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
        fontFamily: 'Roboto, sans-serif',
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
        margin: '50px 0',
        width: '100%',
      }}
    >
      <Doughnut options={chartOptions} data={chartData} />
    </div>
  )
}

export default CategoryChart
