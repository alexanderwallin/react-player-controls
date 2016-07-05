import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'
import TestUtils from 'react-addons-test-utils'

chai.use(chaiEnzyme())

import RangeControlOverlay, { ControlDirection } from '../src/components/RangeControlOverlay.js'

const noop = () => {}

describe('<RangeControlOverlay />', () => {

  describe('horizontal controls', () => {
    let overlay = null
    let onValue = null
    let instance = null

    beforeEach(() => {
      onValue = spy()
      overlay = shallow(
        <RangeControlOverlay
          bounds={{ left: 100, width: 100 }}
          onValue={onValue}
          direction={ControlDirection.HORIZONTAL}
        />
      )
      instance = overlay.instance()
    })

    it('calculates the correct value', () => {
      instance.triggerRangeChange({ pageX: 150 })
      expect(onValue.callCount).to.equal(1)
      expect(onValue.args[0][0]).to.equal(0.5)
    })

    it('does not get affected by the mouse y position', () => {
      instance.triggerRangeChange({ pageX: 175, pageY: 20 })
      instance.triggerRangeChange({ pageX: 175, pageY: 189 })

      expect(onValue.callCount).to.equal(2)
      expect(onValue.args[0][0]).to.equal(onValue.args[1][0])
    })

    it('keeps within the range [0, 1]', () => {
      instance.triggerRangeChange({ pageX: 50 })
      expect(onValue.args[0][0]).to.equal(0)

      instance.triggerRangeChange({ pageX: 150 })
      expect(onValue.args[1][0]).to.equal(0.5)

      instance.triggerRangeChange({ pageX: 250 })
      expect(onValue.args[2][0]).to.equal(1)
    })
  })

  describe('vertical controls', () => {
    let overlay = null
    let onValue = null
    let instance = null

    beforeEach(() => {
      onValue = spy()
      overlay = shallow(
        <RangeControlOverlay
          bounds={{ top: 100, height: 100 }}
          onValue={onValue}
          direction={ControlDirection.VERTICAL}
        />
      )
      instance = overlay.instance()
    })

    it('calculates the correct value', () => {
      instance.triggerRangeChange({ pageY: 150 })
      expect(onValue.callCount).to.equal(1)
      expect(onValue.args[0][0]).to.equal(0.5)
    })

    it('does not get affected by the mouse x position', () => {
      instance.triggerRangeChange({ pageX: 30, pageY: 175 })
      instance.triggerRangeChange({ pageX: 999, pageY: 175 })

      expect(onValue.callCount).to.equal(2)
      expect(onValue.args[0][0]).to.equal(onValue.args[1][0])
    })

    it('keeps within the range [0, 1]', () => {
      instance.triggerRangeChange({ pageY: 50 })
      expect(onValue.args[0][0]).to.equal(1)

      instance.triggerRangeChange({ pageY: 150 })
      expect(onValue.args[1][0]).to.equal(0.5)

      instance.triggerRangeChange({ pageY: 250 })
      expect(onValue.args[2][0]).to.equal(0)
    })
  })

})
