import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { withCustomizableClasses } from '../utils/composers.js'

const { oneOfType, shape, func, number, oneOf, object } = PropTypes

// Range control directions
export const ControlDirection = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
}

/**
 * An invisible overlay that acts as a range mouse control
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
    onValue: func.isRequired,
    onChangeStart: func,
    onChangeEnd: func,
    onIntent: func,
    direction: oneOf([ControlDirection.HORIZONTAL, ControlDirection.VERTICAL]),
    style: object,
  }

  static defaultProps = {
    onChangeStart: () => {},
    onChangeEnd: () => {},
    onIntent: () => {},
    direction: ControlDirection.HORIZONTAL,
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
    window.addEventListener('mousemove', this.triggerRangeChange)
    window.addEventListener('mouseup', this.endDrag)

    this.toggleSelection('none')

    const startValue = evt
      ? this.getValueFromMouseEvent(evt)
      : null
    this.props.onChangeStart(startValue)
  }

  @autobind
  endDrag (evt) {
    if (evt) {
      this.triggerRangeChange(evt)
    }

    this.setState({ isDragging: false })
    window.removeEventListener('mousemove', this.triggerRangeChange)
    window.removeEventListener('mouseup', this.endDrag)

    this.toggleSelection('')

    const endValue = evt
      ? this.getValueFromMouseEvent(evt)
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

  getValueFromMouseEvent (mouseEvent) {
    return this.props.direction === ControlDirection.VERTICAL
      ? this.getVerticalValue(mouseEvent.pageY)
      : this.getHorizontalValue(mouseEvent.pageX)
  }

  @autobind
  triggerRangeChange (mouseEvent) {
    this.props.onValue(this.getValueFromMouseEvent(mouseEvent))
  }

  @autobind
  handleIntentMove (evt) {
    if (!this.state.isDragging) {
      this.triggerIntent(evt)
    }
  }

  triggerIntent (mouseEvent) {
    const { direction, onIntent } = this.props

    const value = direction === ControlDirection.VERTICAL
      ? this.getVerticalValue(mouseEvent.pageY)
      : this.getHorizontalValue(mouseEvent.pageX)

    onIntent(value)
  }

  getRectFromBounds () {
    const { bounds } = this.props

    return typeof bounds === 'function'
      ? bounds()
      : bounds
  }

  getHorizontalValue (mouseX) {
    const rect = this.getRectFromBounds()

    let dLeft = mouseX - (rect.left + window.scrollX)
    dLeft = Math.max(dLeft, 0)
    dLeft = Math.min(dLeft, rect.width)

    return dLeft / rect.width
  }

  getVerticalValue (mouseY) {
    const rect = this.getRectFromBounds()

    let dTop = mouseY - (rect.top + window.scrollY)
    dTop = Math.max(dTop, 0)
    dTop = Math.min(dTop, rect.height)

    return 1 - (dTop / rect.height)
  }

  render () {
    const { className, extraClasses, style } = this.props
    const { isDragging } = this.state

    return (
      <div
        className={classNames(className, extraClasses, { isDragging })}
        style={style}
        onMouseDown={this.startDrag}
        onMouseMove={this.handleIntentMove}
      />
    )
  }
}

export default withCustomizableClasses('RangeControlOverlay')(RangeControlOverlay)
