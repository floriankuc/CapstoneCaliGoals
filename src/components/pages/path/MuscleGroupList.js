import React from 'react'
import styled from 'styled-components/macro'

const MuscleGroupList = ({
  exercises,
  filteredCategory,
  selectedOptions,
  setFilteredCategory,
  validationErrors,
}) => {
  return (
    <>
      <p>Exercises:</p>
      {renderExercisesErrorMessage()}
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
  color: red;
`

const OptionButton = styled.button`
  font-family: Roboto;
  padding: 14px 0;
  background: #1111;
  color: #111;
  border: none;
  font-size: 16px;
  width: 100%;
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

const MuscleGroupContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: auto auto;
  width: 100%;
  max-width: 450px;
  grid-gap: 1px;
`

export default MuscleGroupList
