/* eslint-env mocha */
import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import ProgressBar from '../src/components/ProgressBar.js'
import RangeControlOverlay from '../src/components/RangeControlOverlay.js'

describe('<ProgressBar />', () => {
  it('should not be seekable by default', () => {
    const bar = mount(<ProgressBar />)
    expect(bar.props().isSeekable).to.equal(false)
  })

  it('triggers seek callback when seekable', () => {
    const callback = spy()
    const bar = mount(<ProgressBar onSeek={callback}/>)

    expect(bar.find('RangeControlOverlay')).to.have.length(0)

    bar.setProps({ isSeekable: true })
    bar.find('RangeControlOverlay').props().onChange()
    expect(callback.called).to.equal(true)
  })

  it('triggers onSeekStart when seekable', () => {
    const onSeekStart = spy()
    const bar = mount(<ProgressBar isSeekable onSeekStart={onSeekStart} />)

    bar.find('RangeControlOverlay').props().onChangeStart()
    expect(onSeekStart.called).to.equal(true)
  })

  it('triggers onSeekEnd when seekable', () => {
    const onSeekEnd = spy()
    const bar = mount(<ProgressBar isSeekable onSeekEnd={onSeekEnd} />)

    bar.find('RangeControlOverlay').props().onChangeEnd()
    expect(onSeekEnd.called).to.equal(true)
  })

  it('sets correct elapsed width', () => {
    const props = {
      childClasses: {
        elapsed: 'Elapsed',
      },
    }
    const bar1 = mount(<ProgressBar {...props} />)
    expect(bar1.find('.Elapsed').props().style.width).to.equal('0%')

    const bar2 = mount(<ProgressBar {...props} totalTime={10} currentTime={1} />)
    expect(bar2.find('.Elapsed').props().style.width).to.equal('10%')

    const bar3 = mount(<ProgressBar {...props} totalTime={10} currentTime={20} />)
    expect(bar3.find('.Elapsed').props().style.width).to.equal('100%')
  })

  it('passes a time from seek click', () => {
    const callback = spy()
    const bar = mount(<ProgressBar totalTime={10} isSeekable={true} onSeek={callback} />)

    bar.find('RangeControlOverlay').props().onChange(0.5)
    expect(callback.called).to.equal(true)
    expect(callback.args[0][0]).to.equal(5)
  })

  it('accepts a custom class name', () => {
    const bar = shallow(<ProgressBar className="MyClassName" />)
    expect(bar.props().className).to.include('MyClassName')
  })

  it('accepts custom child component classes', () => {
    const childClasses = {
      elapsed: 'MyElapsed',
      intent: 'MyIntent',
      handle: 'MyHandle',
      seek: 'MySeek',
    }

    const bar = mount(<ProgressBar childClasses={childClasses} isSeekable />)
    expect(bar.find('.MyElapsed')).to.have.length(1)
    expect(bar.find('.MyIntent')).to.have.length(1)
    expect(bar.find('.MyHandle')).to.have.length(1)
    expect(bar.find('.MySeek')).to.have.length(1)
  })

  it('should accept custom styles', () => {
    const bar = shallow(<ProgressBar style={{ fontSize: 100 }} />)
    expect(bar.props().style).to.eql({ fontSize: 100 })
  })

  it('should accept custom styles', () => {
    const style = { fontSize: 100 }
    const childrenStyles = {
      elapsed: { ...style },
      intent: { ...style },
      handle: { ...style },
      RangeControlOverlay: { ...style },
    }

    const bar = shallow(
      <ProgressBar
        isSeekable={true}
        childClasses={{
          elapsed: 'Elapsed',
          intent: 'Intent',
          handle: 'Handle',
        }}
        childrenStyles={childrenStyles}
      />
    )
    expect(bar.find('.Elapsed').props().style).to.include(style)
    expect(bar.find('.Intent').props().style).to.include(style)
    expect(bar.find('.Handle').props().style).to.include(style)
    expect(bar.find(RangeControlOverlay).props().style).to.include(style)
  })

  it('triggers intent callback when seekable', () => {
    const callback = spy()
    const bar = mount(<ProgressBar onIntent={callback}/>)

    expect(bar.find('RangeControlOverlay')).to.have.length(0)

    bar.setProps({ isSeekable: true })
    bar.find('RangeControlOverlay').props().onIntent()
    expect(callback.called).to.equal(true)
  })
})
