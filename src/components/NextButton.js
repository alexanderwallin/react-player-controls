import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

const { func, bool, string } = PropTypes

class NextButton extends Component {

  static propTypes = {
    onClick: func.isRequired,
    isEnabled: bool,
    extraClasses: string,
  }

  static defaultProps = {
    isEnabled: false,
    extraClasses: '',
  }

  @autobind
  handleClick () {
    if (this.props.isEnabled) {
      this.props.onClick()
    }
  }

  render () {
    const { isEnabled, onClick, extraClasses } = this.props

    return (
      <div
        className={classNames('NextButton', extraClasses, { isEnabled })}
        onClick={this.handleClick}
      >
        <svg className="NextButton-icon" viewBox="0 0 100 100">
          <polygon className="NextButton-shape" points="72.6470588 11 72.6470588 44.1141176 15 12.0911765 15 85.9988235 72.6470588 53.9717647 72.6470588 89.2352941 85 89.2352941 85 11" />
        </svg>
      </div>
    )
  }
}

export default NextButton
