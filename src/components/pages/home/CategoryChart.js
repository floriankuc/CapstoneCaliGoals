import PropTypes from 'prop-types'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { colors } from '../../../common/styles/theme'

CategoryChart.propTypes = {
  categoryData: PropTypes.array.isRequired,
  categoryCount: PropTypes.array.isRequired,
}

function CategoryChart({ categoryData, categoryCount }) {
  const CHARTDATA = {
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

  const CHARTOPTIONS = {
    plugins: {
      datalabels: { color: `${colors.black}` },
    },
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontFamily: 'Roboto, sans-serif',
        fontColor: `${colors.black}`,
        fontSize: 15,
      },
    },
  }

  return (
    <div
      className="chart-test"
      style={{
        position: 'relative',
        margin: '40px 0',
        width: '100%',
      }}
    >
      <Doughnut options={CHARTOPTIONS} data={CHARTDATA} />
    </div>
  )
}

export default CategoryChart
