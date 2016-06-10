import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const { bool, func, string } = PropTypes

/**
 * Pause button
 */
class PauseButton extends Component {
  static propTypes = {
    onClick: func.isRequired,
    extraClasses: string,
  }

  static defaultProps = {
    extraClasses: '',
  }

  render() {
    const { onClick, extraClasses } = this.props

    return (
      <div
        className={classNames(
          'PauseButton',
          'isEnabled',
          extraClasses
        )}
        onClick={onClick}
      >
        <svg className="PauseButton-icon" viewBox="0 0 100 100">
          <g className="PauseButton-group">
            <rect className="PauseButton-shape" x="58" y="11" width="21" height="78"></rect>
            <rect className="PauseButton-shape" x="22" y="11" width="21" height="78"></rect>
          </g>
        </svg>
      </div>
    )
  }
}

export default PauseButton
