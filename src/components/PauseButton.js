import React from 'react'
import classNames from 'classnames'

import Button from './Button.js'
import { PauseIcon } from './icons.js'

/**
 * Pause button
 */
class PauseButton extends Button {
  static defaultProps = {
    ...Button.defaultProps,
    className: 'PauseButton',
    children: <PauseIcon />,
  }
}

export default PauseButton
