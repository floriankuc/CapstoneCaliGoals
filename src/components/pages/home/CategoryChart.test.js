import React from 'react'
import { render } from '@testing-library/react'
import CategoryChart from './CategoryChart'

describe('<CategoryChart/>', () => {
  it('should render with its given props', () => {
    render(
      <CategoryChart
        categoryData={['data1', 'data2']}
        categoryCount={['2', '3']}
      />
    )
  })
})
