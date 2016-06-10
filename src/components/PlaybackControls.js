import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { customComponentProp } from '../propTypes.js'
import PlayButton from './PlayButton.js'
import PauseButton from './PauseButton.js'

const { bool, func } = PropTypes

/**
 * Play and pause controls
 */
class PlaybackControls extends Component {
  static propTypes = {
    onPlaybackChange: func.isRequired,
    isPlayable: bool,
    isPlaying: bool,
  }

  static defaultProps = {
    isPlayable: false,
    isPlaying: false,
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
    const { isPlayable, isPlaying } = this.props

    return (
      <div className={classNames('PlaybackControls', { isPlayable, isPlaying })}>
        { isPlaying && isPlayable
          ? <PauseButton onClick={this.handlePause} />
          : <PlayButton isEnabled={isPlayable} onClick={this.handlePlay} />
        }
      </div>
    )
  }
}

export default PlaybackControls
