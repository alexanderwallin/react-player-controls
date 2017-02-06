import React from 'react'

import Button from './Button.js'
import { PreviousIcon } from './icons.js'

/**
 * Previous button
 */
class PrevButton extends Button {
  static defaultProps = {
    ...Button.defaultProps,
    className: 'PrevButton',
    children: <PreviousIcon />,
    isEnabled: false,
  }
}

export default PrevButton
