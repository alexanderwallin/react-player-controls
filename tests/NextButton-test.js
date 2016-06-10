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

  it('should render an icon', () => {
    const btn = shallow(<NextButton onClick={noop} />)
    expect(btn.find('.NextButton-icon')).to.have.length(1)
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
