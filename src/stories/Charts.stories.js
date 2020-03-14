import React from 'react'
import GlobalStyles from './../common/styles/GlobalStyles'
import Chart from '../components/pages/data/Chart'
import CategoryChart from '../components/pages/home/CategoryChart'

export default {
  title: 'Charts',
  component: Chart,
  CategoryChart,
}

export const ChartCategory = () => (
  <>
    <GlobalStyles />
    <div style={{ position: 'relative', width: 400 }}>
      <CategoryChart
        categoryData={['2', '3', '4']}
        categoryCount={['Chest', 'Back', 'Cardio']}
      />
    </div>
  </>
)

export const ChartData = () => (
  <div style={{ width: 400 }}>
    <GlobalStyles />
    <Chart
      exercise={'Exercise name'}
      dataArr={['3', '5', '6']}
      goals={['5']}
      times={['Date of session 1', 'Date of session 2', 'Date of session 3']}
      units={['mins']}
    />
  </div>
)
