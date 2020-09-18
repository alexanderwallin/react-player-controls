import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

import { Direction } from '../constants.js'
import { noop } from '../utils.js'

const { oneOfType, shape, func, number, oneOf, object, string } = PropTypes

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

    this.$el = null
    this.touchStartPosition = null
    this.lastTouch = null

    this.state = {
      isDragging: false,
    }
  }

  componentWillUnmount () {
    this.endDrag()
    this.handleTouchEnd()
  }

  @autobind
  storeRef ($el) {
    this.$el = $el
    this.$el.addEventListener('touchstart', this.handleTouchStart, { passive: false })
  }

  @autobind
  handleTouchStart (evt) {
    if (evt.touches.length > 1) {
      return false
    }

    this.touchStartPosition = evt.touches[0]
    this.lastTouch = evt.touches[0]

    window.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    window.addEventListener('touchend', this.handleTouchEnd)
  }

  @autobind
  handleTouchMove (evt) {
    const { direction, onChange, onChangeStart } = this.props
    const { isDragging } = this.state

    if (evt.touches.length > 1) {
      return false
    }

    const touch = evt.touches[0]
    const value = this.getValueFromInteractionPoint(touch)

    // If this is a potential start of a drag, make sure
    // it's not intended as a scroll
    if (isDragging === false) {
      const dX = touch.pageX - this.touchStartPosition.pageX
      const dY = touch.pageY - this.touchStartPosition.pageY

      const isScrolling =
        (direction === Direction.HORIZONTAL && Math.abs(dX) < Math.abs(dY)) ||
        (direction === Direction.VERTICAL && Math.abs(dY) < Math.abs(dX))

      if (isScrolling === true) {
        return false
      }

      this.setState({ isDragging: true })
      onChangeStart(value)
    }

    // Prevent scrolling
    this.$el.addEventListener('wheel', this.disableScroll)

    if (typeof evt.preventDefault === 'function') {
      evt.preventDefault()
    }
    if (typeof evt.stopPropagation === 'function') {
      evt.stopPropagation()
    }

    this.toggleSelection('none')

    onChange(value)

    this.lastTouch = touch
  }

  @autobind
  handleTouchEnd (evt) {
    const { onChangeEnd } = this.props

    if (evt !== undefined && evt.touches.length > 1) {
      return false
    }

    const endValue = this.getValueFromInteractionPoint(this.lastTouch)
    onChangeEnd(endValue)

    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchend', this.handleTouchEnd)
    this.$el.removeEventListener('wheel', this.disableScroll)

    this.toggleSelection('')
    this.touchStartPosition = null
    this.lastTouch = null
    this.setState({ isDragging: false })
  }

  @autobind
  disableScroll (evt) {
    console.log('stop scrolling damnit')
    evt.preventDefault()
  }

  @autobind
  startDrag (evt) {
    this.setState({ isDragging: true })
    window.addEventListener('mousemove', this.triggerRangeChange)
    window.addEventListener('mouseup', this.endDrag)

    this.toggleSelection('none')

    const startValue = evt
      ? this.getValueFromInteractionPoint(evt)
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
      ? this.getValueFromInteractionPoint(evt)
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

  getValueFromInteractionPoint (point) {
    return this.props.direction === Direction.VERTICAL
      ? this.getVerticalValue(point.pageY)
      : this.getHorizontalValue(point.pageX)
  }

  @autobind
  triggerRangeChange (mouseEvent) {
    this.props.onChange(this.getValueFromInteractionPoint(mouseEvent))
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

  getHorizontalValue (pageX) {
    const rect = this.getRectFromBounds()
    const scrollX = (window.pageXOffset !== undefined)
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollLeft
    let dLeft = pageX - (rect.left + scrollX)
    dLeft = Math.max(dLeft, 0)
    dLeft = Math.min(dLeft, rect.width)

    return dLeft / rect.width
  }

  getVerticalValue (pageY) {
    const rect = this.getRectFromBounds()
    const scrollY = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop
    let dTop = pageY - (rect.top + scrollY)
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
        ref={this.storeRef}
        onMouseDown={this.startDrag}
        onMouseEnter={this.handleIntentStart}
        onMouseMove={this.handleIntentMove}
        onMouseLeave={this.handleIntentEnd}
      />
    )
  }
}

export default RangeControlOverlay
