# react-player-controls

Dumb but useful UI components for media players

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
  hasPrevious={currentSong > 0}
  onPrevious={prevHandler}
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
  onSeek={seekTime => audioEl.currentTime = seekTime}
/>

// <TimeMarker /> composite component

<TimeMarker
  totalTime={190}
  currentTime={65}
  markerSeparator=" / "
/>
// -> "1:05 of 3:10" (without wrapping <span /> elements)

<TimeMarker
  totalTime={190}
  currentTime={65}
  markerSeparator=" | "
  firstMarkerType={TimeMarkerType.ELAPSED}
  secondMarkerType={TimeMarkerType.LEFT_NEGATIVE}
/>
// -> "1:05 | -2:05" (without wrapping <span /> elements)
```

## Development

Build:

```sh
# One-time build
npm run build

# Continuous build
npm run dev
```

Run tests:

```sh
npm run test
```
