import React from 'react'

import Button from './Button.js'
import { NextIcon } from './icons.js'

/**
 * Next button
 */
class NextButton extends Button {
  static defaultProps = {
    ...Button.defaultProps,
    className: 'NextButton',
    children: <NextIcon />,
    isEnabled: false,
  }
}

export default NextButton
