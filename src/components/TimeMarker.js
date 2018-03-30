import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { values } from '../utils/collections.js'
import FormattedTime from './FormattedTime.js'

const { number, oneOf, string, object } = PropTypes

/**
 * Time marker types
 */
export const TimeMarkerType = {
  ELAPSED: 'ELAPSED',
  REMAINING: 'REMAINING',
  REMAINING_NEGATIVE: 'REMAINING_NEGATIVE',
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
    className: string,
    style: object,
    childClasses: object,
    childrenStyles: object,
  }

  static defaultProps = {
    totalTime: Infinity,
    currentTime: 0,
    firstMarkerType: TimeMarkerType.ELAPSED,
    secondMarkerType: TimeMarkerType.DURATION,
    markerSeparator: null,
    className: 'TimeMarker',
    style: {},
    childClasses: {},
    childrenStyles: {},
  }

  getSecondsForTimeWithMarkerType (markerType) {
    const { currentTime, totalTime } = this.props

    if (markerType === TimeMarkerType.DURATION) {
      return totalTime
    }
    else if (markerType === TimeMarkerType.ELAPSED) {
      return currentTime
    }
    else if (markerType === TimeMarkerType.REMAINING) {
      return totalTime - currentTime
    }
    else if (markerType === TimeMarkerType.REMAINING_NEGATIVE) {
      return currentTime - totalTime
    }

    return 0
  }

  render () {
    const {
      firstMarkerType, secondMarkerType, markerSeparator,
      className, childClasses, style, childrenStyles,
    } = this.props

    const seconds1 = this.getSecondsForTimeWithMarkerType(firstMarkerType)
    const seconds2 = this.getSecondsForTimeWithMarkerType(secondMarkerType)

    return (
      <div
        className={className}
        style={style}
      >
        <FormattedTime
          numSeconds={seconds1}
          className={classNames('TimeMarker-firstMarker', childClasses.firstMarker)}
          style={childrenStyles.firstMarker}
        />

        {markerSeparator && (
          <span
            className={classNames('TimeMarker-separator', childClasses.separator)}
            style={childrenStyles.separator}
          >
            {markerSeparator}
          </span>
        )}

        <FormattedTime
          numSeconds={seconds2}
          className={classNames('TimeMarker-secondMarker', childClasses.secondMarker)}
          style={childrenStyles.secondMarker}
        />
      </div>
    )
  }
}

export default TimeMarker
