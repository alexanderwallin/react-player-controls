import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

const { oneOfType, shape, func, string, number } = PropTypes

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
    ]).isRequired,
    onValue: func.isRequired,
    onIntent: func,
    extraClasses: string,
  }

  static defaultProps = {
    onIntent: () => {},
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
    const newValue = this.getHorizontalValue(mouseEvent.pageX)
    this.props.onValue(newValue)
  }

  @autobind
  handleIntentMove (evt) {
    if (!this.state.isDragging) {
      this.triggerIntent(evt)
    }
  }

  triggerIntent (mouseEvent) {
    const value = this.getHorizontalValue(mouseEvent.pageX)
    this.props.onIntent(value)
  }

  getHorizontalValue (mouseX) {
    const { bounds } = this.props

    const rect = typeof bounds === 'function'
      ? bounds()
      : bounds


    let dLeft = mouseX - (rect.left + window.scrollX)
    dLeft = Math.max(dLeft, 0)
    dLeft = Math.min(dLeft, rect.width)

    const relValue = dLeft / rect.width
    return relValue
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
