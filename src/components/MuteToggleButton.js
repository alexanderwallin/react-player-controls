import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

import SoundOnButton from './SoundOnButton.js'
import SoundOffButton from './SoundOffButton.js'

/**
 * Mute toggle button
 */
class MuteToggleButton extends Component {
  static propTypes = {
    onMuteChange: PropTypes.func.isRequired,
    isMuted: PropTypes.bool,
    isEnabled: PropTypes.bool,
    className: PropTypes.string,
    extraClasses: PropTypes.string,
  }

  static defaultProps = {
    isMuted: false,
    isEnabled: true,
    className: 'MuteToggleButton',
    extraClasses: '',
  }

  @autobind
  handleMuteChange (isMuted) {
    if (this.props.isEnabled) {
      this.props.onMuteChange(isMuted)
    }
  }

  render () {
    const { isMuted, isEnabled, className, extraClasses } = this.props

    return (
      <div className={classNames(className, extraClasses, { isMuted, isEnabled })}>
        {isMuted
          ? <SoundOffButton onClick={() => this.handleMuteChange(false)} />
          : <SoundOnButton onClick={() => this.handleMuteChange(true)} />
        }
      </div>
    )
  }
}

export default MuteToggleButton
