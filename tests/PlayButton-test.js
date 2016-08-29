import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import PlayButton from '../src/components/PlayButton.js'

const noop = () => {}

describe('<PlayButton />', () => {

  it('should be disabled by default', () => {
    const btn = mount(<PlayButton onClick={noop} />)
    expect(btn.props().isEnabled).to.equal(false)
  })

  it('should accept extra classes', () => {
    const classes = 'TestClass'

    let btn = mount(<PlayButton onClick={noop} extraClasses={classes} />)
    expect(btn.props().extraClasses).to.equal(classes)

    btn = shallow(<PlayButton onClick={noop} extraClasses={classes} />)
    expect(btn.props().className).to.contain(classes)
  })

  it('should accept custom styles', () => {
    const btn = shallow(<PlayButton style={{ fontSize: 100 }} onClick={noop} />)
    expect(btn.props().style).to.eql({ fontSize: 100 })
  })

  it('renders an icon per default', () => {
    const btn = mount(<PlayButton onClick={noop} />)
    expect(btn.find('.Icon')).to.have.length(1)
  })

  it('should trigger an onClick callback when enabled', () => {
    const callback = spy()
    const btn = mount(<PlayButton onClick={callback} />)

    btn.simulate('click')
    expect(callback.called).to.equal(false)

    btn.setProps({ onClick: callback, isEnabled: true })
    btn.simulate('click')
    expect(callback.called).to.equal(true)
  })

})
