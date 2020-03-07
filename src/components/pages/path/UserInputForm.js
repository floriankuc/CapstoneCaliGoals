import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

const UserInputForm = ({
  exercises,
  updateGoal,
  selectExercise,
  handleGoalSubmit,
}) => {
  return (
    <form onSubmit={handleGoalSubmit}>
      {renderExercisesWithUserInputs()}
      <StyledLinkText style={{ display: 'block' }}>Create path</StyledLinkText>
    </form>
  )

  function renderExercisesWithUserInputs() {
    return exercises
      .filter(exercise => exercise.selected === true)
      .sort((a, b) => a.title + b.title)
      .map(exercise => (
        <div>
          <span style={{ fontSize: '16px' }}>{exercise.title}</span>
          <UnitInput
            data-id={exercise.id}
            name={exercise.title}
            value={exercise.amount || ''}
            type="number"
            onChange={e => updateGoal(exercise.id, e.target.value)}
            required
          />
          <span>{exercise.unit}</span>
          <span onClick={() => selectExercise(exercise.id)}>X</span>
        </div>
      ))
  }
}

const StyledLinkText = styled.button`
  margin: 0 auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;

  &:hover:after {
    top: -6px;
    left: 6px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    background: red;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

const UnitInput = styled.input`
  font-size: 16px;
  width: 36px;
  -webkit-appearance: none;
  margin: d0;
  -moz-appearance: textfield;
`

UserInputForm.propTypes = {
  exercises: PropTypes.array.isRequired,
  updateGoal: PropTypes.func.isRequired,
  selectExercise: PropTypes.func.isRequired,
  handleGoalSubmit: PropTypes.func.isRequired,
}

export default UserInputForm
