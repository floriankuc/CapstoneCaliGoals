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
}

function SessionForm({ handleSessionSubmit, session, updateSessionExercise }) {
  const [validationErrors, setValidationErrors] = useState({
    sessionError: '',
  })

  return (
    <form onSubmit={e => validateAndSubmit(e)} style={{ marginTop: 12 }}>
      {editingTheseExercises().length > 0 && renderSessionHeadline()}
      {session &&
        editingTheseExercises().map(session => (
          <InputContainer
            array={session}
            changeHandler={updateSessionExercise}
          />
          // <InputContainer>
          //   <p>{session.title}</p>
          //   <InputFieldContainer>
          //     <UnitInput
          //       required
          //       className="input"
          //       data-id={session.id}
          //       name={session.title}
          //       type="number"
          //       value={session.amountDone || ''}
          //       onChange={e =>
          //         updateSessionExercise(session.id, e.target.value)
          //       }
          //     />
          //     <p>{session.unit}</p>
          //   </InputFieldContainer>
          // </InputContainer>
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

// const InputFieldContainer = styled.div`
//   display: grid;
//   grid-template-columns: 40px 40px 40px;
//   grid-template-rows: 100%;

//   .removeExerciseButton {
//     height: 100%;
//     font-size: 26px;
//     transition: color 0.1s ease-in-out;

//     &:hover {
//       color: ${colors.red};
//       cursor: pointer;
//     }
//   }
// `

// const InputContainer = styled.div`
//   width: 100%;
//   background: ${colors.lightestgrey};
//   padding: 8px;
//   display: flex;
//   justify-content: space-between;
//   margin: 1px 0;

//   p {
//     display: inline-block;
//   }
// `

// const UnitInput = styled.input`
//   font-size: 22px;
//   width: 36px;
//   height: 100%;
//   text-align: center;
//   background: transparent;
//   border: none;
//   border-bottom: 1px solid ${colors.red};
//   -webkit-appearance: none;
//   -moz-appearance: textfield;
//   transition: all 0.1s ease-in-out;

//   &:focus {
//     box-shadow: 0 1px 0 0 ${colors.red};
//     width: 40px;
//     transform: translateX(-2px);
//   }

//   p {
//     display: inline-block;
//     width: 10%;
//   }
// `

export default SessionForm
