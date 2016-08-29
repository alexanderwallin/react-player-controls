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
    expect(bar.props().isSeekable).to.equal(false)
  })

  it('triggers seek callback when seekable', () => {
    const callback = spy()
    const bar = mount(<ProgressBar onSeek={callback}/>)

    expect(bar.find('RangeControlOverlay')).to.have.length(0)

    bar.setProps({ isSeekable: callback, isSeekable: true })
    bar.find('RangeControlOverlay').props().onValue()
    expect(callback.called).to.equal(true)
  })

  it('provides a class for rewind intents', () => {
    const bar = shallow(<ProgressBar isSeekable={true} totalTime={10} currentTime={5} />)

    bar.setState({ currentIntent: 0.3 })
    expect(bar.hasClass('ProgressBar')).to.equal(true)

    bar.setState({ currentIntent: 0.8 })
    expect(bar.hasClass('isRewindIntent')).to.equal(false)
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
    const bar = mount(<ProgressBar totalTime={10} isSeekable={true} onSeek={callback} />)

    bar.find('RangeControlOverlay').props().onValue(0.5)
    expect(callback.called).to.equal(true)
    expect(callback.args[0][0]).to.equal(5)
  })

  it('should accept custom styles', () => {
    const bar = shallow(<ProgressBar style={{ fontSize: 100 }} />)
    expect(bar.props().style).to.eql({ fontSize: 100 })
  })

})
