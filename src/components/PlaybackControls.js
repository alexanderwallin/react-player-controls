import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { customComponentProp } from '../propTypes.js'
import PlayButton from './PlayButton.js'
import PauseButton from './PauseButton.js'
import PrevButton from './PrevButton.js'
import NextButton from './NextButton.js'

const { bool, func } = PropTypes

const noop = () => {}

/**
 * Play and pause controls
 */
class PlaybackControls extends Component {
  static propTypes = {
    onPlaybackChange: func.isRequired,
    isPlayable: bool,
    isPlaying: bool,
    hasPrevious: bool,
    onPrevious: func,
    hasNext: bool,
    onNext: func,
  }

  static defaultProps = {
    isPlayable: false,
    isPlaying: false,
    hasPrevious: false,
    onPrevious: noop,
    hasNext: false,
    onNext: noop,
  }

  @autobind
  handlePlay () {
    if (this.props.isPlayable) {
      this.props.onPlaybackChange(true)
    }
  }

  @autobind
  handlePause () {
    this.props.onPlaybackChange(false)
  }

  render () {
    const { isPlayable, isPlaying, hasPrevious, onPrevious, hasNext, onNext } = this.props

    return (
      <div className={classNames('PlaybackControls', { isPlayable, isPlaying })}>
        <PrevButton isEnabled={hasPrevious} onClick={onPrevious} />

        { isPlaying && isPlayable
          ? <PauseButton onClick={this.handlePause} />
          : <PlayButton isEnabled={isPlayable} onClick={this.handlePlay} />
        }

        <NextButton isEnabled={hasNext} onClick={onNext} />
      </div>
    )
  }
}

export default PlaybackControls
