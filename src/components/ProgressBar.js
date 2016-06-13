import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import FormattedTime from './FormattedTime.js'
import RangeControlOverlay from './RangeControlOverlay.js'

const { number, bool, func } = PropTypes

/**
 * Seekable progress bar
 *
 * TODO: Make use of the range input element?
 */
class ProgressBar extends Component {

  static propTypes = {
    totalTime: number,
    currentTime: number,
    canSeek: bool,
    onSeek: func,
  }

  static defaultProps = {
    totalTime: Infinity,
    currentTime: 0,
    canSeek: false,
    onSeek: () => {},
  }

  constructor(props) {
    super(props)

    this.progressBarEl = null
  }

  @autobind
  storeRef (rootEl) {
    this.progressBarEl = rootEl
  }

  @autobind
  handleSeek (relativeTime) {
    const { canSeek, onSeek, totalTime } = this.props

    if (canSeek) {
      onSeek(relativeTime * totalTime)
    }
  }

  render () {
    const { totalTime, currentTime, canSeek } = this.props

    const progressPercent = Math.min(100, 100 * currentTime / totalTime)

    return (
      <div className={classNames('ProgressBar', { canSeek })} ref={this.storeRef}>
        <div className="ProgressBar-elapsed" style={{ width: `${progressPercent}%` }} />
        <RangeControlOverlay
          extraClasses="ProgressBar-seek"
          bounds={() => this.progressBarEl.getBoundingClientRect()}
          onValue={this.handleSeek}
        />
      </div>
    )
  }
}

export default ProgressBar
