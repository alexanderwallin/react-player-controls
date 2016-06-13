import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import ProgressBar from '../src/components/ProgressBar.js'

const noop = () => {}

describe('<ProgressBar />', () => {

  it('should not be seekable by default', () => {
    const bar = mount(<ProgressBar />)
    expect(bar.props().canSeek).to.equal(false)
  })

  it('triggers seek callback when seekable', () => {
    const callback = spy()
    const bar = mount(<ProgressBar onSeek={callback} />)

    bar.find('.ProgressBar-seek').simulate('click')
    expect(callback.called).to.equal(false)

    bar.setProps({ canSeek: callback, canSeek: true })
    bar.find('.ProgressBar-seek').simulate('click')
    expect(callback.called).to.equal(true)
  })

  it('sets correct elapsed width', () => {
    const bar1 = mount(<ProgressBar />)
    expect(bar1.find('.ProgressBar-elapsed').props().style.width).to.equal('0%')

    const bar2 = mount(<ProgressBar totalTime={10} currentTime={1} />)
    expect(bar2.find('.ProgressBar-elapsed').props().style.width).to.equal('10%')

    const bar3 = mount(<ProgressBar totalTime={10} currentTime={20} />)
    expect(bar3.find('.ProgressBar-elapsed').props().style.width).to.equal('100%')
  })

  it('passes a time from seek click', () => {
    const callback = spy()
    const bar = mount(<ProgressBar totalTime={10} canSeek={true} onSeek={callback} />)

    bar.find('.ProgressBar-seek').simulate('click')
    expect(callback.called).to.equal(true)
    expect(callback.args[0][0]).to.be.within(0, 10)

    // here: click seek bar at 20% in and expect the seek callback to pass 2
    /*const clickEvt = {
      clientX: 143,
      clientY: 200,
    }
    bar.find('.ProgressBar-seek').simulate('click', clickEvt)
    expect(callback.args[0]).to.equal([2])*/
  })

})
