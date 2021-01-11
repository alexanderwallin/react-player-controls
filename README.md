<h1 align="center">
  <img src="https://alexanderwallin.github.io/react-player-controls/assets/logo-icon.svg" width="100" height="100" />
  <br />
  react-player-controls
  <br />
  &nbsp;
</h1>

[![npm version](https://badge.fury.io/js/react-player-controls.svg)](https://npmjs.com/package/react-player-controls)
[![Build Status](https://travis-ci.org/alexanderwallin/react-player-controls.svg?branch=master)](https://travis-ci.org/alexanderwallin/react-player-controls)
[![Dependencies](https://img.shields.io/david/alexanderwallin/react-player-controls.svg?style=flat-square)](https://david-dm.org/alexanderwallin/react-player-controls)
[![Dev dependency status](https://david-dm.org/alexanderwallin/react-player-controls/dev-status.svg?style=flat-square)](https://david-dm.org/alexanderwallin/react-player-controls#info=devDependencies)

This is a minimal set of modular and hopefully useful React components for composing media player interfaces. It is designed for you to compose media player controls yourself using a [small and easy-to-learn API](#api).

Instead of shipping default but customisable styles, there are [implementation recipies](#recipes) to help you get going quickly. Also check out [the demo site](http://alexanderwallin.github.io/react-player-controls/) to try the components out.

⚠️  **NOTE:** This library does not deal with actual media in any way, only the UI. ⚠️

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Recipies](#recipies)
* [Contribute](#contribute)


## Installation

```sh
npm i react-player-controls
```

## Usage

```js
// ES2015+ import
import { Slider, Direction } from 'react-player-controls'

// Using CommonJS
const { Slider, Direction } = require('react-player-controls')
```

## API

* [`Direction`](#direction)
* [`<FormattedTime />`](#formattedtime-)
* [`<PlayerIcon />`](#playericon-)
* [`<Slider />`](#slider-)

### `Direction`

An enum describing a slider's active axis.

| Key | Value |
|-----|-------|
| `HORIZONTAL` | `"HORIZONTAL"` |
| `VERTICAL` | `"VERTICAL"` |

### `<FormattedTime />`

`<FormattedTime />` translates a number of seconds into the player-friendly format of `m:ss`, or `h:mm:ss` if the total time is one hour or higher.

```js
// This will render -1:01:02
<FormattedTime numSeconds={-3662} />
```

| Prop name | Default value | Description |
|-----------|---------------|-------------|
| `numSeconds` | `0` | A number of seconds, positive or negative |
| `className` | `null` | A string to set as the HTML `class` attribute |
| `style` | `{}` | Styles to set on the wrapping `span` element. |

### `<PlayerIcon />`

`<PlayerIcon />` is not really a component in itself, but a container of a number of icon components.

```js
<PlayerIcon.Play />
<PlayerIcon.Pause />
<PlayerIcon.Previous />
<PlayerIcon.Next />
<PlayerIcon.SoundOn />
<PlayerIcon.SoundOff />
```

Any props passed to a `<PlayerIcon.* />` component will be passed onto the underlying `svg` element.

### `<Slider />`

The `<Slider />` helps you build things like volume controls and progress bars. **It does not take a `value` prop**, but expects you to keep track of this yourself and render whatever you want inside it.

What this component actually does is that it renders an element inside itself, on top of its children, which listens to mouse events and invokes change and intent callbacks with relative, normalised values based on those events.

```js
<Slider
  direction={Direction.HORIZONTAL}
  onIntent={intent => console.log(`hovered at ${intent}`)}
  onIntentStart={intent => console.log(`entered with mouse at ${intent}`)}
  onIntentEnd={() => console.log('left with mouse')}
  onChange={newValue => console.log(`clicked at ${newValue}`)}
  onChangeStart={startValue => console.log(`started dragging at ${startValue}`)}
  onChangeEnd={endValue => console.log(`stopped dragging at ${endValue}`)}
>
  {/* Here we render whatever we want. Nothings is rendered by default. */}
</Slider>
```

| Prop name | Default value | Description |
|-----------|---------------|-------------|
| `direction` | `Direction.HORIZONTAL` | The slider's direction |
| `onIntent` | `(intent) => {}` | A function that is invoked with the relative, normalised value at which the user is hovering (when not dragging). |
| `onIntentStart` | `(intent) => {}` | A function this is invoked with the relative, normalised value at which the user started hovering the slider (when not dragging). |
| `onIntentEnd` | `() => {}` | A function this is invoked when the mouse left the slider area (when not dragging). |
| `onChange` | `(value) => {}` | A function that is invoked with the latest relative, normalised value that the user has set by either clicking or dragging. |
| `onChangeStart` | `(value) => {}` | A function that is invoked with the relative, normalised value at which the user started changing the slider's value. |
| `onChangeEnd` | `(value) => {}` | A function that is invoked with the relative, normalised value at which the user stopped changing the slider's value. When the component unmounts, this function will be invoked with a value of `null`. |
| `children` | `null` | Child elements. |
| `className` | `null` | A string to set as the HTML `class` attribute. |
| `style` | `{}` | Styles to set on the wrapping `div` element. |
| `overlayZIndex` | 10 | The `z-index` of the invisible overlay that captures mouse events |


## Recipies

<details>
<summary>Styled buttons with icons</summary>

```js
import { PlayerIcon } from 'react-player-controls'

// A base component that has base styles applied to it
const PlayerButton = ({ style, children, ...props }) => (
  <button
    style={{
      appearance: 'none',
      outline: 'none',
      border: 'none',
      borderRadius: 3,
      background: 'white',
      color: 'blue',
      '&:hover': {
        'color': 'lightblue',
      },
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
)

// Compose buttons with matching icons. Use whatever icon library
// you want. If you don't have any particular logic for each of the
// buttons, you might not need this abstraction.
const PlayButton = props => <button {...props}><PlayerIcon.Play /></button>
const PauseButton = props => <button {...props}><PlayerIcon.Pause /></button>
const PreviousButton = props => <button {...props}><PlayerIcon.Previous /></button>
const NextButton = props => <button {...props}><PlayerIcon.Next /></button>
```
</details>

<details>
<summary>Styled slider</summary>

```js
import { Direction, Slider } from 'react-player-controls'

const WHITE_SMOKE = '#eee'
const GRAY = '#878c88'
const GREEN = '#72d687'

// A colored bar that will represent the current value
const SliderBar = ({ direction, value, style }) => (
  <div
    style={Object.assign({}, {
      position: 'absolute',
      background: GRAY,
      borderRadius: 4,
    }, direction === Direction.HORIZONTAL ? {
      top: 0,
      bottom: 0,
      left: 0,
      width: `${value * 100}%`,
    } : {
      right: 0,
      bottom: 0,
      left: 0,
      height: `${value * 100}%`,
    }, style)}
  />
)

// A handle to indicate the current value
const SliderHandle = ({ direction, value, style }) => (
  <div
    style={Object.assign({}, {
      position: 'absolute',
      width: 16,
      height: 16,
      background: GREEN,
      borderRadius: '100%',
      transform: 'scale(1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.3)',
      }
    }, direction === Direction.HORIZONTAL ? {
      top: 0,
      left: `${value * 100}%`,
      marginTop: -4,
      marginLeft: -8,
    } : {
      left: 0,
      bottom: `${value * 100}%`,
      marginBottom: -8,
      marginLeft: -4,
    }, style)}
  />
)

// A composite progress bar component
const ProgressBar = ({ isEnabled, direction, value, ...props }) => (
  <Slider
    direction={direction}
    onChange={/* store value somehow */}
    style={{
      width: direction === Direction.HORIZONTAL ? 200 : 8,
      height: direction === Direction.HORIZONTAL ? 8 : 130,
      borderRadius: 4,
      background: WHITE_SMOKE,
      transition: direction === Direction.HORIZONTAL ? 'width 0.1s' : 'height 0.1s',
      cursor: isEnabled === true ? 'pointer' : 'default',
    }}
    {...props}
  >
    <SliderBar direction={direction} value={value} style={{ background: isEnabled ? GREEN : GRAY }} />
    <SliderHandle direction={direction} value={value} style={{ background: isEnabled ? GREEN : GRAY }} />
  </Slider>
)

// Now use <ProgressBar /> somewhere
<ProgressBar
  isEnabled
  direction={Direction.HORIZONTAL}
  value={currentTime / currentSong.duration}
  onChange={value => seek(value * currentSong.duration)}
/>
```
</details>

<details>
<summary>Playback controls</summary>

```js
import Icon from 'some-icon-library'

const PlaybackControls = ({
  isPlaying,
  onPlaybackChange,
  hasPrevious,
  onPrevious,
  hasNext,
  onNext,
}) => (
  <div>
    <button disabled={!hasPrevious} onClick={onPrevious}>
      <Icon.Previous />
    </button>

    <button onClick={() => onPlaybackChange(!isPlaying)}>
      {isPlaying ? <Icon.Pause /> : <Icon.Play />}
    </button>

    <button disabled={!hasNext} onClick={onNext}>
      <Icon.Next />
    </button>
  </div>
)

// Use PlaybackControls in a player context
<PlaybackControls
  isPlaying={player.isPlaying}
  onPlaybackChange={isPlaying => player.setIsPlaying(isPlaying)}
  hasPrevious={songs.indexOf(currentSong) > 0}
  hasNext={songs.indexOf(currentSong) < songs.length - 1}
  onPrevious={player.setSong(songs[songs.indexOf(currentSong) - 1])}
  onNext={player.setSong(songs[songs.indexOf(currentSong) + 1])}
/>
```
</details>

<details>
<summary>Progress bar with buffer</summary>

```js
import { Direction, Slider } from 'react-player-controls'

const Bar = ({ style, children, ...props }) => (
  <div
    style={{
      height: 6,
      width: '100%',
      ...style,
    }}
  >
    {children}
  </div>
)

const ProgressBarWithBuffer = ({
  amountBuffered,
  ...props,
}) => (
  <Slider
    direction={Direction.HORIZONTAL}
    {...props}
  >
    {/* Background bar */}
    <Bar style={{ background: 'gray', width: '100%' }} />

    {/* Buffer bar */}
    <Bar style={{ background: 'silver', width: `${amountBuffered * 100}%` }} />

    {/* Playtime bar */}
    <Bar style={{ background: 'blue', width: `${100 * currentTime / duration}%` }} />
  </Slider>
)

// Use buffer bar somewhere
<ProgressBarWithBuffer
  amountBuffered={secondsBuffered / duration}
  {/* callback props etc */}
/>
```
</details>

<details>
<summary>Progress bar that shows the target time on hover</summary>

```js
import { Direction, FormattedTime, Slider } from 'react-player-controls'

// Create a basic bar that represents time
const TimeBar = ({ children }) => (
  <div
    style={{
      height: 6,
      width: '100%',
      background: 'gray',
    }}
  >
    {children}
  </div>
)

// Create a tooltip that will show the time
const TimeTooltip = ({ numSeconds, style = {} }) => (
  <div
    style={{
      display: 'inline-block',
      position: 'absolute',
      bottom: '100%',
      transform: 'translateX(-50%)',
      padding: 8,
      borderRadius: 3,
      background: 'darkblue',
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      lineHeight: 16,
      textAlign: 'center',
      ...style,
    }}
  >
    <FormattedTime numSeconds={numSeconds} />
  </div>
)

// Create a component to keep track of user interactions
class BarWithTimeOnHover extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      // This will be a normalised value between 0 and 1,
      // or null when not hovered
      hoverValue: null,
    }

    this.handleIntent = this.handleIntent.bind(this)
    this.handleIntentEnd = this.handleIntentEnd.bind(this)
  }

  handleIntent(value) {
    this.setState({
      hoverValue: value,
    })
  }

  handleIntentEnd() {
    // Note that this might not be invoked if the user ends
    // a control change with the mouse outside of the slider
    // element, so you might want to do this inside a
    // onChangeEnd callback too.
    this.setState({
      hoverValue: null,
    })
  }

  render() {
    const { duration } = this.props
    const { hoverValue } = this.state

    return (
      <Slider
        direction={Direction.HORIZONTAL}
        style={{
          position: 'relative',
        }}
        onIntent={this.handleIntent}
        onIntentEnd={this.handleIntentEnd}
      >
        <TimeBar />

        {hoverValue !== null && (
          <TimeTooltip
            numSeconds={hoverValue * duration}
            style={{
              left: `${hoverValue * 100}%`,
            }}
          />
        )}
      </Slider>
    )
  }
}

// Let's use it somewhere
<BarWithTimeOnHover duration={video.duration} />
```
</details>

<details>
<summary>Base CSS styles (as seen on the docs page)</summary>

```css
/* Root slider component */
.slider {
  position: relative;
}

.slider.is-horizontal {
  width: 200px;
  height: 8px;
}

.slider.is-vertical {
  width: 8px;
  height: 200px;
}

/* Bars – can be progress. value, buffer or whatever */
.bar {
  position: absolute;
  border-radius: 50%;
}

.bar.is-background {
  background: #878c88;
}

.bar.is-value {
  background: #72d687;
}

.bar.is-horizontal {
  top: 0;
  bottom: 0;
  left: 0;
  /* width: set dynamically in js */;
  height: 100%;
}

.bar.is-vertical {
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  /* height: set dynamically in js */;
}

/* Slider handle */
.handle {
  position: absolute;
  width: 16px;
  height: 16px;
  background: 'green';
  border-radius: 50%;
  transform: scale(1);
  transition: transform 0.2s;
}

.handle:hover {
  transform: scale(1.3);
}

.handle.is-horizontal {
  top: 0;
  /* left: set dynamically in js to x %; */
  margin-top: -4px;
  margin-left: -8px;
}

.handle.is-vertical {
  left: 0;
  /* bottom: set dynamically in js to x %; */
  margin-bottom: -8px;
  margin-left: -4px;
}
```
</details>


## Contribute

Contributions are very welcome, no matter your experience! Please submit a PR and we'll take it from there.
