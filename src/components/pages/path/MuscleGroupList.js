import React from 'react'
import styled from 'styled-components/macro'
import { colors } from '../../../common/styles/colors'
import PropTypes from 'prop-types'
import FormHeadline from '../../../common/FormHeadline'
import TitleAndErrorContainer from '../../../common/TitleAndErrorContainer'

const MuscleGroupList = ({
  exercises,
  filteredCategory,
  selectedOptions,
  setFilteredCategory,
  validationErrors,
}) => {
  return (
    <>
      <TitleAndErrorContainer>
        <p>
          <FormHeadline number={'02'}>Exercises</FormHeadline>
        </p>
        {renderExercisesErrorMessage()}
      </TitleAndErrorContainer>
      <MuscleGroupContainer>{renderOptionButtons()}</MuscleGroupContainer>
    </>
  )

  function renderOptionButtons() {
    return selectedOptions.map(selectedOption => {
      return (
        <OptionButton
          key={selectedOption.id}
          value={selectedOption.name}
          className={filteredCategory === selectedOption.name ? 'active' : ''}
          onClick={() => setFilteredCategory(selectedOption.name)}
        >
          {selectedOption.name}
        </OptionButton>
      )
    })
  }

  function numberOfSelectedExercises() {
    return exercises.filter(exercise => exercise.selected === true).length
  }

  function renderExercisesErrorMessage() {
    return (
      <ErrorMessage>
        {numberOfSelectedExercises() === 0 && validationErrors.exercisesError}
      </ErrorMessage>
    )
  }
}

const ErrorMessage = styled.span`
  color: ${colors.lightred};
`

const OptionButton = styled.button`
  font-family: Roboto;
  padding: 12px 0;
  background: ${colors.lightestgrey};
  color: ${colors.black};
  border: none;
  font-size: 16px;
  font-weight: 200;
  width: 100%;
  height: 100%;
  transition: all 0.05s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &.active,
  &:hover {
    background: ${colors.black};
    color: ${colors.white};
  }
`

const MuscleGroupContainer = styled.section`
  margin: 4px 0;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: auto auto;
  width: 100%;
  max-width: 450px;
`

MuscleGroupList.propTypes = {
  exercises: PropTypes.array.isRequired,
  filteredCategory: PropTypes.string.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  setFilteredCategory: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
}

export default MuscleGroupList
