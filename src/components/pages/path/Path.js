import firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import CategoryList from './CategoryList'
import OPTIONS from './OPTIONS'
import OngoingPathContent from './OngoingPathContent'
import ExerciseListItem from './ExerciseListItem'
import PropTypes from 'prop-types'
import UserInputForm from './UserInputForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Toast from '../../../common/Toast'
import { exercisesRef, pathsRef } from '../../../firebase'

// ?. nutzen
const Path = ({ path }) => {
  const [exercises, setExercises] = useState([])
  const [pathCategory, setPathCategory] = useState('')
  const [filteredCategory, setFilteredCategory] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([OPTIONS])
  const [validationErrors, setValidationErrors] = useState({
    categoryError: '',
    exercisesError: '',
  })

  useEffect(() => {
    setSelectedOptions(OPTIONS)

    const unsubscribe = exercisesRef.onSnapshot(snapshot => {
      const exercise = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setExercises(exercise)
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Toast enableMultiContainer containerId={'pathDeletedContainer'} />
      {path.length < 1 ? (
        <div>
          <h2>Create your path</h2>
          <CategoryList
            pathCategory={pathCategory}
            setPathCategory={setPathCategory}
            data-test="list"
          />
          <ErrorMessage>
            {pathCategory === '' && validationErrors.categoryError}
          </ErrorMessage>
          <ErrorMessage>{validationErrors.exercisesError}</ErrorMessage>
          {/* RENDERING UPPER EXERCISE LIST */}
          <p>Exercises:</p>
          <MuscleGroupContainer>
            {renderOptionButtons()}
            {/* RENDERING BOTTOM GOALS LIST */}
          </MuscleGroupContainer>
          {renderExercises(filteredCategory)}
          <UserInputForm
            handleGoalSubmit={handleGoalSubmit}
            exercises={exercises}
            updateGoal={updateGoal}
            selectExercise={selectExercise}
          />
        </div>
      ) : (
        <>
          <OngoingPathContent path={path} />
          <Toast enableMultiContainer containerId={'pathCreatedContainer'} />
        </>
      )}
    </>
  )

  function selectExercise(id) {
    const index = exercises.findIndex(exercise => exercise.id === id)
    setExercises([
      ...exercises.slice(0, index),
      {
        ...exercises[index],
        selected: !exercises[index].selected,
        amount: 0,
      },
      ...exercises.slice(index + 1),
    ])
  }

  function updateGoal(id, value) {
    const index = exercises.findIndex(exercise => exercise.id === id)
    setExercises([
      ...exercises.slice(0, index),
      { ...exercises[index], amount: value },
      ...exercises.slice(index + 1),
    ])
  }

  function renderExercises(category) {
    const filteredExercises = exercises.filter(ex => ex.category === category)
    return filteredExercises.map(exercise => (
      <ExerciseListItem exercise={exercise} selectExercise={selectExercise} />
    ))
  }

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

  function validate() {
    let categoryError = ''
    let exercisesError = ''

    if (pathCategory === '') {
      categoryError = 'Select a category'
    }

    if (exercises.filter(exercise => exercise.selected === true).length === 0) {
      exercisesError = 'Select at least one exercise with a goal'
    }

    if (categoryError) {
      setValidationErrors({ categoryError })
      return false
    }

    if (exercisesError) {
      setValidationErrors({ exercisesError })
      return false
    }

    return true
  }

  function handleGoalSubmit(e) {
    e.preventDefault()
    const isValid = validate()
    if (isValid) {
      const selectedExercisesAreGoals = exercises.filter(
        exercise => exercise.selected === true
      )

      pathsRef.add({
        category: pathCategory,
        selectedExercisesAreGoals,
      })
      toast('Path created.', { containerId: 'pathCreatedContainer' })
    }
  }
}

const ErrorMessage = styled.p`
  color: red;
`

const MuscleGroupContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: auto auto;
  width: 100%;
  max-width: 450px;
  grid-gap: 1px;
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

Path.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Path
