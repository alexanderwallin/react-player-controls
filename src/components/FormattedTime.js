import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { number, object, string } = PropTypes

const padZero = digit =>
  `${digit < 10 ? '0' : ''}${digit}`

/**
 * Time formatter that turns seconds into h:mm:ss
 */
class FormattedTime extends Component {
  static propTypes = {
    numSeconds: number,
    className: string,
    style: object,
  }

  static defaultProps = {
    numSeconds: 0,
    className: null,
    style: {},
  }

  getFormattedTime () {
    const { numSeconds } = this.props

    const prefix = numSeconds < 0 ? '-' : ''
    const absNumSeconds = Math.abs(numSeconds)

    const hours = Math.floor(absNumSeconds / 3600)
    const minutes = Math.floor((absNumSeconds % 3600) / 60)
    const seconds = Math.floor(absNumSeconds) % 60

    return hours > 0
      ? `${prefix}${hours}:${padZero(minutes)}:${padZero(seconds)}`
      : `${prefix}${minutes}:${padZero(seconds)}`
  }

  render () {
    const { style, className } = this.props

    return (
      <span className={className} style={style}>
        {this.getFormattedTime()}
      </span>
    )
  }
}

export default FormattedTime
