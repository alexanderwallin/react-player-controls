import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

const { func, bool, string } = PropTypes

class PrevButton extends Component {

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
        className={classNames('PrevButton', extraClasses, { isEnabled })}
        onClick={this.handleClick}
      >
        <svg className="PrevButton-icon" viewBox="0 0 100 100">
          <polygon className="PrevButton-shape" points="85 12.6092632 27.3529412 44.5358947 27.3529412 11 15 11 15 89 27.3529412 89 27.3529412 54.368 85 86.3028421" />
        </svg>
      </div>
    )
  }
}

export default PrevButton
