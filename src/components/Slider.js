import React from 'react'
import PropTypes from 'prop-types'
import { useGesture } from 'react-use-gesture'

import { Direction } from '../constants.js'

function noop () {}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getRectFromBounds (bounds) {
  return typeof bounds === 'function' ? bounds() : bounds
}

function getHorizontalValue (rect, x) {
  const scrollX = (window.pageXOffset !== undefined)
    ? window.pageXOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollLeft
  const pageX = scrollX + x
  const dLeft = clamp(pageX - (rect.left + scrollX), 0, rect.width)
  return dLeft / rect.width
}

function getVerticalValue (rect, y) {
  const scrollY = (window.pageYOffset !== undefined)
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop
  const pageY = scrollY + y
  const dTop = clamp(pageY - (rect.top + scrollY), 0, rect.height)
  return 1 - (dTop / rect.height)
}

function getSliderValue (bounds, direction, xy) {
  const rect = getRectFromBounds(bounds)
  return direction === Direction.HORIZONTAL
    ? getHorizontalValue(rect, xy[0])
    : getVerticalValue(rect, xy[1])
}

/**
 * Slider
 *
 * A wrapper around <RangeControlOverlay /> that may be used to
 * compose slider controls such as volume sliders or progress bars.
 */
function Slider ({
  direction = Direction.HORIZONTAL,
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
  const bounds = () => $el.current.getBoundingClientRect()

  const bind = useGesture(
    {
      onMoveStart: ({ dragging, xy }) => !dragging && onIntentStart(getSliderValue(bounds, direction, xy)),
      onMove: ({ dragging, xy }) => !dragging && onIntent(getSliderValue(bounds, direction, xy)),
      onMoveEnd: ({ dragging }) => !dragging && onIntentEnd(),
      onDragStart: ({ xy }) => onChangeStart(getSliderValue(bounds, direction, xy)),
      onDrag: ({ xy }) => onChange(getSliderValue(bounds, direction, xy)),
      onDragEnd: ({ xy }) => onChangeStart(getSliderValue(bounds, direction, xy)),
    },
    {
      axis: direction === Direction.HORIZONTAL ? 'x' : 'y',
      filterTaps: true,
    }
  )

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

      <div
        {...bind()}
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

function arePropsEqual (prevProps, nextProps) {
  for (const prop in nextProps) {
    if (nextProps[prop] !== prevProps[prop]) {
      return false
    }
  }
  return true
}

export default React.memo(Slider, arePropsEqual)
