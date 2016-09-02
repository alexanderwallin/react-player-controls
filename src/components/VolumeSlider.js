import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { withChildrenStyles } from '../utils/composers.js'
import RangeControlOverlay, { ControlDirection } from './RangeControlOverlay.js'

const { number, bool, func, string, object } = PropTypes

/**
 * Volume slider component
 */
class VolumeSlider extends Component {

  static propTypes = {
    volume: number,
    isEnabled: bool,
    onVolumeChange: func,
    extraClasses: string,
    style: object,
  }

  static defaultProps = {
    volume: 0,
    isEnabled: false,
    onVolumeChange: () => {},
    extraClasses: '',
    style: {},
  }

  constructor(props) {
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
    const { volume, isEnabled, extraClasses, style, childrenStyles } = this.props
    const { currentIntent } = this.state

    const volumePercentage = Math.min(100, Math.max(0, volume * 100))
    const styleBottom = `${volumePercentage}%`

    const appliedIntent = isEnabled && currentIntent !== 0 ? currentIntent : 0
    const isDecreaseIntent = appliedIntent && currentIntent < volume

    return (
      <div
        className={classNames('VolumeSlider', extraClasses, {
          isEnabled,
          isDecreaseIntent,
        })}
        style={style}
        ref={this.storeRef}
      >
        <div className="VolumeSlider-value" style={{ height: styleBottom, ...(childrenStyles.value || {}) }} />

        <div className="VolumeSlider-intent" style={{ height: `${appliedIntent * 100}%`, ...(childrenStyles.intent || {}) }} />

        <div className="VolumeSlider-handle" style={{ bottom: styleBottom, ...(childrenStyles.handle || {}) }} />

        {isEnabled && (
          <RangeControlOverlay
            extraClasses="VolumeSlider-seek"
            style={childrenStyles.RangeControlOverlay}
            bounds={this.getBounds}
            direction={ControlDirection.VERTICAL}
            onValue={this.handleVolumeChange}
            onIntent={this.handleIntent}
          />
        )}
      </div>
    )
  }
}

export default withChildrenStyles(VolumeSlider)
