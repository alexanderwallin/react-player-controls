import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { NextIcon } from './icons.js'

const { func, bool, string, node } = PropTypes

class NextButton extends Component {

  static propTypes = {
    onClick: func.isRequired,
    isEnabled: bool,
    extraClasses: string,
    children: node,
  }

  static defaultProps = {
    isEnabled: false,
    extraClasses: '',
    children: <NextIcon />,
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
        className={classNames('NextButton', extraClasses, { isEnabled })}
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

export default NextButton
