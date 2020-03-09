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
      <StyledButton style={{ display: 'block', marginTop: '20px' }}>
        Create path
      </StyledButton>
    </form>
  )

  function renderExercisesWithUserInputs() {
    return exercises
      .filter(exercise => exercise.selected === true)
      .sort((a, b) => a.title + b.title)
      .map(exercise => (
        <InputContainer>
          <p>{exercise.title}</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100px',
            }}
          >
            <UnitInput
              data-id={exercise.id}
              name={exercise.title}
              value={exercise.amount || ''}
              type="number"
              onChange={e => updateGoal(exercise.id, e.target.value)}
              required
            />
            <p>{exercise.unit}</p>
            <span onClick={() => selectExercise(exercise.id)}>X</span>
          </div>
        </InputContainer>
      ))
  }
}

const InputContainer = styled.div`
  width: 100%;
  background: pink;
  background: #efefef;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  margin: 1px 0;

  p {
    display: inline-block;
  }
`

const StyledButton = styled.button`
  margin: 0 auto;
  display: block;
  border: none;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;
  font-size: 16px;

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
  font-size: 22px;
  width: 36px;
  height: 100%;
  text-align: center;
  background: #efefef;
  border: none;
  border-bottom: 1px solid red;
  -webkit-appearance: none;
  -moz-appearance: textfield;

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
