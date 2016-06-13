import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'
import TestUtils from 'react-addons-test-utils'

chai.use(chaiEnzyme())

import RangeControlOverlay from '../src/components/RangeControlOverlay.js'

describe('<RangeControlOverlay />', () => {
  let overlay = null
  let onValue = null

  beforeEach(() => {
    onValue = spy()
    overlay = mount(
      <RangeControlOverlay
        bounds={{ left: 100, width: 100 }}
        onValue={onValue}
      />
    )
  })

  // TODO: Figure out how to trigger changes using mouse events
  // dispatched on window

  /*
  it('resolves object or function as bounds', () => {
    const boundsObj = { left: 123, width: 123 }
    const boundsFn = () => boundsObj

    overlay = mount(<RangeControlOverlay bounds={boundsObj} onValue={onValue} />)
    overlay.simulate('click')
    expect(onValue.callCount).to.equal(1)

    overlay = mount(<RangeControlOverlay bounds={boundsFn} onValue={onValue} />)
    overlay.simulate('click')
    expect(onValue.callCount).to.equal(2)
  })
  */

  /*
  it('triggers onValue callback on click', () => {
    overlay.simulate('click', { pageX: 150 })
    expect(onValue.called).to.equal(true)
    expect(onValue.args[0][0]).to.equal(0.5)
  })
  */

  /*
  it('translates mousemove pos into value', () => {
    console.log('\n\n - - - \n\n')
    overlay.simulate('mouseDown', { pageX: 150 })

    // window.dispatchEvent(new MouseEvent('mousemove', { clientX: 180 }))
    // console.log(TestUtils.Simulate)
    TestUtils.Simulate.mouseMove(window, { clientX: 180, screenX: 180, pageX: 180 })
    // overlay.simulate('mouseMove', { clientX: 180, screenX: 180, pageX: 180 })
    expect(onValue.called).to.equal(true)
  })
  */

  /*
  it('respects bounds', () => {
    overlay.simulate('mouseDown', { pageX: 1000 })
    overlay.simulate('mouseUp', { pageX: 1000 })
    expect(onValue.callCount).to.equal(1)
    expect(onValue.args[0][0]).to.equal(1)

    overlay.simulate('mouseDown', { pageX: 99 })
    overlay.simulate('mouseUp', { pageX: 99 })
    expect(onValue.args[1][0]).to.equal(0)
  })
  */

})
