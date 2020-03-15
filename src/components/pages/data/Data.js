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
import { mixins } from '../../../common/styles/theme'

Data.propTypes = {
  path: PropTypes.array.isRequired,
}

function Data({ path }) {
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
    })
  }

  function sortSessionsByTime() {
    return data.sort((a, b) => a.time.seconds - b.time.seconds)
  }
}

const StyledLinkText = styled(Link)`
  ${mixins.squareButton};
  margin: 0 auto;
`

export default Data
