import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import PauseButton from '../src/components/PauseButton.js'

const noop = () => {}

describe('<PauseButton />', () => {

  it('should accept extra classes', () => {
    const classes = 'TestClass'

    let btn = mount(<PauseButton onClick={noop} extraClasses={classes} />)
    expect(btn.props().extraClasses).to.equal(classes)

    btn = shallow(<PauseButton onClick={noop} extraClasses={classes} />)
    expect(btn.props().className).to.contain(classes)
  })

  it('should render an icon', () => {
    const btn = shallow(<PauseButton onClick={noop} />)
    expect(btn.find('.PauseButton-icon')).to.have.length(1)
  })

  it('should trigger an onClick callback when clicked', () => {
    const callback = spy()
    const btn = mount(<PauseButton onClick={callback} />)

    btn.simulate('click')
    expect(callback.called).to.equal(true)
  })

})
