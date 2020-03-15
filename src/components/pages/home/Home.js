import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { colors, mixins } from '../../../common/styles/theme'
import TransitionWrapper from '../../../common/TransitionWrapper'
import { capitalise } from '../../../utils'
import CategoryChart from './CategoryChart'
import Header from './Header'

Home.propTypes = {
  path: PropTypes.array.isRequired,
}

function Home({ path }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    path.length && setCategories(readCategories())
  }, [path])

  return (
    <TransitionWrapper>
      <HomeSection>
        <Header />
        {path.length ? (
          <>
            <p>Your current path is: {renderPathCategory()}</p>
            <CategoryChart
              categoryData={numberOfExercisesOfCategory()}
              categoryCount={countCategories()}
            />
            <StyledLink to="/sessions">
              Working out? Log your session.
            </StyledLink>
          </>
        ) : (
          <>
            <IntroText>
              Define your training path, log your workouts and track your goals.
            </IntroText>
            <StyledLink to="/path" mt={!path.length ? '160px' : ''}>
              Create a new training path
            </StyledLink>
          </>
        )}
      </HomeSection>
    </TransitionWrapper>
  )

  function readCategories() {
    return path[0].selectedExercisesAreGoals.map(path => path.category)
  }

  function renderPathCategory() {
    return <CategorySpan>{capitalise(path[0].category)}</CategorySpan>
  }

  function numberOfExercisesOfCategory() {
    const countedCategories = {}
    categories.map(
      category =>
        (countedCategories[category] = (countedCategories[category] || 0) + 1)
    )
    const categoryValues = Object.values(countedCategories)
    return categoryValues
  }

  function countCategories() {
    const countedCategories = [...new Set(categories)]
    return countedCategories
  }
}

const IntroText = styled.p`
  text-align: center;
  margin-top: 60px;
  width: 350px;
`

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 50px 0;
`

const StyledLink = styled(Link)`
  margin-top: ${props => props.mt};
  ${mixins.squareButton}
`

const CategorySpan = styled.span`
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background: ${colors.red};
    position: absolute;
    bottom: -4px;
    left: 0;
  }
`

export default Home
