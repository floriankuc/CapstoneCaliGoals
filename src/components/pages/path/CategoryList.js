import React from 'react'
import styled from 'styled-components/macro'

const CategoryList = props => {
  const CATEGORIES = ['strength', 'figures', 'hybrid', 'cardio', 'endurance']

  const renderCategoryButton = () => {
    return CATEGORIES.map(category => {
      return (
        <>
          <CategoryButton
            name={category}
            className={props.pathCategory === category ? 'active' : ''}
            onClick={() => props.setPathCategory(category)}
          >
            {category
              .split(' ')
              .map(el => el[0].toUpperCase() + el.slice(1, el.length))
              .join(' ')}
          </CategoryButton>
        </>
      )
    })
  }

  return (
    <>
      <p>Category:</p>
      <StyledButtonNav>{renderCategoryButton()}</StyledButtonNav>
    </>
  )
}

export default CategoryList

const CategoryButton = styled.button`
  font-family: 'Oswald';
  padding: 10px 0;
  background: #111;
  color: #111;
  border: 1px solid #111;
  font-size: 16px;
  width: 100%;
  height: 133%;
  margin: 0 1px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  /* transition: all 0.05s ease-in; */

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 1px);
    height: calc(100% - 1px);
    background: #fff;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    z-index: -1;
  }

  &:nth-child(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / 2;
  }

  &:nth-child(2) {
    grid-column: 3 / span 2;
    grid-row: 1 / 2;
  }

  &:nth-child(3) {
    grid-column: 5 / span 2;
    grid-row: 1 / 2;
  }

  &:nth-child(4) {
    grid-column: 2 / span 2;
    grid-row: 2 / 3;
  }

  &:nth-child(5) {
    grid-column: 4 / span 2;
    grid-row: 2 / 3;
  }

  &:hover {
    cursor: pointer;
  }

  &.active {
    &:after {
      background: #111;
    }
    /* color: #111; */
    background: #111;
    /* border-color: red; */
    color: #fff;
  }
`

const StyledButtonNav = styled.nav`
  flex-grow: 1;
  display: grid;
  /* grid-auto-flow: column; */
  /* display: grid; */
  grid-template-columns: repeat(6, 16%);
  grid-template-rows: repeat(2, 54px);
  grid-gap: 2px;
  background-color: #fff;
`
