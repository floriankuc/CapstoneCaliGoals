import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import CategoryChart from './CategoryChart'
import PropTypes from 'prop-types'

const Home = ({ path }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (path.length) {
      const categories = path[0].selectedExercisesAreGoals.map(
        path => path.category
      )
      setCategories(categories)
    }
  }, [path])

  return (
    <HomeSection>
      <h1>Caligoals</h1>
      {path?.length ? (
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
          <p>Clean tracking.</p>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Define your training path, log your workouts and track your goals.
          </p>
          <StyledLink to="/path" mt={!path?.length ? '80px' : ''}>
            Create a new training path
          </StyledLink>
        </>
      )}
    </HomeSection>
  )

  function capitaliseCategoryName(category) {
    return path[0].category
      .split(' ')
      .map(el => el[0].toUpperCase() + el.slice(1, el.length))
      .join(' ')
  }

  function renderPath() {
    return (
      <CategorySpan>{capitaliseCategoryName(path[0].category)}</CategorySpan>
    )
  }

  function countedCategoryData() {
    if (path.length) {
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
    if (path.length) {
      const countedCategories = [...new Set(categories)]
      return countedCategories
    }
  }
}

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const StyledLink = styled(Link)`
  margin-top: ${props => props.mt};
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
    transition: all 0.1s ease-in-out;
  }
`

const CategorySpan = styled.span`
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background: red;
    position: absolute;
    bottom: -4px;
    left: 0;
  }
`
Home.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Home
