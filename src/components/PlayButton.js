import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

import { PlayIcon } from './icons.js'

const { bool, func, string, node } = PropTypes

/**
 * Play button
 */
class PlayButton extends Component {
  static propTypes = {
    onClick: func.isRequired,
    isEnabled: bool,
    children: node,
    extraClasses: string,
  }

  static defaultProps = {
    isEnabled: false,
    children: <PlayIcon />,
    extraClasses: '',
  }

  @autobind
  handleClick () {
    if (this.props.isEnabled) {
      this.props.onClick()
    }
  }

  render () {
    const { isEnabled, onClick, extraClasses, children } = this.props

    return (
      <button
        className={classNames(
          'PlayButton',
          { isEnabled },
          extraClasses
        )}
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

export default PlayButton
