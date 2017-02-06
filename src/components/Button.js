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
    style: PropTypes.object,
    children: PropTypes.node,
  }

  static defaultProps = {
    isEnabled: true,
    className: 'Button',
    extraClasses: '',
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
    const { isEnabled, className, extraClasses, style, children } = this.props

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
