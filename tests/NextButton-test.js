import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import NextButton from '../src/components/NextButton.js'

const noop = () => {}

describe('<NextButton />', () => {

  it('should accept extra classes', () => {
    const classes = 'TestClass'

    let btn = mount(<NextButton onClick={noop} extraClasses={classes} />)
    expect(btn.props().extraClasses).to.equal(classes)

    btn = shallow(<NextButton onClick={noop} extraClasses={classes} />)
    expect(btn.props().className).to.contain(classes)
  })

  it('should have a default class name', () => {
    const btn = shallow(<NextButton onClick={noop} />)
    expect(btn.props().className).to.include('NextButton')
  })

  it('should accept a custom class name', () => {
    const btn = shallow(<NextButton className="MyClassName" onClick={noop} />)
    expect(btn.props().className).to.include('MyClassName')
  })

  it('should accept custom styles', () => {
    const btn = shallow(<NextButton style={{ fontSize: 100 }} onClick={noop} />)
    expect(btn.props().style).to.eql({ fontSize: 100 })
  })

  it('renders an icon per default', () => {
    const btn = mount(<NextButton onClick={noop} />)
    expect(btn.find('.Icon')).to.have.length(1)
  })

  it('should trigger an onClick callback when clicked', () => {
    const callback = spy()
    const btn = mount(<NextButton onClick={callback} />)

    btn.simulate('click')
    expect(callback.called).to.equal(false)

    btn.setProps({ onClick: callback, isEnabled: true })
    btn.simulate('click')
    expect(callback.called).to.equal(true)
  })

})
