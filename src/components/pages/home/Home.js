import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import CategoryChart from './CategoryChart'
import PropTypes from 'prop-types'

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

  return (
    <div>
      <h1>CaliGoals</h1>
      {path.length > 0 ? (
        <>
          <p>Welcome back.</p>
          <p>Your current path is: {renderPath()}</p>
          <CategoryChart
            categoryData={countedCategoryData()}
            categoryCount={countCategorys()}
          />
          <StyledLink to="/sessions">Working out? Log your session.</StyledLink>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '40px' }}>
            <p>Clean training.</p>
            <p>Clean tracking.</p>
          </div>
          <StyledLink to="/path">Create a new training path</StyledLink>
        </>
      )}
    </div>
  )

  function capitaliseCategoryName(category) {
    return path[0].category
      .split(' ')
      .map(el => el[0].toUpperCase() + el.slice(1, el.length))
      .join(' ')
  }

  function renderPath() {
    return capitaliseCategoryName(path[0].category)
  }

  function countedCategoryData() {
    if (path.length > 0) {
      const countedCategories = {}
      categories.map(
        category =>
          (countedCategories[category] = (countedCategories[category] || 0) + 1)
      )
      const categoryValues = Object.values(countedCategories)
      return categoryValues
    }
  }

  function countCategorys() {
    if (path.length > 0) {
      const countedCategories = [...new Set(categories)]
      return countedCategories
    }
  }
}

const StyledLink = styled(Link)`
  margin: 1px auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;

  &:hover:after,
  &:active:after {
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
    transition: all 0.1s ease-out;
  }
`
Home.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Home
