import PropTypes from 'prop-types'

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
