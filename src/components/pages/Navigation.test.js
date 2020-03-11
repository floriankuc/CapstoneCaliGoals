import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Navigation from './Navigation'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('<Navigation/>', () => {
  it('renders with its given props', () => {
    const navigation = shallow(<Navigation path={[]} />)
    expect(navigation.find({ 'data-test': 'nav' }).length).toEqual(1)
  })

  it('renders correct number of navlinks without active path', () => {
    const navigation = shallow(<Navigation path={[]} />)
    const links = navigation.find({ 'data-test': 'link' })
    expect(links.length).toEqual(2)
  })
})
