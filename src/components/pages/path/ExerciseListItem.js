import React from 'react'

const ExerciseListItem = ({ exercise, selectExercise }) => {
  return (
    <div key={exercise.id} style={{ display: 'block', width: '100%' }}>
      <label htmlFor={exercise.id}>
        <span>{exercise.title}</span>
      </label>
      <input
        id={exercise.id}
        name={exercise.title}
        type="checkbox"
        onChange={() => selectExercise(exercise.id)}
        checked={exercise.selected ? true : false}
      />
    </div>
  )
}

export default ExerciseListItem
