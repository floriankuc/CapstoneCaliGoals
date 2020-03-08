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

    const unsubscribe = firebase
      .firestore()
      .collection('EXERCISES')
      .onSnapshot(snapshot => {
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
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {renderOptionButtons()}
            {renderExercises(filteredCategory)}
            {/* RENDERING BOTTOM GOALS LIST */}
            <UserInputForm
              handleGoalSubmit={handleGoalSubmit}
              exercises={exercises}
              updateGoal={updateGoal}
              selectExercise={selectExercise}
            />
          </div>
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

      firebase
        .firestore()
        .collection('paths')
        .add({
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

const OptionButton = styled.button`
  border: 1px solid #111;

  &.active {
    color: red;
  }
`

Path.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Path
