/* eslint-env mocha */
import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

import VolumeSlider from '../src/components/VolumeSlider.js'
import RangeControlOverlay, { ControlDirection } from '../src/components/RangeControlOverlay.js'

describe('<VolumeSlider />', () => {
  it('renders a value with correct height', () => {
    const slider = shallow(<VolumeSlider volume={0.6} />)
    const value = slider.find('.VolumeSlider-value')

    expect(value.props().style).to.eql({ height: '60%' })
  })

  it('renders an intent with correct height', () => {
    const slider = shallow(<VolumeSlider isEnabled={false} volume={0.45} />)

    expect(slider.find('.VolumeSlider-intent').props().style.height).to.equal('0%')

    // Disabled, so should still be 0%
    slider.setState({ currentIntent: 0.2 })
    expect(slider.find('.VolumeSlider-intent').props().style.height).to.equal('0%')

    slider.setProps({ ...slider.props(), isEnabled: true })
    expect(slider.find('.VolumeSlider-intent').props().style.height).to.equal('20%')

    slider.setState({ currentIntent: 0.91 })
    expect(slider.find('.VolumeSlider-intent').props().style.height).to.equal('91%')
  })

  it('renders with correct sizing when vertical', () => {
    const slider = shallow(<VolumeSlider direction={ControlDirection.VERTICAL} isEnabled={true} volume={0.6} />)

    slider.setState({ currentIntent: 0.2 })

    const value = slider.find('.VolumeSlider-value')
    const intent = slider.find('.VolumeSlider-intent')
    const handle = slider.find('.VolumeSlider-handle')

    expect(value.props().style).to.eql({ height: '60%' })
    expect(intent.props().style).to.eql({ height: '20%' })
    expect(handle.props().style).to.eql({ bottom: '60%' })
  })

  it('renders with correct sizing when horizontal', () => {
    const slider = shallow(<VolumeSlider direction={ControlDirection.HORIZONTAL} isEnabled={true} volume={0.6} />)

    slider.setState({ currentIntent: 0.2 })

    const value = slider.find('.VolumeSlider-value')
    const intent = slider.find('.VolumeSlider-intent')
    const handle = slider.find('.VolumeSlider-handle')

    expect(value.props().style).to.eql({ width: '60%' })
    expect(intent.props().style).to.eql({ width: '20%' })
    expect(handle.props().style).to.eql({ left: '60%' })
  })

  it('renders a <RangeControlOverlay /> only when enabled', () => {
    const slider = shallow(<VolumeSlider isEnabled={false} />)
    expect(slider.find(RangeControlOverlay).length).to.equal(0)

    slider.setProps({ isEnabled: true })
    expect(slider.find(RangeControlOverlay).length).to.equal(1)
  })

  it('provides <RangeControlOverlay /> with a valid bounds', () => {
    const slider = mount(<VolumeSlider isEnabled />)
    const bounds = slider.instance().getBounds()

    expect(bounds).to.be.ok
    expect(bounds).to.have.all.keys(['bottom', 'height', 'left', 'right', 'top', 'width'])
  })

  it('provides <RangeControlOverlay /> with a valid direction', () => {
    const horizontalSlider = shallow(<VolumeSlider isEnabled={true} direction={ControlDirection.HORIZONTAL} />)
    const verticalSlider = shallow(<VolumeSlider isEnabled={true} direction={ControlDirection.VERTICAL} />)

    expect(horizontalSlider.find(RangeControlOverlay).props().direction).to.eql(ControlDirection.HORIZONTAL)
    expect(verticalSlider.find(RangeControlOverlay).props().direction).to.eql(ControlDirection.VERTICAL)
  })

  it('accepts a custom className', () => {
    const slider = shallow(<VolumeSlider className="MyClassName" />)
    expect(slider.props().className).to.include('MyClassName')
  })

  it('should have a default className', () => {
    const slider = shallow(<VolumeSlider />)
    expect(slider.props().className).to.contain('VolumeSlider')
  })

  it('accepts custom child component classes', () => {
    const childClasses = {
      value: 'MyValue',
      intent: 'MyIntent',
      handle: 'MyHandle',
      seek: 'MySeek',
    }

    const slider = mount(<VolumeSlider childClasses={childClasses} isEnabled />)
    expect(slider.find('.MyValue')).to.have.length(1)
    expect(slider.find('.MyIntent')).to.have.length(1)
    expect(slider.find('.MyHandle')).to.have.length(1)
    expect(slider.find('.MySeek')).to.have.length(1)
  })

  it('should accept custom styles', () => {
    const slider = shallow(<VolumeSlider style={{ fontSize: 100 }} />)
    expect(slider.props().style).to.eql({ fontSize: 100 })
  })

  it('should accept custom children styles', () => {
    const style = { fontSize: 100 }
    const childrenStyles = {
      value: { ...style },
      intent: { ...style },
      handle: { ...style },
      RangeControlOverlay: { ...style },
    }

    const slider = shallow(<VolumeSlider isEnabled={true} childrenStyles={childrenStyles} />)
    expect(slider.find('.VolumeSlider-value').props().style).to.include(style)
    expect(slider.find('.VolumeSlider-intent').props().style).to.include(style)
    expect(slider.find('.VolumeSlider-handle').props().style).to.include(style)
    expect(slider.find(RangeControlOverlay).props().style).to.include(style)
  })
})
