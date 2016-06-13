import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import FormattedTime from './FormattedTime.js'
import RangeControlOverlay from './RangeControlOverlay.js'

const { number, bool, func, string } = PropTypes

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
    extraClasses: string,
  }

  static defaultProps = {
    totalTime: Infinity,
    currentTime: 0,
    isSeekable: false,
    onSeek: () => {},
    extraClasses: '',
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
    const { totalTime, currentTime, isSeekable, extraClasses } = this.props
    const { currentIntent } = this.state

    const progressPercent = Math.min(100, 100 * currentTime / totalTime)
    const styleLeft = `${progressPercent}%`

    return (
      <div className={classNames('ProgressBar', extraClasses, { isSeekable })} ref={this.storeRef}>
        <div className="ProgressBar-elapsed" style={{ width: styleLeft }} />

        <div className="ProgressBar-intent" style={{ width: `${currentIntent * 100}%` }} />

        <div className="ProgressBar-handle" style={{ left: styleLeft }} />

        {isSeekable && (
          <RangeControlOverlay
            extraClasses="ProgressBar-seek"
            bounds={() => this.progressBarEl.getBoundingClientRect()}
            onValue={this.handleSeek}
            onIntent={this.handleIntent}
          />
        )}
      </div>
    )
  }
}

export default ProgressBar
