import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

const { number, object, string } = PropTypes

const padZero = digit =>
  `${digit < 10 ? '0' : ''}${digit}`

/**
 * Time formatter that turns seconds into h:mm:ss
 */
class FormattedTime extends Component {

  static propTypes = {
    numSeconds: number,
    style: object,
    className: string,
    extraClasses: string,
  }

  static defaultProps = {
    numSeconds: 0,
    style: {},
    className: 'FormattedTime',
    extraClasses: '',
  }

  getFormattedTime () {
    const { numSeconds } = this.props

    const prefix = numSeconds < 0 ? '-' : ''
    const absNumSeconds = Math.abs(numSeconds)

    const hours = Math.floor(absNumSeconds / 3600)
    const minutes = Math.floor((absNumSeconds % 3600) / 60)
    const seconds = Math.round(absNumSeconds) % 60

    return hours > 0
      ? `${prefix}${hours}:${padZero(minutes)}:${padZero(seconds)}`
      : `${prefix}${minutes}:${padZero(seconds)}`
  }

  render () {
    const { style, className, extraClasses } = this.props

    return (
      <span className={classNames(className, extraClasses)} style={style}>
        {this.getFormattedTime()}
      </span>
    )
  }
}

export default FormattedTime
