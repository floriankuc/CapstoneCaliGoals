import firebase from 'firebase'
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import CategoryList from './CategoryList'
import { Link } from 'react-router-dom'
import options from './options'
import OngoingPathContent from './OngoingPathContent'

function Path(props) {
  const [exercises, setExercises] = useState([])
  const [pathCategory, setPathCategory] = useState('')
  const [filteredCategory, setFilteredCategory] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([options])
  const [validationErrors, setValidationErrors] = useState({
    categoryError: '',
    exercisesError: '',
  })

  useEffect(() => {
    setSelectedOptions(options)
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
    //WENN DESELECTED WIRD, MUSS ICH UNIT UND VALUE ZURÜCKSETZEN
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
    ))
  }

  function deletePath(id) {
    props.deletePath(id)
  }

  function toggleSelectedOption(id) {
    const index = selectedOptions.findIndex(option => option.id === id)
    console.log(index)
    setSelectedOptions(selectedOptions.map(option => (option.selected = false)))
    setSelectedOptions([
      ...selectedOptions.slice(0, index),
      { ...selectedOptions[index], selected: true },
      ...selectedOptions.slice(index + 1),
    ])
  }

  function renderOptionButtons() {
    return selectedOptions.map(selectedOption => {
      return (
        <OptionButton
          value={selectedOption.name}
          className={filteredCategory === selectedOption.name ? 'active' : ''}
          onClick={e => setFilteredCategory(selectedOption.name)}
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
    console.log('called')
    const isValid = validate()
    if (isValid) {
      const selectedExercisesAreGoals = exercises.filter(
        exercise => exercise.selected === true //speichert nur alle, die selected sind, gut!
      )
      console.log(selectedExercisesAreGoals)
      firebase
        .firestore()
        .collection('paths')
        .add({
          category: pathCategory,
          selectedExercisesAreGoals,
        })
    }
  }

  function renderExercisesWithUserInputs() {
    return exercises
      .filter(exercise => exercise.selected === true) //toggles fine
      .sort((a, b) => a.title + b.title)
      .map((
        exercise //jede exercise mit selected true geht nach unten
      ) => (
        <div>
          <span style={{ fontSize: '16px' }}>{exercise.title}</span>
          <UnitInput
            data-id={exercise.id}
            name={exercise.title}
            value={exercise.amount || ''}
            type="number"
            onChange={
              event => updateGoal(exercise.id, event.target.value) //nur onchange
            }
            required
          />
          <span>{exercise.unit}</span>
          <span onClick={() => selectExercise(exercise.id)}>X</span>
        </div>
      ))
  }

  return (
    <>
      {props.path.length < 1 ? (
        <div>
          <h2>Create your path</h2>
          <CategoryList
            handleGoalSubmit={handleGoalSubmit}
            pathCategory={pathCategory}
            setPathCategory={setPathCategory}
          />
          <p>{validationErrors.categoryError}</p>
          <p>{validationErrors.exercisesError}</p>
          {pathCategory}
          {/* RENDERING UPPER EXERCISE LIST */}
          <p>Muscle group:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {renderOptionButtons()}
            {renderExercises(filteredCategory)}
            {/* RENDERING BOTTOM GOALS LIST */}
            <div>
              <form onSubmit={handleGoalSubmit}>
                {renderExercisesWithUserInputs()}
                <StyledLinkText style={{ display: 'block' }}>
                  Create path
                </StyledLinkText>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <OngoingPathContent deletePath={deletePath} path={props.path} />
      )}
    </>
  )
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

const OptionButton = styled.button`
  border: 1px solid #111;

  &.active {
    color: red;
  }
`

export default Path
