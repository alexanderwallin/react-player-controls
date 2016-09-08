import { PropTypes } from 'react'
import curry from 'lodash.curry'
import flowRight from 'lodash.flowright'

/**
 * For clarification
 */
export const compose = flowRight

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

/**
 *
 */
export const withCustomizableClasses = curry((defaultClassName, Component) => {
  Component.propTypes = {
    ...(Component.propTypes || {}),
    className: PropTypes.string,
    extraClasses: PropTypes.string,
  }

  Component.defaultProps = {
    ...(Component.defaultProps || {}),
    className: defaultClassName,
    extraClasses: '',
  }

  return Component
})
