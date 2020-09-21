import React from 'react'
import PropTypes from 'prop-types'

import { Direction } from '../constants.js'
import { noop } from '../utils.js'
import RangeControlOverlay from './RangeControlOverlay.js'

/**
 * Slider
 *
 * A wrapper around <RangeControlOverlay /> that may be used to
 * compose slider controls such as volume sliders or progress bars.
 */
function Slider ({
  direction = Direction.HORIZONTAL,
  isEnabled = true,
  onIntent = noop,
  onIntentStart = noop,
  onIntentEnd = noop,
  onChange = noop,
  onChangeStart = noop,
  onChangeEnd = noop,
  children = null,
  className = null,
  style = {},
  overlayZIndex = 10,
}) {
  const $el = React.createRef()

  const handleIntent = (intent) => {
    if (isEnabled) {
      onIntent(intent)
    }
  }
  const handleIntentStart = (intent) => {
    if (isEnabled) {
      onIntentStart(intent)
    }
  }
  const handleIntentEnd = () => {
    if (isEnabled) {
      onIntentEnd()
    }
  }
  const handleChange = (value) => {
    if (isEnabled) {
      onChange(value)
    }
  }
  const handleChangeStart = (value) => {
    if (isEnabled) {
      onChangeStart(value)
    }
  }
  const handleChangeEnd = (value) => {
    if (isEnabled) {
      onChangeEnd(value)
    }
  }

  return (
    <div
      ref={$el}
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
        bounds={() => $el.current.getBoundingClientRect()}
        onIntent={handleIntent}
        onIntentStart={handleIntentStart}
        onIntentEnd={handleIntentEnd}
        onChange={handleChange}
        onChangeStart={handleChangeStart}
        onChangeEnd={handleChangeEnd}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: overlayZIndex,
        }}
      />
    </div>
  )
}

Slider.propTypes = {
  direction: PropTypes.oneOf([Direction.HORIZONTAL, Direction.VERTICAL]),
  isEnabled: PropTypes.bool,
  onIntent: PropTypes.func,
  onIntentStart: PropTypes.func,
  onIntentEnd: PropTypes.func,
  onChange: PropTypes.func,
  onChangeStart: PropTypes.func,
  onChangeEnd: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  overlayZIndex: PropTypes.number,
}

export default Slider
