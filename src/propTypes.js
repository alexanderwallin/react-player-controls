import { PropTypes } from 'react'

const { oneOfType, node, element, string } = PropTypes

/**
 * Prop that specifies a component
 *
 * @type {Object}
 */
export const customComponentProp = oneOfType([
  node,
  element,
  string,
])
