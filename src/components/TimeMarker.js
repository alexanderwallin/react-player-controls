import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { values } from '../utils/collections.js'
import FormattedTime from './FormattedTime.js'

const { number, oneOf, string } = PropTypes

/**
 * Time marker types
 */
export const TimeMarkerType = {
  ELAPSED: 'ELAPSED',
  LEFT: 'LEFT',
  LEFT_NEGATIVE: 'LEFT_NEGATIVE',
  DURATION: 'DURATION',
}

/**
 * Composite component showing current and total time
 */
class TimeMarker extends Component {

  static propTypes = {
    totalTime: number,
    currentTime: number,
    firstMarkerType: oneOf(values(TimeMarkerType)),
    secondMarkerType: oneOf(values(TimeMarkerType)),
    markerSeparator: string,
  }

  static defaultProps = {
    totalTime: Infinity,
    currentTime: 0,
    firstMarkerType: TimeMarkerType.ELAPSED,
    secondMarkerType: TimeMarkerType.DURATION,
    markerSeparator: null,
  }

  getSecondsForTimeWithMarkerType (markerType) {
    const { currentTime, totalTime } = this.props

    if (markerType === TimeMarkerType.DURATION) {
      return totalTime
    }
    else if (markerType === TimeMarkerType.ELAPSED) {
      return currentTime
    }
    else if (markerType === TimeMarkerType.LEFT) {
      return totalTime - currentTime
    }
    else if (markerType === TimeMarkerType.LEFT_NEGATIVE) {
      return currentTime - totalTime
    }

    return 0
  }

  render () {
    const { totalTime, currentTime, firstMarkerType, secondMarkerType, markerSeparator } = this.props

    const seconds1 = this.getSecondsForTimeWithMarkerType(firstMarkerType)
    const seconds2 = this.getSecondsForTimeWithMarkerType(secondMarkerType)

    return (
      <div
        className={classNames('TimeMarker')}
      >
        <div className="TimeMarker-timeMarker">
          <FormattedTime numSeconds={seconds1} />
          {markerSeparator && (
            <span className="TimeMarker-separator">{markerSeparator}</span>
          )}
          <FormattedTime numSeconds={seconds2} />
        </div>
      </div>
    )
  }
}

export default TimeMarker
