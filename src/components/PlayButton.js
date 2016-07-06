import React from 'react'
import classNames from 'classnames'

import Button from './Button.js'
import { PlayIcon } from './icons.js'

/**
 * Play button
 */
class PlayButton extends Button {
  static defaultProps = {
    ...Button.defaultProps,
    className: 'PlayButton',
    children: <PlayIcon />,
    isEnabled: false,
  }
}

export default PlayButton
