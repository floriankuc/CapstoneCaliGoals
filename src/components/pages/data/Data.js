import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getSessions } from '../../../services'
import { BrowserRouter } from 'react-router-dom'
import { getDateWithYear } from '../../../utils'
import ExerciseCharts from './ExerciseCharts'
import TransitionWrapper from '../../../common/TransitionWrapper'
import SessionListItemContainer from './SessionListItemContainer'

const Data = ({ path }) => {
  const [id, setId] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    if (path[0]) {
      setId(path[0].id)
      getSessions(setData)
    }
  }, [path, id])

  return (
    <TransitionWrapper>
      <h2>Statistics</h2>
      {data?.length ? (
        <>
          {renderSessions()}
          <ExerciseCharts data={data} />
        </>
      ) : (
        <>
          <p>No training session data to display</p>
          <BrowserRouter>
            <StyledLinkText to="/sessions">Log your session</StyledLinkText>
          </BrowserRouter>
        </>
      )}
    </TransitionWrapper>
  )

  function renderSessions() {
    const sortedSessions = sortSessionsByTime()
    return renderSessionExerciseListContainer(sortedSessions)
  }

  function renderSessionExerciseListContainer(array) {
    return array.map((session, i) => {
      const selectedSessionsExtracted = session.selectedSessions
      const date = new Date(session.time.seconds * 1000)
      const formattedDate = getDateWithYear(date)
      return (
        <SessionListItemContainer
          session={session}
          formattedDate={formattedDate}
          selectedSessionsExtracted={selectedSessionsExtracted}
          i={i}
        />
      )
      // return (
      //   <SessionListItemContainer key={session.id}>
      //     <p>
      //       <NumberSpan>{prependNumber(i + 1)} </NumberSpan>
      //       {formattedDate}
      //     </p>
      //     <SessionExercisesContainer>
      //       {renderSessionExercisesList(selectedSessionsExtracted)}
      //     </SessionExercisesContainer>
      //   </SessionListItemContainer>
      // )
    })
  }

  function sortSessionsByTime() {
    return data.sort((a, b) => a.time.seconds - b.time.seconds)
  }

  function renderSessionExercisesList(array) {
    return array.map(sessionExercise => (
      <p key={sessionExercise.id}>
        {sessionExercise.title}: {sessionExercise.amountDone}
      </p>
    ))
  }
}

// const SessionExercisesContainer = styled.div`
//   background: pink;
// `

// const SessionListItemContainer = styled.section`
//   margin-bottom: 20px;
// `

const StyledLinkText = styled(Link)`
  margin: 20px auto;
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

Data.propTypes = {
  path: PropTypes.array.isRequired,
}

export default Data
