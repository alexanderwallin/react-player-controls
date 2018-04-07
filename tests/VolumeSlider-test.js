/* eslint-env mocha */
import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

import { Direction } from '../src/constants.js'
import VolumeSlider from '../src/components/VolumeSlider.js'
import RangeControlOverlay from '../src/components/RangeControlOverlay.js'

describe('<VolumeSlider />', () => {
  const childClasses = {
    intent: 'Intent',
    value: 'Value',
    handle: 'Handle',
  }

  it('renders a value with correct height', () => {
    const slider = shallow(<VolumeSlider volume={0.6} childClasses={childClasses} />)
    const value = slider.find('.Value')

    expect(value.props().style).to.eql({ height: '60%' })
  })

  it('renders an intent with correct height', () => {
    const slider = shallow(<VolumeSlider isEnabled={false} volume={0.45} childClasses={childClasses} />)

    expect(slider.find('.Intent').props().style.height).to.equal('0%')

    // Disabled, so should still be 0%
    slider.setState({ currentIntent: 0.2 })
    expect(slider.find('.Intent').props().style.height).to.equal('0%')

    slider.setProps({ ...slider.props(), isEnabled: true })
    expect(slider.find('.Intent').props().style.height).to.equal('20%')

    slider.setState({ currentIntent: 0.91 })
    expect(slider.find('.Intent').props().style.height).to.equal('91%')
  })

  it('renders with correct sizing when vertical', () => {
    const slider = shallow(
      <VolumeSlider
        direction={Direction.VERTICAL}
        isEnabled={true}
        volume={0.6}
        childClasses={childClasses}
      />
    )

    slider.setState({ currentIntent: 0.2 })

    const value = slider.find('.Value')
    const intent = slider.find('.Intent')
    const handle = slider.find('.Handle')

    expect(value.props().style).to.eql({ height: '60%' })
    expect(intent.props().style).to.eql({ height: '20%' })
    expect(handle.props().style).to.eql({ bottom: '60%' })
  })

  it('renders with correct sizing when horizontal', () => {
    const slider = shallow(
      <VolumeSlider
        direction={Direction.HORIZONTAL}
        isEnabled={true}
        volume={0.6}
        childClasses={childClasses}
      />
    )

    slider.setState({ currentIntent: 0.2 })

    const value = slider.find('.Value')
    const intent = slider.find('.Intent')
    const handle = slider.find('.Handle')

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
    const horizontalSlider = shallow(<VolumeSlider isEnabled={true} direction={Direction.HORIZONTAL} />)
    const verticalSlider = shallow(<VolumeSlider isEnabled={true} direction={Direction.VERTICAL} />)

    expect(horizontalSlider.find(RangeControlOverlay).props().direction).to.eql(Direction.HORIZONTAL)
    expect(verticalSlider.find(RangeControlOverlay).props().direction).to.eql(Direction.VERTICAL)
  })

  it('accepts a custom className', () => {
    const slider = shallow(<VolumeSlider className="MyClassName" />)
    expect(slider.props().className).to.equal('MyClassName')
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

    const slider = shallow(
      <VolumeSlider isEnabled={true} childClasses={childClasses} childrenStyles={childrenStyles} />
    )
    expect(slider.find('.Value').props().style).to.include(style)
    expect(slider.find('.Intent').props().style).to.include(style)
    expect(slider.find('.Handle').props().style).to.include(style)
    expect(slider.find(RangeControlOverlay).props().style).to.include(style)
  })
})
