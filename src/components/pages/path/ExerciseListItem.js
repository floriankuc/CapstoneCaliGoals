import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const ExerciseListItem = ({ exercise, selectExercise }) => {
  return (
    <ListItem
      key={exercise.id}
      style={{
        display: 'block',
        width: '100%',
      }}
      id={exercise.id}
      onClick={() => selectExercise(exercise.id)}
      className={exercise.selected ? 'selected' : ''}
    >
      <p>{exercise.title}</p>
    </ListItem>
  )
}

const ListItem = styled.div`
  position: relative;
  padding: 6px;

  &:hover {
    cursor: pointer;

    &:after {
      background: #111;
      transition: all 0.05s ease-in-out;
    }
  }

  &:after {
    content: '';
    background: #efefef;
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 8px;
    left: 60%;
    z-index: 1;
  }

  &.selected {
    position: relative;

    &:after {
      content: '';
      background: #111;
      width: 20px;
      height: 20px;
      position: absolute;
      bottom: 8px;
      left: 60%;
      z-index: 2;
    }
  }
`

ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  selectExercise: PropTypes.func.isRequired,
}

export default ExerciseListItem
