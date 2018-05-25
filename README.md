<h1 align="center">
  <img src="https://cdn.rawgit.com/alexanderwallin/react-player-controls/master/docs/img/logo-icon.svg" width="100" height="100" />
  <br />
  react-player-controls
  <br />
  &nbsp;
</h1>

[![npm version](https://badge.fury.io/js/react-player-controls.svg)](https://badge.fury.io/js/react-player-controls)
[![Build Status](https://travis-ci.org/alexanderwallin/react-player-controls.svg?branch=master)](https://travis-ci.org/alexanderwallin/react-player-controls)
![unstable](https://img.shields.io/badge/status-unstable-yellow.svg)
[![Dependencies](https://img.shields.io/david/alexanderwallin/react-player-controls.svg?style=flat-square)](https://david-dm.org/alexanderwallin/react-player-controls)
[![Dev dependency status](https://david-dm.org/alexanderwallin/react-player-controls/dev-status.svg?style=flat-square)](https://david-dm.org/alexanderwallin/react-player-controls#info=devDependencies)

This is a set of modular, tested and hopefully useful React components for composing media players. This library does not deal with actual media in any way, only the UI.

Check out the components in action on the [examples page](https://alexanderwallin.github.io/react-player-controls).

**A note on styles:** This library does not yet ship with any component styles. However, this is [on the way](https://github.com/alexanderwallin/react-player-controls/milestone/1). Meanwhile, you can check out [the styles from the examples page](https://github.com/alexanderwallin/react-player-controls/blob/master/docs/src/sass/_controls.scss) to get a kick start or just some inspiration in styling your player.

## Installation

```sh
npm i react-player-controls
```

## Usage

```js
// Import the components you need as ES2015 modules
import { PlayButton, PauseButton } from 'react-player-controls'
```

## Components

#### Playback and song changes

```jsx
// Play and pause
<PlayButton isEnabled={true} onClick={playHandler} />
<PauseButton onClick={pauseHandler} />

// Prev and next
<PrevButton onClick={prevHandler} isEnabled={currentSong > 0} />
<NextButton onClick={nextHandler} isEnabled={currentSong < numSongs.length - 1} />

// Wrapper for play, pause, prev and next
<PlaybackControls
  isPlayable={true}
  isPlaying={false}
  onPlaybackChange={setPlayback}
  showPrevious={true}
  hasPrevious={currentSong > 0}
  onPrevious={prevHandler}
  showNext={true}
  hasNext={currentSong < numSongs.length - 1}
  onNext={nextHandler}
/>
```

#### Progress and time

```jsx
// Simple time formatter
// Will render "3:24"
<FormattedTime numSeconds={204} />

// Progress bar and seek control
<ProgressBar
  totalTime={song.duration}
  currentTime={audioEl.currentTime}
  bufferTime={bufferTimeCalculatedSomehow}
  isSeekable={true}
  onSeek={seekTime => { /* f.i. update the time marker */}}
  onSeekStart={seekTime => { /* perhaps freeze a video frame? */ }}
  onSeekEnd={seekTime => { /* perform seek: */ audioEl.currentTime = seekTime }}
  onIntent={seekTime => { /* f.i. update intended time marker */}}
/>

// <TimeMarker /> composite component
//
// A time marker can be one of four types:
//
// - TimeMarkerType.ELAPSED
// - TimeMarkerType.REMAINING
// - TimeMarkerType.REMAINING_NEGATIVE
// - TimeMarkerType.DURATION

<TimeMarker
  totalTime={190}
  currentTime={65}
  markerSeparator=" / "
/>
// -> "1:05 / 3:10" (without wrapping <span /> elements)

<TimeMarker
  totalTime={190}
  currentTime={65}
  markerSeparator=" | "
  firstMarkerType={TimeMarkerType.ELAPSED}
  secondMarkerType={TimeMarkerType.REMANING_NEGATIVE}
/>
// -> "1:05 | -2:05" (without wrapping <span /> elements)
```

#### Volume controls

```jsx
// Buttons for sound on/off states
<SoundOnButton onClick={mute} />
<SoundOffButton onClick={unmute} />

// A composite mute toggle wrapper
<MuteToggleButton
  isMuted={isMuted}
  onMuteChange={handleMuteChange}
  isEnabled={somePredicate}
/>

// Volume slider
<VolumeSlider
  direction={ControlDirection.VERTICAL}
  volume={volumeBetweenZeroAndOne}
  onVolumeChange={handleVolumeChange}
  isEnabled={somePredicate}
/>
```

#### Custom Icons
Custom SVG icons can be passed as an 'icon' prop to all single element components.  Only one icon can be passed as a prop, so the PlayBackControls and MuteToggleButton components are not yet supported.
To use icons copy the 'path' in the SVG file to the template provided below, using the appropriate className and viewBox size.
```jsx
// Format for custom icons. Copy the SVG 'path' to the template below, and set the 'viewBox' to the size matching your SVG

// Note the classNames for the different components
// PlayIcon className="Icon PlayIcon"
// PasueIcon className="Icon PauseIcon"
// PrevIcon className="Icon PreviousIcon"
// NextIcon className="Icon NextIcon"
// VolumeIcon className="Icon SoundOnIcon"
// MuteIcon className="Icon SoundOffIcon"

export const CustomPlayIcon = () =>
  <svg className="Icon PlayIcon" viewBox="0 0 16 16">
    <g className="Icon-shape">
      <path d="M1,14c0,0.547,0.461,1,1,1c0.336,0,0.672-0.227,1-0.375L14.258,9C14.531,8.867,15,8.594,15,8s-0.469-0.867-0.742-1L3,1.375  C2.672,1.227,2.336,1,2,1C1.461,1,1,1.453,1,2V14z"/>
    </g>
  </svg>
  
export const CustomNextIcon = () =>
  <svg className="Icon NextIcon" viewBox="0 0 16 16">
    <g className="Icon-shape">
      <path d="M15.375,7L10,2.54C9.695,2.287,9.461,2,9,2C8.375,2,8,2.516,8,3v3H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h7v3  c0,0.484,0.375,1,1,1c0.461,0,0.695-0.287,1-0.54L15.375,9C15.758,8.688,16,8.445,16,8S15.758,7.313,15.375,7z"/>    
    </g>
  </svg>

// Passing the icon to a component (from wherever you keep icons file)
import { CustomPlayIcon, CustomNextIcon } from './icons'

// Custom PlayButton icon
<PlayButton 
  isEnabled={true} 
  onClick={playHandler}
  icon={<CustomPlayIcon/>} 
/>

// Custom NextButton icon
<NextButton
  isEnabled={this.state.isEnabled}
  onClick={() => alert('Go to next')} 
  icon={<CustomNextIcon/>}
/>
```

## Contribute
Contributors are welcome! Please make sure that tests pass locally before opening a PR.

#### Dev
```sh
npm run dev
```

#### Build
```sh
npm run build
```

#### Tests
```sh
npm run test
```
