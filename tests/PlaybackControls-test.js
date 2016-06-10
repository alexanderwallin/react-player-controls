import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import PlaybackControls from '../src/components/PlaybackControls.js'
import PlayButton from '../src/components/PlayButton.js'
import PauseButton from '../src/components/PauseButton.js'

const noop = () => {}

describe('<PlaybackControls />', () => {

  it('should not be playable by default', () => {
    const ctrls = mount(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.props().isPlayable).to.equal(false)
  })

  it('should not be playing by default', () => {
    const ctrls = mount(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.props().isPlaying).to.equal(false)
  })

  it('should render a play button if not playing', () => {
    const ctrls = shallow(<PlaybackControls onPlaybackChange={noop} />)
    expect(ctrls.find(PlayButton)).to.have.length(1)
    expect(ctrls.find(PauseButton)).to.have.length(0)
  })

  it('should render a pause button only if playable and playing', () => {
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

  it('should handle playback state callbacks', () => {
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
})
