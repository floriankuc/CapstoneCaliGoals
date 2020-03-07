import React from 'react'
import styled from 'styled-components/macro'

const CategoryList = props => {
  const CATEGORIES = ['strength', 'figures', 'hybrid', 'cardio', 'endurance']

  return (
    <>
      <p>Category:</p>
      <StyledButtonNav>{renderCategoryButton()}</StyledButtonNav>
    </>
  )

  function renderCategoryButton() {
    return CATEGORIES.map(category => (
      <CategoryButton
        name={category}
        className={props.pathCategory === category ? 'active' : ''}
        onClick={() => props.setPathCategory(category)}
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

export default CategoryList

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
