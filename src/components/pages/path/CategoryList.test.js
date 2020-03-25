import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import CategoryList from './CategoryList'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('<CategoryList/>', () => {
  it('renders with its given props', () => {
    const categoryList = shallow(
      <CategoryList
        pathCategory={'Strength'}
        validationErrors={{}}
        setPathCategory={() => {}}
      />
    )
    expect(categoryList.find('section').length).toEqual(1)
  })

  it('renders the nav with buttons correctly', () => {
    const categoryList = shallow(
      <CategoryList
        pathCategory={'Strength'}
        validationErrors={{}}
        setPathCategory={() => {}}
      />
    )
    expect(categoryList.find('section', { 'data-test': 'nav' }).length).toEqual(
      1
    )
  })
})
