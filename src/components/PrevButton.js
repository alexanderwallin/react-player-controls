import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import { PreviousIcon } from './icons.js'

const { func, bool, string, node } = PropTypes

class PrevButton extends Component {

  static propTypes = {
    onClick: func.isRequired,
    isEnabled: bool,
    extraClasses: string,
    children: node,
  }

  static defaultProps = {
    isEnabled: false,
    extraClasses: '',
    children: <PreviousIcon />,
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
        className={classNames('PrevButton', extraClasses, { isEnabled })}
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

export default PrevButton
