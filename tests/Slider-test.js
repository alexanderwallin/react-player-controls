/* eslint-env mocha */
import React from 'react'
import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

import { Direction } from '../src/constants.js'
import RangeControlOverlay from '../src/components/RangeControlOverlay.js'
import Slider from '../src/components/Slider.js'

chai.use(chaiEnzyme())

describe('<Slider />', () => {
  it('renders a <RangeControlOverlay />', () => {
    const slider = shallow(<Slider />)
    expect(slider.find(RangeControlOverlay).length).to.equal(1)
  })

  it('give <RangeControlOverlay /> a z-index of overlayZIndex', () => {
    const slider = shallow(<Slider overlayZIndex={666} />)
    expect(slider.find(RangeControlOverlay).props().style.zIndex).to.equal(666)
  })

  it('is enabled by default', () => {
    const slider = mount(<Slider />)
    expect(slider.props().isEnabled).to.equal(true)
  })

  it('provides <RangeControlOverlay /> with its bounding rect', () => {
    // Hmm...
  })

  it('provides <RangeControlOverlay /> with its direction prop', () => {
    const slider = shallow(<Slider />)

    slider.setProps({ direction: Direction.HORIZONTAL })
    expect(slider.find(RangeControlOverlay).props().direction).to.equal(Direction.HORIZONTAL)

    slider.setProps({ direction: Direction.VERTICAL })
    expect(slider.find(RangeControlOverlay).props().direction).to.equal(Direction.VERTICAL)
  })

  it('defaults direction to HORIZONTAL', () => {
    const slider = mount(<Slider />)
    expect(slider.props().direction).to.equal(Direction.HORIZONTAL)
  })

  it('invokes onIntent callback when enabled', () => {
    const onIntent = spy()
    const slider = mount(<Slider onIntent={onIntent} />)

    slider.setProps({ isEnabled: false })
    slider.instance().handleIntent(0.5)
    expect(onIntent.callCount).to.equal(0)

    slider.setProps({ isEnabled: true })
    slider.instance().handleIntent(0.5)
    expect(onIntent.callCount).to.equal(1)
  })

  it('invokes change callbacks when enabled', () => {
    const onChange = spy()
    const onChangeStart = spy()
    const onChangeEnd = spy()
    const slider = mount(
      <Slider
        onChange={onChange}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      />
    )
    slider.setProps({ isEnabled: false })
    slider.instance().handleChange(0.5)
    expect(onChange.callCount).to.equal(0)
    slider.instance().handleChangeStart(0.5)
    expect(onChangeStart.callCount).to.equal(0)
    slider.instance().handleChangeEnd(0.5)
    expect(onChangeEnd.callCount).to.equal(0)

    slider.setProps({ isEnabled: true })
    slider.instance().handleChange(0.5)
    expect(onChange.callCount).to.equal(1)
    slider.instance().handleChangeStart(0.5)
    expect(onChangeStart.callCount).to.equal(1)
    slider.instance().handleChangeEnd(0.5)
    expect(onChangeEnd.callCount).to.equal(1)
  })

  it('accepts a className prop', () => {
    const slider = shallow(<Slider className="Slider" />)
    expect(slider.props().className).to.equal('Slider')
  })

  it('accepts custom styles', () => {
    const slider = shallow(<Slider style={{ background: 'eggwhite' }} />)
    expect(slider.props().style.background).to.equal('eggwhite')
  })
})
