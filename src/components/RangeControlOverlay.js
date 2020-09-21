import React from 'react'
import { useGesture } from 'react-use-gesture'
import PropTypes from 'prop-types'

import { Direction } from '../constants.js'
import { noop } from '../utils.js'

const { oneOfType, shape, func, number, oneOf, object, string } = PropTypes

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getRectFromBounds (bounds) {
  return typeof bounds === 'function'
    ? bounds()
    : bounds
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

function RangeControlOverlay ({
  bounds,
  onChange = noop,
  onChangeStart = noop,
  onChangeEnd = noop,
  onIntent = noop,
  onIntentStart = noop,
  onIntentEnd = noop,
  direction = Direction.HORIZONTAL,
  className = null,
  style = null
}) {
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
      className={className}
      style={{
        touchAction: direction === Direction.HORIZONTAL ? 'pan-y' : 'pan-x',
        ...style,
      }}
      {...bind()}
    />
  )
}

RangeControlOverlay.propTypes = {
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

export default RangeControlOverlay
