import { PropTypes } from 'react'

/**
 * Adds `childrenStyles` prop type and default prop to
 * a component
 */
export const withChildrenStyles = Component => {
  Component.propTypes = {
    ...(Component.propTypes || {}),
    childrenStyles: PropTypes.object,
  }

  Component.defaultProps = {
    ...(Component.defaultProps || {}),
    childrenStyles: {},
  }

  return Component
}
