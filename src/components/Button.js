import React, { Component, PropTypes } from 'react'
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
    children: PropTypes.node,
  }

  static defaultProps = {
    className: 'Button',
    isEnabled: true,
    extraClasses: '',
    children: null,
  }

  @autobind
  handleClick () {
    if (this.props.isEnabled) {
      this.props.onClick()
    }
  }

  render() {
    const { isEnabled, className, extraClasses, children } = this.props

    return (
      <button
        className={classNames(
          className,
          { isEnabled },
          extraClasses
        )}
        disabled={!isEnabled}
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

export default Button
