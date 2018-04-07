import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

/**
 * Base button component
 */
class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
  }

  static defaultProps = {
    isEnabled: true,
    className: null,
    style: {},
    children: null,
  }

  @autobind
  handleClick () {
    if (this.props.isEnabled) {
      this.props.onClick()
    }
  }

  render () {
    const { isEnabled, className, style, children } = this.props

    return (
      <button
        className={className}
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
