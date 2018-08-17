import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

/**
 * Base button component
 */
class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool,
    className: PropTypes.string,
    extraClasses: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    icon: PropTypes.node
  }

  static defaultProps = {
    isEnabled: true,
    className: 'Button',
    extraClasses: '',
    style: {},
    children: null,
  }

  @autobind
  handleClick (event) {
    if (this.props.isEnabled) {
      this.props.onClick(event)
    }
  }

  render () {
    const { isEnabled, className, extraClasses, style, icon } = this.props
    let { children } = this.props

    // Check if icon was passed as prop, and if so then use as children
    if (icon !== undefined) {
      children = icon
    }

    return (
      <button
        className={classNames(
          className,
          { isEnabled },
          extraClasses
        )}
        style={style}
        disabled={!isEnabled}
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

export default Button
