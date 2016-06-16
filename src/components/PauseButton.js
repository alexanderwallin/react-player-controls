import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import { PauseIcon } from './icons.js'

const { bool, func, string, node } = PropTypes

/**
 * Pause button
 */
class PauseButton extends Component {
  static propTypes = {
    onClick: func.isRequired,
    extraClasses: string,
    children: node,
  }

  static defaultProps = {
    extraClasses: '',
    children: <PauseIcon />,
  }

  render() {
    const { onClick, extraClasses, children } = this.props

    return (
      <button
        className={classNames(
          'PauseButton',
          'isEnabled',
          extraClasses
        )}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}

export default PauseButton
