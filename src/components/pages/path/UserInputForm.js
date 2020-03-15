import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { colors } from '../../../common/styles/colors'
import FormHeadline from '../../../common/FormHeadline'
import { AiFillMinusSquare } from 'react-icons/ai'
import ButtonBlack from '../../../common/ButtonBlack'

const UserInputForm = ({
  exercises,
  updateGoal,
  selectExercise,
  handleGoalSubmit,
}) => {
  return (
    <form onSubmit={handleGoalSubmit} style={{ marginTop: 20 }}>
      {numberOfSelectedExercises() !== 0 && (
        <FormHeadline number={'03'}>Set your goals</FormHeadline>
      )}
      {renderExercisesWithUserInputs()}
      <ButtonBlack>Create path</ButtonBlack>
    </form>
  )

  function renderExercisesWithUserInputs() {
    return exercises
      .filter(exercise => exercise.selected === true)
      .sort((a, b) => a.title + b.title)
      .map(exercise => (
        <InputContainer>
          <p>{exercise.title}</p>
          <InputFieldContainer>
            <UnitInput
              data-id={exercise.id}
              name={exercise.title}
              value={exercise.amount || ''}
              type="number"
              onChange={e => updateGoal(exercise.id, e.target.value)}
              required
            />
            <p>{exercise.unit}</p>
            <AiFillMinusSquare
              onClick={() => selectExercise(exercise.id)}
              className="removeExerciseButton"
            />
          </InputFieldContainer>
        </InputContainer>
      ))
  }

  function numberOfSelectedExercises() {
    return exercises.filter(exercise => exercise.selected === true).length
  }
}

const InputFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-template-rows: 100%;

  .removeExerciseButton {
    height: 100%;
    font-size: 26px;
    transition: color 0.1s ease-in-out;

    &:hover {
      color: ${colors.red};
      cursor: pointer;
    }
  }
`

const InputContainer = styled.div`
  width: 100%;
  background: ${colors.lightestgrey};
  padding: 6px;
  display: flex;
  justify-content: space-between;
  margin: 1px 0;

  p {
    display: inline-block;
  }
`

const UnitInput = styled.input`
  font-size: 22px;
  width: 36px;
  height: 100%;
  text-align: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.red};
  -webkit-appearance: none;
  -moz-appearance: textfield;
  transition: all 0.1s ease-in-out;

  &:focus {
    box-shadow: 0 1px 0 0 ${colors.red};
    width: 40px;
    transform: translateX(-2px);
  }

  p {
    display: inline-block;
    width: 10%;
  }
`

UserInputForm.propTypes = {
  exercises: PropTypes.array.isRequired,
  updateGoal: PropTypes.func.isRequired,
  selectExercise: PropTypes.func.isRequired,
  handleGoalSubmit: PropTypes.func.isRequired,
}

export default UserInputForm
