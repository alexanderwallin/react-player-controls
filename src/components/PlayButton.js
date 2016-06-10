import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const { bool, func, string } = PropTypes

/**
 * Play button
 */
class PlayButton extends Component {
  static propTypes = {
    onClick: func.isRequired,
    isEnabled: bool,
    extraClasses: string,
  }

  static defaultProps = {
    isEnabled: false,
    extraClasses: '',
  }

  render() {
    const { isEnabled, onClick, extraClasses } = this.props

    return (
      <div
        className={classNames(
          'PlayButton',
          { isEnabled },
          extraClasses
        )}
        onClick={onClick}
      >
        <svg className="PlayButton-icon" viewBox="0 0 100 100">
          <polygon className="PlayButton-icon-shape" points="24 92 24 7 100 49.4955227"></polygon>
        </svg>
      </div>
    )
  }
}

export default PlayButton
