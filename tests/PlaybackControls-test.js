import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import PlaybackControls from '../src/components/PlaybackControls.js'
import PlayButton from '../src/components/PlayButton.js'
import PauseButton from '../src/components/PauseButton.js'
import PrevButton from '../src/components/PrevButton.js'
import NextButton from '../src/components/NextButton.js'

const noop = () => {}

describe('<PlaybackControls />', () => {

  it('is not playable by default', () => {
    const ctrls = mount(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.props().isPlayable).to.equal(false)
  })

  it('is not playing by default', () => {
    const ctrls = mount(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.props().isPlaying).to.equal(false)
  })

  it('renders a play button if not playing', () => {
    const ctrls = shallow(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.find(PlayButton)).to.have.length(1)
    expect(ctrls.find(PauseButton)).to.have.length(0)
  })

  it('renders a pause button only if playable and playing', () => {
    const ctrls = mount(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.find(PlayButton)).to.have.length(1)
    expect(ctrls.find(PauseButton)).to.have.length(0)

    ctrls.setProps({ onPlaybackChange: noop, isPlayable: false, isPlaying: true })
    expect(ctrls.find(PlayButton)).to.have.length(1)
    expect(ctrls.find(PauseButton)).to.have.length(0)

    ctrls.setProps({ onPlaybackChange: noop, isPlayable: true, isPlaying: true })
    expect(ctrls.find(PlayButton)).to.have.length(0)
    expect(ctrls.find(PauseButton)).to.have.length(1)
  })

  it('handles playback state callbacks', () => {
    const playCallback = spy()
    const pauseCallback = spy()
    const ctrls = mount(<PlaybackControls onPlaybackChange={playCallback} />)

    ctrls.find(PlayButton).simulate('click')
    expect(playCallback.callCount).to.equal(0)

    // Trigger a play action
    ctrls.setProps({ ...ctrls.props(), isPlayable: true })
    ctrls.find(PlayButton).simulate('click')
    expect(playCallback.callCount).to.equal(1)
    expect(playCallback.calledWith(true)).to.equal(true)

    // Trigger a pause action
    ctrls.setProps({ ...ctrls.props(), onPlaybackChange: pauseCallback, isPlaying: true })
    ctrls.find(PauseButton).simulate('click')
    expect(pauseCallback.called).to.equal(true)
    expect(pauseCallback.calledWith(false)).to.equal(true)
  })

  it('renders prev and next buttons', () => {
    const ctrls = shallow(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.find(PrevButton)).to.have.length(1)
    expect(ctrls.find(NextButton)).to.have.length(1)
  })

  it('sets up prev and next buttons with correct states and callbacks', () => {
    const prevCallback = spy()
    const nextCallback = spy()

    const ctrls = shallow(
      <PlaybackControls
        onPlaybackChange={noop}
        hasPrevious={false}
        onPrevious={prevCallback}
        hasNext={false}
        onNext={nextCallback}
      />
    )

    expect(ctrls.find(PrevButton).props().onClick).to.equal(prevCallback)
    expect(ctrls.find(NextButton).props().onClick).to.equal(nextCallback)

    expect(ctrls.find(PrevButton).props().isEnabled).to.equal(false)
    expect(ctrls.find(NextButton).props().isEnabled).to.equal(false)

    ctrls.setProps({ ...ctrls.props(), hasPrevious: true, hasNext: true })
    expect(ctrls.find(PrevButton).props().isEnabled).to.equal(true)
    expect(ctrls.find(NextButton).props().isEnabled).to.equal(true)
  })

  it('should accept custom styles', () => {
    const controls = shallow(<PlaybackControls style={{ fontSize: 100 }} onPlaybackChange={noop} />)
    expect(controls.props().style).to.eql({ fontSize: 100 })
  })
})
