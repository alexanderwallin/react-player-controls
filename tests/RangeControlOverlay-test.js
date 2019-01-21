/* eslint-env mocha */
import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

import { Direction } from '../src/constants.js'
import RangeControlOverlay from '../src/components/RangeControlOverlay.js'

chai.use(chaiEnzyme())

const noop = () => {}

describe('<RangeControlOverlay />', () => {
  describe('horizontal controls', () => {
    let overlay = null
    let onChange = null
    let instance = null

    beforeEach(() => {
      onChange = spy()
      overlay = shallow(
        <RangeControlOverlay
          bounds={{ left: 100, width: 100 }}
          onChange={onChange}
          direction={Direction.HORIZONTAL}
        />
      )
      instance = overlay.instance()
    })

    it('calculates the correct value', () => {
      instance.triggerRangeChange({ pageX: 150 })
      expect(onChange.callCount).to.equal(1)
      expect(onChange.args[0][0]).to.equal(0.5)
    })

    it('does not get affected by the mouse y position', () => {
      instance.triggerRangeChange({ pageX: 175, pageY: 20 })
      instance.triggerRangeChange({ pageX: 175, pageY: 189 })

      expect(onChange.callCount).to.equal(2)
      expect(onChange.args[0][0]).to.equal(onChange.args[1][0])
    })

    it('keeps within the range [0, 1]', () => {
      instance.triggerRangeChange({ pageX: 50 })
      expect(onChange.args[0][0]).to.equal(0)

      instance.triggerRangeChange({ pageX: 150 })
      expect(onChange.args[1][0]).to.equal(0.5)

      instance.triggerRangeChange({ pageX: 250 })
      expect(onChange.args[2][0]).to.equal(1)
    })
  })

  describe('vertical controls', () => {
    let overlay = null
    let onChange = null
    let instance = null

    beforeEach(() => {
      onChange = spy()
      overlay = shallow(
        <RangeControlOverlay
          bounds={{ top: 100, height: 100 }}
          onChange={onChange}
          direction={Direction.VERTICAL}
        />
      )
      instance = overlay.instance()
    })

    it('calculates the correct value', () => {
      instance.triggerRangeChange({ pageY: 150 })
      expect(onChange.callCount).to.equal(1)
      expect(onChange.args[0][0]).to.equal(0.5)
    })

    it('does not get affected by the mouse x position', () => {
      instance.triggerRangeChange({ pageX: 30, pageY: 175 })
      instance.triggerRangeChange({ pageX: 999, pageY: 175 })

      expect(onChange.callCount).to.equal(2)
      expect(onChange.args[0][0]).to.equal(onChange.args[1][0])
    })

    it('keeps within the range [0, 1]', () => {
      instance.triggerRangeChange({ pageY: 50 })
      expect(onChange.args[0][0]).to.equal(1)

      instance.triggerRangeChange({ pageY: 150 })
      expect(onChange.args[1][0]).to.equal(0.5)

      instance.triggerRangeChange({ pageY: 250 })
      expect(onChange.args[2][0]).to.equal(0)
    })
  })
})

describe('intent', () => {
  let overlay = null
  let onIntent = null
  let onIntentStart = null
  let onIntentEnd = null

  beforeEach(() => {
    onIntent = spy()
    onIntentStart = spy()
    onIntentEnd = spy()

    overlay = shallow(
      <RangeControlOverlay
        bounds={{ left: 100, width: 100 }}
        direction={Direction.HORIZONTAL}
        onChange={noop}
        onIntent={onIntent}
        onIntentStart={onIntentStart}
        onIntentEnd={onIntentEnd}
      />
    )
  })

  it('invokes onIntent on mouseover when not dragging', () => {
    overlay.instance().startDrag({ pageX: 140 })
    overlay.find('div').simulate('mousemove', { pageX: 120 })
    expect(onIntent.callCount).to.equal(0)

    overlay.instance().endDrag({ pageX: 150 })
    overlay.find('div').simulate('mousemove', { pageX: 120 })
    expect(onIntent.args[0][0]).to.equal(0.2)
  })

  it('invokes onIntentStart on mouseenter when not dragging', () => {
    overlay.instance().startDrag({ pageX: 140 })
    overlay.find('div').simulate('mouseenter', { pageX: 120 })
    expect(onIntentStart.callCount).to.equal(0)

    overlay.instance().endDrag({ pageX: 150 })
    overlay.find('div').simulate('mouseenter', { pageX: 120 })
    expect(onIntentStart.args[0][0]).to.equal(0.2)
  })

  it('invokes onIntentEnd on mouseleave when not dragging', () => {
    overlay.instance().startDrag({ pageX: 140 })
    overlay.find('div').simulate('mouseleave')
    expect(onIntentEnd.callCount).to.equal(0)

    overlay.instance().endDrag({ pageX: 150 })
    overlay.find('div').simulate('mouseleave')
    expect(onIntentEnd.callCount).to.equal(1)
  })
})

describe('all controls', () => {
  it('it invokes onChangeStart and onChangeEnd prop functions', () => {
    const onChangeStart = spy()
    const onChangeEnd = spy()
    const overlay = shallow(
      <RangeControlOverlay
        bounds={{ left: 100, width: 100 }}
        direction={Direction.HORIZONTAL}
        onChange={noop}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      />
    )
    const instance = overlay.instance()

    instance.startDrag({ pageX: 110 })
    expect(onChangeStart.callCount).to.equal(1)
    expect(onChangeStart.args[0][0]).to.equal(0.1)

    instance.endDrag({ pageX: 120 })
    expect(onChangeEnd.callCount).to.equal(1)
    expect(onChangeEnd.args[0][0]).to.equal(0.2)
  })

  it('accepts a custom className', () => {
    const overlay = shallow(<RangeControlOverlay className="MyClassName" bounds={noop} onChange={noop} />)
    expect(overlay.props().className).to.include('MyClassName')
  })

  it('should accept custom styles', () => {
    const overlay = shallow(<RangeControlOverlay style={{ fontSize: 100 }} bounds={noop} onChange={noop} />)
    expect(overlay.props().style).to.eql({ fontSize: 100 })
  })
})
