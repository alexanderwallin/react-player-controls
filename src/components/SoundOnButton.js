import React from 'react'

import Button from './Button.js'
import { SoundOnIcon } from './icons.js'

/**
 * Sound on button
 */
class SoundOnButton extends Button {
  static defaultProps = {
    ...Button.defaultProps,
    className: 'SoundOnButton',
    children: <SoundOnIcon />,
  }
}

export default SoundOnButton
