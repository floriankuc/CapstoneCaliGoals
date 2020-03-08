import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const CategoryList = ({ pathCategory, setPathCategory }) => {
  const CATEGORIES = ['strength', 'figures', 'hybrid', 'cardio', 'endurance']

  return (
    <>
      <p>Category:</p>
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
  font-family: 'Oswald';
  padding: 10px 0;
  background: #fff;
  color: #111;
  border: 1px solid #111;
  font-size: 16px;
  width: 100%;
  margin: 1px;

  &:hover {
    cursor: pointer;
  }

  &.active {
    background: #111;
    color: #fff;
  }
`

const StyledButtonNav = styled.nav`
  flex-grow: 1;
  display: flex;
`

CategoryList.propTypes = {
  pathCategory: PropTypes.string.isRequired,
  setPathCategory: PropTypes.func.isRequired,
}

export default CategoryList
