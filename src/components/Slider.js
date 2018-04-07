import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

import { Direction } from '../constants.js'
import { noop } from '../utils.js'
import RangeControlOverlay from './RangeControlOverlay.js'

/**
 * Slider
 *
 * A wrapper around <RangeControlOverlay /> that may be used to
 * compose slider controls such as volume sliders or progress bars.
 */
class Slider extends PureComponent {
  static propTypes = {
    direction: PropTypes.oneOf([Direction.HORIZONTAL, Direction.VERTICAL]),
    isEnabled: PropTypes.bool,
    onIntent: PropTypes.func,
    onChange: PropTypes.func,
    onChangeStart: PropTypes.func,
    onChangeEnd: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    direction: Direction.HORIZONTAL,
    isEnabled: true,
    onIntent: noop,
    onChange: noop,
    onChangeStart: noop,
    onChangeEnd: noop,
    children: null,
    className: null,
    style: {}
  }

  $el = null

  @autobind
  storeRef ($el) {
    this.$el = $el
  }

  @autobind
  handleIntent (intent) {
    if (this.props.isEnabled) {
      this.props.onIntent(intent)
    }
  }

  @autobind
  handleChange (value) {
    if (this.props.isEnabled) {
      this.props.onChange(value)
    }
  }

  @autobind
  handleChangeStart (value) {
    if (this.props.isEnabled) {
      this.props.onChangeStart(value)
    }
  }

  @autobind
  handleChangeEnd (value) {
    if (this.props.isEnabled) {
      this.props.onChangeEnd(value)
    }
  }

  render () {
    const {
      direction,
      children,
      className,
      style,
    } = this.props

    return (
      <div
        ref={this.storeRef}
        className={className}
        style={{
          position: 'relative',
          ...style,
        }}
      >
        {children}

        {/*
          TODO: Make it possible to render or extend this node yourself,
          so that these styles – the z-index property in particular – is
          not forced upon the component consumer.
        */}
        <RangeControlOverlay
          direction={direction}
          bounds={() => this.$el.getBoundingClientRect()}
          onIntent={this.handleIntent}
          onChange={this.handleChange}
          onChangeStart={this.handleChangeStart}
          onChangeEnd={this.handleChangeEnd}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 10,
          }}
        />
      </div>
    )
  }
}

export default Slider
