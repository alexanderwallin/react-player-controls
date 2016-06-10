# react-player-controls

Dump UI components for media players

## Components

#### Playback and song changes

```jsx
// Play and pause
<PlayButton isEnabled={true} onClick={playHandler} />
<PauseButton onClick={pauseHandler} />

// Play and pause wrapped in a PlaybackControls component
<PlaybackControls
  isPlayable={true}
  isPlaying={false}
  onPlaybackChange={setPlayback}
/>

// Prev and next
<PrevButton onClick={prevHandler} isEnabled={currentSong > 0} />
<NextButton onClick={nextHandler} isEnabled={currentSong < numSongs.length - 1} />
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
