/* eslint-env mocha */
import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

import Button from '../src/components/Button.js'

chai.use(chaiEnzyme())

const noop = () => {}

describe('<Button />', () => {
  it('accepts a custom class name', () => {
    const btn = shallow(<Button className="MyClassName" onClick={noop} />)
    expect(btn.props().className).to.include('MyClassName')
  })

  it('accepts custom styles', () => {
    const btn = shallow(<Button style={{ fontSize: 100 }} onClick={noop} />)
    expect(btn.props().style).to.eql({ fontSize: 100 })
  })

  it('renders a <button />', () => {
    const btn = shallow(<Button onClick={noop} />)
    expect(btn.find('button').length).to.equal(1)
  })

  it('maps the isEnabled prop to the HTML button\'s disabled attribute', () => {
    const btnEnabled = shallow(<Button onClick={noop} isEnabled={true} />)
    expect(btnEnabled.find('button').props().disabled).to.equal(false)

    const btnDisabled = shallow(<Button onClick={noop} isEnabled={false} />)
    expect(btnDisabled.find('button').props().disabled).to.equal(true)
  })

  it('renders nothing inside the button by default', () => {
    const btn = shallow(<Button onClick={noop} />)
    expect(btn.find('button').props().children).to.equal(null)
  })

  it('invokes an onClick callback when enabled and clicked', () => {
    const callback = spy()
    const btn = mount(<Button onClick={callback} isEnabled={false} />)

    btn.simulate('click')
    expect(callback.called).to.equal(false)

    btn.setProps({ isEnabled: true })
    btn.simulate('click')
    expect(callback.called).to.equal(true)
  })
})
