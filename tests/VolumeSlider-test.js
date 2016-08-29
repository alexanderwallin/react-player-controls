import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import VolumeSlider, { ControlDirection } from '../src/components/VolumeSlider.js'
import RangeControlOverlay from '../src/components/RangeControlOverlay.js'

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

  it('should accept custom styles', () => {
    const slider = shallow(<VolumeSlider style={{ fontSize: 100 }} />)
    expect(slider.props().style).to.eql({ fontSize: 100 })
  })

})
