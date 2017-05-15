import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { values } from '../utils/collections.js'
import { compose, withChildrenStyles, withCustomizableClasses, withChildClasses } from '../utils/composers.js'
import FormattedTime from './FormattedTime.js'

const { number, oneOf, string, object } = PropTypes

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
    style: object,
  }

  static defaultProps = {
    totalTime: Infinity,
    currentTime: 0,
    firstMarkerType: TimeMarkerType.ELAPSED,
    secondMarkerType: TimeMarkerType.DURATION,
    markerSeparator: null,
    style: {},
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
    const {
      firstMarkerType, secondMarkerType, markerSeparator,
      className, extraClasses, childClasses, style, childrenStyles,
    } = this.props

    const seconds1 = this.getSecondsForTimeWithMarkerType(firstMarkerType)
    const seconds2 = this.getSecondsForTimeWithMarkerType(secondMarkerType)

    return (
      <div
        className={classNames(className, extraClasses)}
        style={style}
      >
        <FormattedTime
          numSeconds={seconds1}
          extraClasses={classNames('TimeMarker-firstMarker', childClasses.firstMarker)}
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
          extraClasses={classNames('TimeMarker-secondMarker', childClasses.secondMarker)}
          style={childrenStyles.secondMarker}
        />
      </div>
    )
  }
}

export default compose(
  withChildrenStyles(),
  withCustomizableClasses('TimeMarker'),
  withChildClasses()
)(TimeMarker)
