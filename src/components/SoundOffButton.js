import React from 'react'

import Button from './Button.js'
import { SoundOffIcon } from './icons.js'

/**
 * Sound off button
 */
class SoundOffButton extends Button {
  static defaultProps = {
    ...Button.defaultProps,
    className: 'SoundOffButton',
    children: <SoundOffIcon />,
  }
}

export default SoundOffButton
