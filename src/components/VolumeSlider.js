import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { compose, withChildrenStyles, withChildClasses } from '../utils/composers.js'
import RangeControlOverlay, { ControlDirection } from './RangeControlOverlay.js'

const { number, bool, func, string, object, oneOf } = PropTypes

/**
 * Volume slider component
 */
class VolumeSlider extends Component {

  static propTypes = {
    volume: number,
    isEnabled: bool,
    onVolumeChange: func,
    direction: oneOf([ControlDirection.HORIZONTAL, ControlDirection.VERTICAL]),
    className: string,
    style: object,
  }

  static defaultProps = {
    volume: 0,
    isEnabled: false,
    onVolumeChange: () => {},
    direction: ControlDirection.VERTICAL,
    className: 'VolumeSlider',
    style: {},
  }

  constructor (props) {
    super(props)

    this.sliderEl = null

    this.state = {
      currentIntent: 0,
    }
  }

  @autobind
  storeRef (rootEl) {
    this.sliderEl = rootEl
  }

  @autobind
  getBounds () {
    return this.sliderEl.getBoundingClientRect()
  }

  @autobind
  handleVolumeChange (volume) {
    const { isEnabled, onVolumeChange } = this.props

    if (isEnabled) {
      onVolumeChange(volume)
    }
  }

  @autobind
  handleIntent (volume) {
    const intent = this.props.isEnabled ? volume : 0

    this.setState({
      currentIntent: intent,
    })
  }

  render () {
    const {
      volume, isEnabled, direction,
      className, childClasses, style, childrenStyles,
    } = this.props
    const { currentIntent } = this.state

    const volumePercentage = Math.min(100, Math.max(0, volume * 100))
    const styleSize = `${volumePercentage}%`

    const appliedIntent = isEnabled && currentIntent !== 0 ? currentIntent : 0
    const isDecreaseIntent = appliedIntent && currentIntent < volume

    const directionClass = direction === ControlDirection.VERTICAL
      ? 'isVertical'
      : 'isHorizontal'

    const valueSizeProperty = direction === ControlDirection.VERTICAL
      ? 'height'
      : 'width'

    const intentSizeProperty = direction === ControlDirection.VERTICAL
      ? 'height'
      : 'width'

    const handleSizeProperty = direction === ControlDirection.VERTICAL
      ? 'bottom'
      : 'left'

    return (
      <div
        className={classNames(className, directionClass, {
          isEnabled,
          isDecreaseIntent,
        })}
        style={style}
        ref={this.storeRef}
      >
        <div
          className={childClasses.value || 'VolumeSlider-value'}
          style={{ [valueSizeProperty]: styleSize, ...(childrenStyles.value || {}) }}
        />

        <div
          className={childClasses.intent || 'VolumeSlider-intent'}
          style={{ [intentSizeProperty]: `${appliedIntent * 100}%`, ...(childrenStyles.intent || {}) }}
        />

        <div
          className={childClasses.handle || 'VolumeSlider-handle'}
          style={{ [handleSizeProperty]: styleSize, ...(childrenStyles.handle || {}) }}
        />

        {isEnabled && (
          <RangeControlOverlay
            className={childClasses.seek || 'VolumeSlider-seek'}
            style={childrenStyles.RangeControlOverlay}
            bounds={this.getBounds}
            direction={direction}
            onValue={this.handleVolumeChange}
            onIntent={this.handleIntent}
          />
        )}
      </div>
    )
  }
}

export default compose(
  withChildrenStyles(),
  withChildClasses()
)(VolumeSlider)
