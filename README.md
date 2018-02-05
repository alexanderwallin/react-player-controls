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
