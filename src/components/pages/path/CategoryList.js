import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { capitalise } from '../../../utils'
import { colors, mixins } from '../../../common/styles/theme'
import FormHeadline from '../../../common/FormHeadline'
import TitleAndErrorContainer from '../../../common/TitleAndErrorContainer'

const CategoryList = ({ pathCategory, setPathCategory, validationErrors }) => {
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
        <p>
          <FormHeadline number={'01'}>Category</FormHeadline>
        </p>
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
  margin-top: 4px;
  margin-bottom: 20px;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 33.3%);
  grid-template-rows: auto auto;
  width: 100%;
  max-width: 450px;
`

CategoryList.propTypes = {
  pathCategory: PropTypes.string.isRequired,
  setPathCategory: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
}

export default CategoryList
