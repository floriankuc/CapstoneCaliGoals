import React from 'react'
import CategoryList from '../components/pages/path/CategoryList'
import GlobalStyles from '../common/styles/GlobalStyles'
import ExerciseListItem from '../components/pages/path/ExerciseListItem'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 50px 0 0 50px;
`

export default {
  title: 'Lists',
  component: CategoryList,
  ExerciseListItem,
}

export const TileList = () => (
  <Wrapper>
    <GlobalStyles />
    <CategoryList>Categories</CategoryList>
  </Wrapper>
)

const exercise = { title: 'Exercise' }

export const ExerciseItem = () => (
  <Wrapper style={{ width: 500 }}>
    <GlobalStyles />
    <ExerciseListItem exercise={exercise}></ExerciseListItem>
    <ExerciseListItem exercise={exercise}></ExerciseListItem>
    <ExerciseListItem exercise={exercise}></ExerciseListItem>
  </Wrapper>
)
