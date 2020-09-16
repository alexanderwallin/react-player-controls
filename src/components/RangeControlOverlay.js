import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

import { Direction } from '../constants.js'
import { noop } from '../utils.js'

const { oneOfType, shape, func, number, oneOf, object, string } = PropTypes

/**
 * An invisible overlay that acts as a range pointer control
 * within a specified bounds.
 */
class RangeControlOverlay extends Component {
  static propTypes = {
    bounds: oneOfType([
      func,
      shape({
        width: number.isRequired,
        left: number.isRequired,
      }),
      shape({
        height: number.isRequired,
        top: number.isRequired,
      }),
    ]).isRequired,
    onChange: func.isRequired,
    onChangeStart: func,
    onChangeEnd: func,
    onIntent: func,
    onIntentStart: func,
    onIntentEnd: func,
    direction: oneOf([Direction.HORIZONTAL, Direction.VERTICAL]),
    className: string,
    style: object,
  }

  static defaultProps = {
    onChangeStart: noop,
    onChangeEnd: noop,
    onIntent: noop,
    onIntentStart: noop,
    onIntentEnd: noop,
    direction: Direction.HORIZONTAL,
    className: null,
    style: {},
  }

  constructor (props) {
    super(props)

    this.state = {
      isDragging: false,
    }
  }

  componentWillUnmount () {
    this.endDrag()
  }

  @autobind
  startDrag (evt) {
    this.setState({ isDragging: true })
    window.addEventListener('pointermove', this.triggerRangeChange)
    window.addEventListener('pointerup', this.endDrag)

    this.toggleSelection('none')

    const startValue = evt
      ? this.getValueFromPointerEvent(evt)
      : null
    this.props.onChangeStart(startValue)
  }

  @autobind
  endDrag (evt) {
    if (evt) {
      this.triggerRangeChange(evt)
    }

    this.setState({ isDragging: false })
    window.removeEventListener('pointermove', this.triggerRangeChange)
    window.removeEventListener('pointerup', this.endDrag)

    this.toggleSelection('')

    const endValue = evt
      ? this.getValueFromPointerEvent(evt)
      : null
    this.props.onChangeEnd(endValue)
  }

  toggleSelection (value) {
    let body = document.getElementsByTagName('body')[0]
    body.style['user-select'] = value
    body.style['-webkit-user-select'] = value
    body.style['-moz-user-select'] = value
    body.style['-ms-user-select'] = value
  }

  getValueFromPointerEvent (pointerEvent) {
    return this.props.direction === Direction.VERTICAL
      ? this.getVerticalValue(pointerEvent.pageY)
      : this.getHorizontalValue(pointerEvent.pageX)
  }

  @autobind
  triggerRangeChange (pointerEvent) {
    this.props.onChange(this.getValueFromPointerEvent(pointerEvent))
  }

  @autobind
  handleIntentStart (evt) {
    const { direction, onIntentStart } = this.props

    if (!this.state.isDragging) {
      const value = direction === Direction.VERTICAL
        ? this.getVerticalValue(evt.pageY)
        : this.getHorizontalValue(evt.pageX)

      onIntentStart(value)
    }
  }

  @autobind
  handleIntentMove (evt) {
    const { direction, onIntent } = this.props

    if (!this.state.isDragging) {
      const value = direction === Direction.VERTICAL
        ? this.getVerticalValue(evt.pageY)
        : this.getHorizontalValue(evt.pageX)

      onIntent(value)
    }
  }

  @autobind
  handleIntentEnd (evt) {
    const { onIntentEnd } = this.props

    if (!this.state.isDragging) {
      onIntentEnd()
    }
  }

  getRectFromBounds () {
    const { bounds } = this.props

    return typeof bounds === 'function'
      ? bounds()
      : bounds
  }

  getHorizontalValue (pointerX) {
    const rect = this.getRectFromBounds()
    const scrollX = (window.pageXOffset !== undefined)
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollLeft
    let dLeft = pointerX - (rect.left + scrollX)
    dLeft = Math.max(dLeft, 0)
    dLeft = Math.min(dLeft, rect.width)

    return dLeft / rect.width
  }

  getVerticalValue (pointerY) {
    const rect = this.getRectFromBounds()
    const scrollY = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop
    let dTop = pointerY - (rect.top + scrollY)
    dTop = Math.max(dTop, 0)
    dTop = Math.min(dTop, rect.height)

    return 1 - (dTop / rect.height)
  }

  render () {
    const { className, style } = this.props

    return (
      <div
        className={className}
        style={style}
        onPointerDown={this.startDrag}
        onPointerEnter={this.handleIntentStart}
        onPointerMove={this.handleIntentMove}
        onPointerLeave={this.handleIntentEnd}
      />
    )
  }
}

export default RangeControlOverlay
