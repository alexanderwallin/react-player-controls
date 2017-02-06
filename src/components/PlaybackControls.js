import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { compose, withChildrenStyles, withCustomizableClasses, withChildClasses } from '../utils/composers.js'
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
      className, extraClasses, childClasses, style, childrenStyles,
    } = this.props

    return (
      <div
        className={classNames(className, { isPlayable, isPlaying }, extraClasses)}
        style={style}
      >
        <PrevButton
          isEnabled={hasPrevious}
          onClick={onPrevious}
          className={childClasses.PrevButton}
          style={childrenStyles.PrevButton}
        />

        { isPlaying && isPlayable
          ? <PauseButton
              onClick={this.handlePause}
              className={childClasses.PauseButton}
              style={childrenStyles.PauseButton}
            />
          : <PlayButton
              isEnabled={isPlayable}
              onClick={this.handlePlay}
              className={childClasses.PlayButton}
              style={childrenStyles.PlayButton}
            />
        }

        <NextButton
          isEnabled={hasNext}
          onClick={onNext}
          className={childClasses.NextButton}
          style={childrenStyles.NextButton}
        />
      </div>
    )
  }
}

export default compose(
  withChildrenStyles(),
  withCustomizableClasses('PlaybackControls'),
  withChildClasses()
)(PlaybackControls)
