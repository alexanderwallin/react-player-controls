import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

import { withChildrenStyles, withChildClasses } from '../utils/composers.js'
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
    style: PropTypes.object,
  }

  static defaultProps = {
    isMuted: false,
    isEnabled: true,
    className: 'MuteToggleButton',
    extraClasses: '',
    style: {},
  }

  @autobind
  handleMuteChange (isMuted) {
    if (this.props.isEnabled) {
      this.props.onMuteChange(isMuted)
    }
  }

  render () {
    const {
      isMuted, isEnabled,
      className, extraClasses, childClasses,
      style, childrenStyles,
    } = this.props

    return (
      <div
        className={classNames(className, extraClasses, { isMuted, isEnabled })}
        style={style}
      >
        {isMuted
          ? (
            <SoundOffButton
              className={childClasses.SoundOffButton}
              style={childrenStyles.SoundOffButton}
              isEnabled={isEnabled}
              onClick={() => this.handleMuteChange(false)}
            />
          )
          : (
            <SoundOnButton
              className={childClasses.SoundOnButton}
              style={childrenStyles.SoundOnButton}
              isEnabled={isEnabled}
              onClick={() => this.handleMuteChange(true)}
            />
          )
        }
      </div>
    )
  }
}

export default withChildClasses(withChildrenStyles(MuteToggleButton))
