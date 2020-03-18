import React from 'react'
import { render } from '@testing-library/react'
import Data from './Data'
import '@testing-library/jest-dom'

describe('<Data/>', () => {
  it('should render with its given props', () => {
    render(<Data path={['test']} />)
  })
})
