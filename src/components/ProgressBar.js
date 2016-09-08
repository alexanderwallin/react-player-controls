import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { compose, withChildrenStyles, withCustomizableClasses } from '../utils/composers.js'
import FormattedTime from './FormattedTime.js'
import RangeControlOverlay from './RangeControlOverlay.js'

const { number, bool, func, string, object } = PropTypes

/**
 * Seekable progress bar
 *
 * TODO: Make use of the range input element?
 */
class ProgressBar extends Component {

  static propTypes = {
    totalTime: number,
    currentTime: number,
    isSeekable: bool,
    onSeek: func,
    style: object,
  }

  static defaultProps = {
    totalTime: Infinity,
    currentTime: 0,
    isSeekable: false,
    onSeek: () => {},
    style: {},
  }

  constructor(props) {
    super(props)

    this.progressBarEl = null

    this.state = {
      currentIntent: 0,
    }
  }

  @autobind
  storeRef (rootEl) {
    this.progressBarEl = rootEl
  }

  @autobind
  handleSeek (relativeTime) {
    const { isSeekable, onSeek, totalTime } = this.props

    if (isSeekable) {
      onSeek(relativeTime * totalTime)
    }
  }

  @autobind
  handleIntent (relativeTime) {
    const intent = this.props.isSeekable ? relativeTime : 0

    this.setState({
      ...this.state,
      currentIntent: intent,
    })
  }

  render () {
    const {
      totalTime, currentTime, isSeekable,
      className, extraClasses, style, childrenStyles,
    } = this.props
    const { currentIntent } = this.state

    const progressPercent = Math.min(100, 100 * currentTime / totalTime)
    const styleLeft = `${progressPercent}%`

    const isRewindIntent = currentIntent !== 0 && currentIntent < currentTime / totalTime

    return (
      <div
        className={classNames(className, extraClasses, {
          isSeekable,
          isRewindIntent,
        })}
        style={style}
        ref={this.storeRef}
      >
        <div className="ProgressBar-elapsed" style={{ width: styleLeft, ...(childrenStyles.elapsed || {}) }} />

        <div className="ProgressBar-intent" style={{ width: `${currentIntent * 100}%`, ...(childrenStyles.intent || {}) }} />

        <div className="ProgressBar-handle" style={{ left: styleLeft, ...(childrenStyles.handle || {}) }} />

        {isSeekable && (
          <RangeControlOverlay
            extraClasses="ProgressBar-seek"
            style={childrenStyles.RangeControlOverlay}
            bounds={() => this.progressBarEl.getBoundingClientRect()}
            onValue={this.handleSeek}
            onIntent={this.handleIntent}
          />
        )}
      </div>
    )
  }
}

export default compose(
  withChildrenStyles(),
  withCustomizableClasses('ProgressBar')
)(ProgressBar)
