import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import styled from 'styled-components'
import FormHeadline from '../../../common/FormHeadline'
import { colors } from '../../../common/styles/theme'
import { prependNumber } from '../../../utils'
import SessionExerciseContainer from './SessionExerciseContainer'

SessionListItemContainer.propTypes = {
  session: PropTypes.object.isRequired,
  formattedDate: PropTypes.string.isRequired,
  selectedSessionsExtracted: PropTypes.array.isRequired,
  i: PropTypes.number.isRequired,
}

function SessionListItemContainer({
  session,
  formattedDate,
  selectedSessionsExtracted,
  i,
}) {
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
  justify-content: space-between;
  background: ${colors.lightestgrey};
  padding: 8px;
  width: 100%;

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
  margin-bottom: 1px;
  display: inline-block;
  width: 100%;
`

export default SessionListItemContainer
