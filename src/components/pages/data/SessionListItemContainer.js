import React, { useState } from 'react'
import styled from 'styled-components'
import { prependNumber } from '../../../utils'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import SessionExerciseContainer from './SessionExerciseContainer'
import FormHeadline from '../../../common/FormHeadline'
import { colors } from '../../../common/styles/theme'

const SessionListItemContainer = ({
  session,
  formattedDate,
  selectedSessionsExtracted,
  i,
}) => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <StyledSessionListItemContainer key={session.id}>
      <HeadlineWrapper onClick={toggleHandler}>
        <FormHeadline number={prependNumber(i + 1)}>
          {formattedDate}
        </FormHeadline>
        {isToggled ? (
          <GoTriangleUp className="expand-icon" />
        ) : (
          <GoTriangleDown className="expand-icon" />
        )}
      </HeadlineWrapper>
      {renderSessionExercisesList(selectedSessionsExtracted)}
    </StyledSessionListItemContainer>
  )

  function toggleHandler() {
    setIsToggled(!isToggled)
  }

  function renderSessionExercisesList(array) {
    return array.map(sessionExercise => (
      <SessionExerciseContainer toggled={isToggled} key={sessionExercise.id}>
        {sessionExercise.title}: {sessionExercise.amountDone}
      </SessionExerciseContainer>
    ))
  }
}

const HeadlineWrapper = styled.div`
  display: flex;
  align-items: center;

  .expand-icon {
    transition: all 0.1s ease-in-out;
    font-size: 26px;
    margin-left: 8px;
    color: ${colors.lightgrey};
  }
  &:hover {
    cursor: pointer;

    .expand-icon {
      color: ${colors.black};
      transform: scale(1.2);
    }
  }
`

const StyledSessionListItemContainer = styled.section`
  margin-bottom: 20px;
  display: inline-block;
`

export default SessionListItemContainer
