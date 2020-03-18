import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import ButtonBlack from '../../../common/ButtonBlack'
import FormHeadline from '../../../common/FormHeadline'
import { colors } from '../../../common/styles/theme'
import TitleAndErrorContainer from '../../../common/TitleAndErrorContainer'
import InputContainer from '../../../common/InputContainer'

SessionForm.propTypes = {
  handleSessionSubmit: PropTypes.func.isRequired,
  session: PropTypes.array.isRequired,
  updateSessionExercise: PropTypes.func.isRequired,
  setInputFocus: PropTypes.func.isRequired,
}

function SessionForm({
  handleSessionSubmit,
  session,
  updateSessionExercise,
  setInputFocus,
}) {
  const [validationErrors, setValidationErrors] = useState({
    sessionError: '',
  })

  return (
    <form onSubmit={e => validateAndSubmit(e)} style={{ marginTop: 12 }}>
      {editingTheseExercises().length > 0 && renderSessionHeadline()}
      {session &&
        editingTheseExercises().map(session => (
          <InputContainer
            key={session.id}
            array={session}
            changeHandler={updateSessionExercise}
            setInputFocus={setInputFocus}
          />
        ))}
      <TitleAndErrorContainer>
        {renderSessionErrorMessage()}
      </TitleAndErrorContainer>
      <ButtonBlack>Save session</ButtonBlack>
    </form>
  )

  function validateAndSubmit(e) {
    e.preventDefault()
    const isValid = validate()
    if (isValid) {
      handleSessionSubmit(e)
      setValidationErrors({ sessionError: '' })
    }
  }

  function renderSessionHeadline() {
    return <FormHeadline number={'02'}>This session</FormHeadline>
  }

  function renderSessionErrorMessage() {
    return (
      <ErrorMessage>
        {numberOfExercisesDoneInASession() === 0 &&
          validationErrors.sessionError}
      </ErrorMessage>
    )
  }

  function numberOfExercisesDoneInASession() {
    return session.filter(session => session.amountDone > 0).length
  }

  function editingTheseExercises() {
    return session.filter(session => session.editing === true)
  }

  function validate() {
    let sessionError = ''

    if (!numberOfExercisesDoneInASession()) {
      sessionError = 'Make at least one entry'
    }

    if (sessionError) {
      setValidationErrors({ sessionError })
      return false
    }

    return true
  }
}

const ErrorMessage = styled.span`
  color: ${colors.lightred};
`

export default SessionForm
