import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const CategoryList = ({ pathCategory, setPathCategory }) => {
  const CATEGORIES = [
    'strength',
    'figures',
    'hybrid',
    'cardio',
    'endurance',
    'mobility',
  ]

  return (
    <>
      {/* <p style={{ marginBottom: '10px' }}>Category</p> */}
      <StyledButtonNav>{renderCategoryButton()}</StyledButtonNav>
    </>
  )

  function renderCategoryButton() {
    return CATEGORIES.map((category, i) => (
      <CategoryButton
        key={i}
        name={category}
        className={pathCategory === category ? 'active' : ''}
        onClick={() => setPathCategory(category)}
      >
        {capitaliseCategoryNames(category)}
      </CategoryButton>
    ))
  }

  function capitaliseCategoryNames(category) {
    return category
      .split(' ')
      .map(el => el[0].toUpperCase() + el.slice(1, el.length))
      .join(' ')
  }
}

const CategoryButton = styled.button`
  font-family: Roboto;
  padding: 14px 0;
  background: #1111;
  color: #111;
  border: none;
  font-size: 16px;
  width: 100px;
  margin: 2px;
  transition: all 0.05s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &.active,
  &:hover {
    background: #111;
    color: #fff;
  }
`

const StyledButtonNav = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
`

CategoryList.propTypes = {
  pathCategory: PropTypes.string.isRequired,
  setPathCategory: PropTypes.func.isRequired,
}

export default CategoryList
