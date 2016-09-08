import { PropTypes } from 'react'
import curry from 'lodash.curry'

/**
 * Adds `childrenStyles` prop type and default prop to
 * a component
 */
export const withChildrenStyles = curry(Component => {
  Component.propTypes = {
    ...(Component.propTypes || {}),
    childrenStyles: PropTypes.object,
  }

  Component.defaultProps = {
    ...(Component.defaultProps || {}),
    childrenStyles: {},
  }

  return Component
})
