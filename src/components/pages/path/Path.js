import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TransitionWrapper from '../../../common/TransitionWrapper'
import { getExercises, savePath } from '../../../services'
import CategoryList from './CategoryList'
import ExerciseListItem from './ExerciseListItem'
import MuscleGroupList from './MuscleGroupList'
import OngoingPathContent from './OngoingPathContent'
import OPTIONS from './OPTIONS'
import UserInputForm from './UserInputForm'
import { isThereAnyExerciseSelected } from '../../../utils'

Path.propTypes = {
  path: PropTypes.array.isRequired,
}

function Path({ path, setInputFocus }) {
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
    getExercises(setExercises)
  }, [])

  let history = useHistory()

  return (
    <TransitionWrapper>
      {path.length < 1 ? (
        <>
          <h2>Create your path</h2>
          <CategoryList
            pathCategory={pathCategory}
            setPathCategory={setPathCategory}
            data-test="list"
            validationErrors={validationErrors}
          />
          <MuscleGroupList
            exercises={exercises}
            selectedOptions={selectedOptions}
            filteredCategory={filteredCategory}
            setFilteredCategory={setFilteredCategory}
            validationErrors={validationErrors}
          />
          {renderExercises(filteredCategory)}
          <UserInputForm
            data-testid="userinputform"
            handleGoalSubmit={handleGoalSubmit}
            exercises={exercises}
            updateGoal={updateGoal}
            selectExercise={selectExercise}
            setInputFocus={setInputFocus}
          />
        </>
      ) : (
        <OngoingPathContent path={path} />
      )}
    </TransitionWrapper>
  )

  function selectExercise(id) {
    const index = exercises.findIndex(exercise => exercise.id === id)
    setExercises([
      ...exercises.slice(0, index),
      {
        ...exercises[index],
        selected: !exercises[index].selected,
        amount: 0,
        timeSelected: new Date().getTime(),
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
      <ExerciseListItem
        key={exercise.id}
        exercise={exercise}
        selectExercise={selectExercise}
      />
    ))
  }

  function handleGoalSubmit(e) {
    e.preventDefault()
    const isValid = validate()
    if (isValid) {
      const selectedExercisesAreGoals = exercises.filter(
        exercise => exercise.selected === true
      )
      savePath(pathCategory, selectedExercisesAreGoals)
      toast('Path created.', { containerId: 'pathCreatedContainer' })
      history.push('/')
    }
  }

  function validate() {
    let categoryError = ''
    let exercisesError = ''

    if (pathCategory === '') {
      categoryError = 'Select a category'
    }

    if (isThereAnyExerciseSelected(exercises)) {
      exercisesError = 'Select at least one exercise'
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
}

export default Path
