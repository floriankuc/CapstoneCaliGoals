import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import CategoryChart from './CategoryChart'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('<CategoryChart/>', () => {
  it('renders with its given props', () => {
    const chart = shallow(
      <CategoryChart
        categoryData={['data1', 'data2']}
        categoryCount={['2', '3']}
      />
    )
    expect(chart.find('div.chart-test').length).toEqual(1)
  })
})
