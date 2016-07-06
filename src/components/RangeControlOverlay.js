import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

const { oneOfType, shape, func, string, number, oneOf } = PropTypes

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
    onIntent: func,
    direction: oneOf([ControlDirection.HORIZONTAL, ControlDirection.VERTICAL]),
    extraClasses: string,
  }

  static defaultProps = {
    onIntent: () => {},
    direction: ControlDirection.HORIZONTAL,
    extraClasses: '',
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
  }

  @autobind
  endDrag (evt) {
    this.triggerRangeChange(evt)

    this.setState({ isDragging: false })
    window.removeEventListener('mousemove', this.triggerRangeChange)
    window.removeEventListener('mouseup', this.endDrag)
  }

  @autobind
  triggerRangeChange (mouseEvent) {
    const { direction, onValue } = this.props

    const newValue = direction === ControlDirection.VERTICAL
      ? this.getVerticalValue(mouseEvent.pageY)
      : this.getHorizontalValue(mouseEvent.pageX)

    onValue(newValue)
  }

  @autobind
  handleIntentMove (evt) {
    if (!this.state.isDragging) {
      this.triggerIntent(evt)
    }
  }

  triggerIntent (mouseEvent) {
    const value = direction === ControlDirection.VERTICAL
      ? this.getVerticalValue(mouseEvent.pageY)
      : this.getHorizontalValue(mouseEvent.pageX)

    this.props.onIntent(value)
  }

  getRectFromBounds() {
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
    const { extraClasses } = this.props
    const { isDragging } = this.state

    return (
      <div
        className={classNames('RangeControlOverlay', extraClasses, { isDragging })}
        onMouseDown={this.startDrag}
        onMouseMove={this.handleIntentMove}
      />
    )
  }
}

export default RangeControlOverlay
