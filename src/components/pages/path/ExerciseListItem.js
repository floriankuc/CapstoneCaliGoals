import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { colors } from '../../../common/styles/colors'

const ExerciseListItem = ({ exercise, selectExercise }) => {
  return (
    <ListItem
      key={exercise.id}
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
  width: 100%;
  display: block;

  &:hover {
    cursor: pointer;

    &:after {
      background: ${colors.black};
      transition: all 0.05s ease-in-out;
    }
  }

  &:after {
    content: '';
    background: ${colors.lightestgrey};
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
      background: ${colors.black};
      width: 24px;
      height: 24px;
      transform: translate(-2px, 2px);
      position: absolute;
      bottom: 8px;
      left: 60%;
      z-index: 2;
      transition: all 0.15s ease-in-out;
    }
  }
`

ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  selectExercise: PropTypes.func.isRequired,
}

export default ExerciseListItem
