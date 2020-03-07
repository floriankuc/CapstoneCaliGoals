import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import hexagon from '../../../common/hex.svg'

const Home = ({ path }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (path.length > 0) {
      const categories = path[0].selectedExercisesAreGoals.map(
        path => path.category
      )
      setCategories(categories)
    }
  }, [path])

  function renderPath() {
    return (
      (path.length > 0 && (
        <>
          {path[0].category
            .split(' ')
            .map(el => el[0].toUpperCase() + el.slice(1, el.length))
            .join(' ')}
        </>
      )) || <StyledLinkText to="/path">Create a path</StyledLinkText>
    )
  }

  function countedCategoryData() {
    if (path.length > 0) {
      const countedCategories = {}
      categories.map(category => {
        countedCategories[category] = (countedCategories[category] || 0) + 1
      })
      const values = Object.values(countedCategories)
      return values
    }
  }

  function countCategorys() {
    if (path.length > 0) {
      const countedCategories = [...new Set(categories)]
      return countedCategories
    }
  }

  const chartData = {
    labels: countCategorys(),
    datasets: [
      {
        backgroundColor: ['red', 'darkgrey', 'grey', 'pink'],
        data: countedCategoryData(),
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
    <div>
      <h1>CaliGoals</h1>
      {path.length > 0 ? (
        <>
          <p>Welcome back.</p>
          <p>Your current path is: {renderPath()}</p>
          <div
            style={{
              position: 'relative',
              margin: '40px 0',
              width: '100%',
            }}
          >
            <Doughnut options={chartOptions} data={chartData} />
          </div>
          <StyledLinkText to="/sessions">
            Working out? Log your sesh.
          </StyledLinkText>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '40px' }}>
            <p>Clean training.</p>
            <p>Clean tracking.</p>
          </div>
          <StyledLinkText to="/path">Create a new training path</StyledLinkText>
        </>
      )}
    </div>
  )
}

const StyledLinkText = styled(Link)`
  margin: 1px auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;

  &:hover:after {
    top: -6px;
    left: 6px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    background: red;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

export default Home
