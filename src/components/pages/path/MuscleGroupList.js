import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'
import FormHeadline from '../../../common/FormHeadline'
import { colors, mixins } from '../../../common/styles/theme'
import TitleAndErrorContainer from '../../../common/TitleAndErrorContainer'
import { isThereAnyExerciseSelected } from '../../../utils'

MuscleGroupList.propTypes = {
  exercises: PropTypes.array.isRequired,
  filteredCategory: PropTypes.string.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  setFilteredCategory: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
}

function MuscleGroupList({
  exercises,
  filteredCategory,
  selectedOptions,
  setFilteredCategory,
  validationErrors,
}) {
  return (
    <>
      <TitleAndErrorContainer>
        <FormHeadline number={'02'}>Exercises</FormHeadline>
        {renderExercisesErrorMessage()}
      </TitleAndErrorContainer>
      <MuscleGroupContainer>{renderOptionButtons()}</MuscleGroupContainer>
    </>
  )

  function renderOptionButtons() {
    return selectedOptions.map((selectedOption, i) => {
      return (
        <OptionButton
          key={i}
          value={selectedOption.name}
          className={filteredCategory === selectedOption.name ? 'active' : ''}
          onClick={() => setFilteredCategory(selectedOption.name)}
        >
          {selectedOption.name}
        </OptionButton>
      )
    })
  }

  function renderExercisesErrorMessage() {
    return (
      <ErrorMessage>
        {isThereAnyExerciseSelected(exercises) &&
          validationErrors.exercisesError}
      </ErrorMessage>
    )
  }
}

const ErrorMessage = styled.span`
  color: ${colors.lightred};
`

const OptionButton = styled.button`
  ${mixins.tileButton};
`

const MuscleGroupContainer = styled.section`
  ${mixins.tileList};
  margin-bottom: 4px;
  grid-template-columns: repeat(4, 25%);
`

export default MuscleGroupList
