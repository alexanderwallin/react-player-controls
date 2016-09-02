import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { withChildrenStyles } from '../utils/composers.js'
import { customComponentProp } from '../propTypes.js'
import PlayButton from './PlayButton.js'
import PauseButton from './PauseButton.js'
import PrevButton from './PrevButton.js'
import NextButton from './NextButton.js'

const { bool, func, object } = PropTypes

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
    style: object,
  }

  static defaultProps = {
    isPlayable: false,
    isPlaying: false,
    hasPrevious: false,
    onPrevious: noop,
    hasNext: false,
    onNext: noop,
    style: {},
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
    const {
      isPlayable, isPlaying, hasPrevious, onPrevious, hasNext, onNext,
      style, childrenStyles,
    } = this.props

    return (
      <div
        className={classNames('PlaybackControls', { isPlayable, isPlaying })}
        style={style}
      >
        <PrevButton isEnabled={hasPrevious} onClick={onPrevious} style={childrenStyles.PrevButton} />

        { isPlaying && isPlayable
          ? <PauseButton onClick={this.handlePause} style={childrenStyles.PauseButton} />
          : <PlayButton isEnabled={isPlayable} onClick={this.handlePlay} style={childrenStyles.PlayButton} />
        }

        <NextButton isEnabled={hasNext} onClick={onNext} style={childrenStyles.NextButton} />
      </div>
    )
  }
}

export default withChildrenStyles(PlaybackControls)
