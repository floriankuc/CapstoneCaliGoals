import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'
import FormHeadline from '../../../common/FormHeadline'
import { colors, mixins } from '../../../common/styles/theme'
import TitleAndErrorContainer from '../../../common/TitleAndErrorContainer'
import { capitalise } from '../../../utils'

CategoryList.propTypes = {
  pathCategory: PropTypes.string.isRequired,
  setPathCategory: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
}

function CategoryList({ pathCategory, setPathCategory, validationErrors }) {
  const CATEGORIES = [
    'strength',
    'figures',
    'hybrid',
    'cardio',
    'endurance',
    'mobility',
  ]

  return (
    <section>
      <TitleAndErrorContainer>
        <FormHeadline number={'01'}>Category</FormHeadline>
        {renderCategoryErrorMessage()}
      </TitleAndErrorContainer>
      <StyledButtonNav data-test="nav">
        {renderCategoryButton()}
      </StyledButtonNav>
    </section>
  )

  function renderCategoryErrorMessage() {
    return (
      <ErrorMessage>
        {pathCategory === '' && validationErrors.categoryError}
      </ErrorMessage>
    )
  }

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
    return capitalise(category)
  }
}

const ErrorMessage = styled.span`
  color: ${colors.lightred};
`

const CategoryButton = styled.button`
  ${mixins.tileButton};
`

const StyledButtonNav = styled.section`
  ${mixins.tileList};
  margin-bottom: 20px;
  grid-template-columns: repeat(3, 33.3%);
`

export default CategoryList
