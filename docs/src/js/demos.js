import React from 'react'
import ReactDOM from 'react-dom'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx.js'

import * as rpc from '../../../dist/index.js'

console.log(Prism.languages)

const demos = {}

//
// PlayButton demo
//
demos.PlayButton = class PlayButtonDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
    }
  }

  render() {
    const { isEnabled } = this.state

    return (
      <div className="ComponentDemo PlayButtonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<PlayButton\n  isEnabled={this.state.isEnabled}\n  onClick={() => alert('Play!')} \n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <input type="checkbox" checked={isEnabled} onChange={(evt) => this.setState({ isEnabled: !isEnabled })} />
            <code>isEnabled</code>
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.PlayButton
            onClick={() => alert('Play!')}
            isEnabled={isEnabled}
          />
        </div>
      </div>
    )
  }
}

//
// PauseButton demo
//
demos.PauseButton = class PauseButtonDemo extends React.Component {
  render() {
    return (
      <div className="ComponentDemo PauseButtonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<PauseButton\n  onClick={() => alert('Pause!')} \n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-results">
          <rpc.PauseButton onClick={() => alert('Pause!')} />
        </div>
      </div>
    )
  }
}

//
// PrevButton demo
//
demos.PrevButton = class PrevButtonDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
    }
  }

  render() {
    const { isEnabled } = this.state

    return (
      <div className="ComponentDemo PrevButtonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<PrevButton\n  isEnabled={this.state.isEnabled}\n  onClick={() => alert('Go to previous')} \n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <input type="checkbox" checked={isEnabled} onChange={(evt) => this.setState({ isEnabled: !isEnabled })} />
            <code>isEnabled</code>
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.PrevButton
            onClick={() => alert('Go to previous')}
            isEnabled={isEnabled}
          />
        </div>
      </div>
    )
  }
}

//
// NextButton demo
//
demos.NextButton = class NextButtonDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
    }
  }

  render() {
    const { isEnabled } = this.state

    return (
      <div className="ComponentDemo NextButtonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<NextButton\n  isEnabled={this.state.isEnabled}\n  onClick={() => alert('Go to next')} \n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <input type="checkbox" checked={isEnabled} onChange={(evt) => this.setState({ isEnabled: !isEnabled })} />
            <code>isEnabled</code>
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.NextButton
            onClick={() => alert('Go to next')}
            isEnabled={isEnabled}
          />
        </div>
      </div>
    )
  }
}

//
// PlaybackControls demo
//
demos.PlaybackControls = class PlaybackControls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPlaying: false,
      isPlayable: true,
      hasPrevious: true,
      hasNext: true,
    }
  }

  render() {
    const { isPlayable, isPlaying, hasPrevious, hasNext } = this.state

    return (
      <div className="ComponentDemo PlaybackControls">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<PlaybackControls\n  isEnabled={this.state.isEnabled}\n  onClick={() => alert('Go to next')} \n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <input type="checkbox" checked={isPlayable} onChange={(evt) => this.setState({ isPlayable: !isPlayable })} />
            <code>isPlayable</code>
          </label>

          <label>
            <input type="checkbox" checked={hasPrevious} onChange={(evt) => this.setState({ hasPrevious: !hasPrevious })} />
            <code>hasPrevious</code>
          </label>

          <label>
            <input type="checkbox" checked={hasNext} onChange={(evt) => this.setState({ hasNext: !hasNext })} />
            <code>hasNext</code>
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.PlaybackControls
            isPlayable={isPlayable}
            isPlaying={isPlaying}
            onPlaybackChange={isPlaying => this.setState(Object.assign({}, this.state, { isPlaying: isPlaying }))}
            hasPrevious={hasPrevious}
            onPrevious={() => alert('Go to previous')}
            hasNext={hasNext}
            onNext={() => alert('Go to next')}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<demos.PlayButton />, document.querySelector('.component-demo[data-component="PlayButton"]'))
ReactDOM.render(<demos.PauseButton />, document.querySelector('.component-demo[data-component="PauseButton"]'))
ReactDOM.render(<demos.PrevButton />, document.querySelector('.component-demo[data-component="PrevButton"]'))
ReactDOM.render(<demos.NextButton />, document.querySelector('.component-demo[data-component="NextButton"]'))
ReactDOM.render(<demos.PlaybackControls />, document.querySelector('.component-demo[data-component="PlaybackControls"]'))
