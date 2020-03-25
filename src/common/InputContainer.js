import React from 'react'
import styled from 'styled-components/macro'
import { colors } from './styles/theme'
import PropTypes from 'prop-types'

InputContainer.propTypes = {
  array: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  changeHandler: PropTypes.func.isRequired,
  setInputFocus: PropTypes.func.isRequired,
}

function InputContainer({ array, changeHandler, setInputFocus }) {
  return (
    <StyledInputContainer>
      <p>{array.title}</p>
      <StyledInputFieldContainer>
        <StyledUnitInput
          required
          className="input"
          data-id={array.id}
          name={array.title}
          type="number"
          value={array.amountDone || ''}
          onChange={e => changeHandler(array.id, e.target.value)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        <p>{array.unit}</p>
      </StyledInputFieldContainer>
    </StyledInputContainer>
  )
}

const StyledInputFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-template-rows: 100%;

  .removeExerciseButton {
    height: 100%;
    font-size: 26px;
    transition: color 0.1s ease-in-out;

    &:hover {
      color: ${colors.red};
      cursor: pointer;
    }
  }
`

const StyledInputContainer = styled.div`
  width: 100%;
  background: ${colors.lightestgrey};
  padding: 8px;
  display: flex;
  justify-content: space-between;
  margin: 1px 0;

  p {
    display: inline-block;
  }
`

const StyledUnitInput = styled.input`
  font-size: 22px;
  width: 36px;
  height: 100%;
  text-align: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.red};
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  transition: all 0.1s ease-in-out;

  &:focus {
    box-shadow: 0 1px 0 0 ${colors.red};
    width: 40px;
    transform: translateX(-2px);
  }

  p {
    display: inline-block;
    width: 10%;
  }
`

export default InputContainer
