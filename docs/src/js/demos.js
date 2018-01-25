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
      showPrevious: true,
      hasPrevious: true,
      showNext: true,
      hasNext: true,
    }
  }

  render() {
    const { isPlayable, isPlaying, showPrevious, showNext, hasPrevious, hasNext } = this.state

    return (
      <div className="ComponentDemo PlaybackControls">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
`<PlaybackControls
  isPlayable={this.state.isPlayable}
  isPlaying={this.state.isPlaying}
  showPrevious={this.state.showPrevious}
  hasPrevious={this.state.hasPrevious}
  showNext={this.state.showNext}
  hasNext={this.state.hasNext}
  onPlaybackChange={isPlaying => this.setState({ ...this.state, isPlaying })}
  onPrevious={() => alert('Go to previous')}
  onNext={() => alert('Go to next')}
/>`,
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
            <input type="checkbox" checked={showPrevious} onChange={(evt) => this.setState({ showPrevious: !showPrevious })} />
            <code>showPrevious</code>
          </label>

          <label>
            <input type="checkbox" checked={hasPrevious} onChange={(evt) => this.setState({ hasPrevious: !hasPrevious })} />
            <code>hasPrevious</code>
          </label>

          <label>
            <input type="checkbox" checked={showNext} onChange={(evt) => this.setState({ showNext: !showNext })} />
            <code>showNext</code>
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
            showPrevious={showPrevious}
            hasPrevious={hasPrevious}
            onPrevious={() => alert('Go to previous')}
            showNext={showNext}
            hasNext={hasNext}
            onNext={() => alert('Go to next')}
          />
        </div>
      </div>
    )
  }
}



//
// FormattedTime demo
//
demos.FormattedTime = class FormattedTimeDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      numSeconds: 100,
    }
  }

  render() {
    const { numSeconds } = this.state

    return (
      <div className="ComponentDemo FormattedTimeDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<FormattedTime\n  numSeconds={this.state.numSeconds}\n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <code>numSeconds</code>
            <input type="number" value={numSeconds} onChange={evt => this.setState({ numSeconds: evt.target.value })} />
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.FormattedTime numSeconds={numSeconds} />
        </div>
      </div>
    )
  }
}

//
// TimeMarker demo
//
demos.TimeMarker = class TimeMarkerDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      totalTime: 190,
      currentTime: 65,
      markerSeparator: ' / ',
      firstMarkerType: rpc.TimeMarkerType.ELAPSED,
      secondMarkerType: rpc.TimeMarkerType.DURATION,
    }
  }

  render() {
    const { totalTime, currentTime, markerSeparator, firstMarkerType, secondMarkerType } = this.state

    return (
      <div className="ComponentDemo TimeMarkerDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<TimeMarker\n  totalTime={this.state.totalTime}\n  currentTime={this.state.currentTime}\n  markerSeparator={this.state.markerSeparator}\n  firstMarkerType={this.state.firstMarkerType}\n  secondMarkerType={this.state.secondMarkerType}\n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <code>totalTime</code>
            <input type="number" value={totalTime} onChange={evt => this.setState(Object.assign({}, this.state, { totalTime: evt.target.value }))} />
          </label>

          <label>
            <code>currentTime</code>
            <input type="number" value={currentTime} onChange={evt => this.setState(Object.assign({}, this.state, { currentTime: evt.target.value }))} />
          </label>

          <label>
            <code>markerSeparator</code>
            <input type="text" value={markerSeparator} onChange={evt => this.setState(Object.assign({}, this.state, { markerSeparator: evt.target.value }))} />
          </label>

          <label>
            <code>firstMarkerType</code>
            <select value={firstMarkerType} onChange={evt => this.setState(Object.assign({}, this.state, { firstMarkerType: evt.target.value }))}>
              {Object.keys(rpc.TimeMarkerType).map(type => (
                <option key={type} value={rpc.TimeMarkerType[type]}>TimeMarkerType.{type}</option>
              ))}
            </select>
          </label>

          <label>
            <code>secondMarkerType</code>
            <select value={secondMarkerType} onChange={evt => this.setState(Object.assign({}, this.state, { secondMarkerType: evt.target.value }))}>
              {Object.keys(rpc.TimeMarkerType).map(type => (
                <option key={type} value={rpc.TimeMarkerType[type]}>TimeMarkerType.{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.TimeMarker
            totalTime={totalTime}
            currentTime={currentTime}
            markerSeparator={markerSeparator}
            firstMarkerType={firstMarkerType}
            secondMarkerType={secondMarkerType}
          />
        </div>
      </div>
    )
  }
}

//
// ProgressBar demo
//
demos.ProgressBar = class ProgressBarDemo extends React.Component {
  constructor(props) {
    super(props)

    this.timer = null

    this.state = {
      totalTime: 190,
      currentTime: 65,
      isSeekable: true,
      lastSeekStart: 0,
      lastSeekEnd: 0,
    }
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState(Object.assign(
        {},
        this.state,
        { currentTime: (this.state.currentTime + 1) % this.state.totalTime }
      ))
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  render() {
    const { totalTime, currentTime, isSeekable, lastSeekStart, lastSeekEnd, lastIntent } = this.state

    return (
      <div className="ComponentDemo ProgressBarDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<ProgressBar\n  totalTime={this.state.totalTime}\n  currentTime={this.state.currentTime}\n  isSeekable={this.state.isSeekable}\n  onSeek={time => this.setState(() => ({ currentTime: time }))}\n  onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}\n  onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}\n  onIntent={time => this.setState(() => ({ lastIntent: time }))}\n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <code>totalTime</code>
            <input type="number" value={totalTime} onChange={evt => this.setState(Object.assign({}, this.state, { totalTime: evt.target.value }))} />
          </label>

          <label>
            <code>currentTime</code>
            <input type="number" value={currentTime} onChange={evt => this.setState(Object.assign({}, this.state, { currentTime: evt.target.value }))} />
          </label>

          <label>
            <input type="checkbox" checked={isSeekable} onChange={(evt) => this.setState(Object.assign({}, this.state, { isSeekable: !isSeekable }))} />
            <code>isSeekable</code>
          </label>

          <label>
            <code>lastSeekStart</code>
            <input type="number" disabled value={lastSeekStart} />
          </label>

          <label>
            <code>lastSeekEnd</code>
            <input type="number" disabled value={lastSeekEnd} />
          </label>

          <label>
            <code>lastIntent</code>
            <input type="number" disabled value={lastIntent} />
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.ProgressBar
            totalTime={totalTime}
            currentTime={currentTime}
            isSeekable={isSeekable}
            onSeek={time => this.setState(() => ({ currentTime: time }))}
            onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
            onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}
            onIntent={time => this.setState(() => ({ lastIntent: time }))}
          />
        </div>
      </div>
    )
  }
}

//
// SoundOnButton demo
//
demos.SoundOnButton = class SoundOnButtonDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
    }
  }

  render() {
    const { isEnabled } = this.state

    return (
      <div className="ComponentDemo SoundOnButtonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<SoundOnButton\n  isEnabled={this.state.isEnabled}\n  onClick={() => alert('Turn off sound')} \n/>`,
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
          <rpc.SoundOnButton
            onClick={() => alert('Turn off sound')}
            isEnabled={isEnabled}
          />
        </div>
      </div>
    )
  }
}

//
// SoundOffButton demo
//
demos.SoundOffButton = class SoundOffButtonDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
    }
  }

  render() {
    const { isEnabled } = this.state

    return (
      <div className="ComponentDemo SoundOnButffonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<SoundOffButton\n  isEnabled={this.state.isEnabled}\n  onClick={() => alert('Turn on sound')} \n/>`,
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
          <rpc.SoundOffButton
            onClick={() => alert('Turn on sound')}
            isEnabled={isEnabled}
          />
        </div>
      </div>
    )
  }
}

//
// MuteToggleButton demo
//
demos.MuteToggleButton = class MuteToggleButtonDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
      isMuted: false,
    }
  }

  render() {
    const { isEnabled, isMuted } = this.state

    return (
      <div className="ComponentDemo SoundOnButffonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<MuteToggleButton\n  isEnabled={this.state.isEnabled}\n  isMuted={this.state.isMuted}\n  onMuteChange={isMuted => this.setState({ ...this.state, isMuted })}\n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <input type="checkbox" checked={isEnabled} onChange={(evt) => this.setState(Object.assign({}, this.state, { isEnabled: !isEnabled }))} />
            <code>isEnabled</code>
          </label>

          <label>
            <input type="checkbox" checked={isMuted} onChange={(evt) => this.setState(Object.assign({}, this.state, { isMuted: !isMuted }))} />
            <code>isMuted</code>
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.MuteToggleButton
            isEnabled={isEnabled}
            isMuted={isMuted}
            onMuteChange={isMuted => this.setState(Object.assign({}, this.state, { isMuted }))}
          />
        </div>
      </div>
    )
  }
}

//
// VolumeSlider demo
//
demos.VolumeSlider = class VolumeSliderDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      direction: rpc.ControlDirection.VERTICAL,
      isEnabled: true,
      volume: 0.5,
    }
  }

  render() {
    const { direction, isEnabled, volume } = this.state

    return (
      <div className="ComponentDemo SoundOnButffonDemo">
        <pre className="ComponentDemo-code">
          <code className="language-jsx" dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              `<VolumeSlider\n  direction={this.state.direction}\n  isEnabled={this.state.isEnabled}\n  volume={this.state.volume}\n  onVolumeChange={volume => this.setState({ ...this.state, volume })} \n/>`,
              Prism.languages.jsx
            )
          }} />
        </pre>

        <div className="ComponentDemo-settings">
          <label>
            <code>direction</code>
            <select value={direction} onChange={evt => this.setState(Object.assign({}, this.state, { direction: evt.target.value }))}>
              {Object.keys(rpc.ControlDirection).map(direction => (
                <option key={direction} value={rpc.ControlDirection[direction]}>ControlDirection.{direction}</option>
              ))}
            </select>
          </label>

          <label>
            <input type="checkbox" checked={isEnabled} onChange={(evt) => this.setState(Object.assign({}, this.state, { isEnabled: !isEnabled }))} />
            <code>isEnabled</code>
          </label>

          <label>
            <code>volume</code>
            <input type="number" min="0" max="1" step="0.1" value={volume} onChange={evt => this.setState(Object.assign({}, this.state, { volume: evt.target.value }))} />
          </label>
        </div>

        <div className="ComponentDemo-results">
          <rpc.VolumeSlider
            direction={direction}
            isEnabled={isEnabled}
            volume={volume}
            onVolumeChange={volume => this.setState(Object.assign({}, this.state, { volume }))}
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

ReactDOM.render(<demos.FormattedTime />, document.querySelector('.component-demo[data-component="FormattedTime"]'))
ReactDOM.render(<demos.TimeMarker />, document.querySelector('.component-demo[data-component="TimeMarker"]'))
ReactDOM.render(<demos.ProgressBar />, document.querySelector('.component-demo[data-component="ProgressBar"]'))

ReactDOM.render(<demos.SoundOnButton />, document.querySelector('.component-demo[data-component="SoundOnButton"]'))
ReactDOM.render(<demos.SoundOffButton />, document.querySelector('.component-demo[data-component="SoundOffButton"]'))
ReactDOM.render(<demos.MuteToggleButton />, document.querySelector('.component-demo[data-component="MuteToggleButton"]'))
ReactDOM.render(<demos.VolumeSlider />, document.querySelector('.component-demo[data-component="VolumeSlider"]'))
