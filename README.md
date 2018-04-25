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

This is a minimal set of modular, tested and hopefully useful React components for composing media player interfaces. It is designed for you to compose media player controls yourself using a small and easy-to-learn API.

From a library point of view, creating and providing components like `<Player />` or `<ProgressBar />` tends to result in abstractions with tons of props, often preventing arbitrary customisation, whilst providing little real value. These abstractions prove especially hindering when it comes to styling child elements. Therefor, instead of shipping these composite components, there are a collection of recipies that you can more or less copy-paste right into your project. Along with these plain components are a few boilerplate sets of styles in different forms that you can use if you want.

You can see the base components in action on the [examples page](https://alexanderwallin.github.io/react-player-controls).

⚠️  **NOTE:** This library does not deal with actual media in any way, only the UI. ⚠️


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

* [`<Button />`](#button-)
* [`Direction`](#direction)
* [`<FormattedTime />`](#formattedtime-)
* [`<PlayerIcon />`](#playericon-)
* [`<Slider />`](#slider-)

### `<Button />`

`<Button />` is basically a simple HTML `button`.

```js
<Button onClick={() => alert('clicked')}>
  Click me
</Button>
```

| Prop name | Default value | Description |
|-----------|---------------|-------------|
| `onClick` | - | **Required.** A callback function that is invoked when the button is clicked. |
| `isEnabled` | `true` | Whether the button is enabled. Setting this to `false` will set the `disabled` attribute on the `button` element to `true`. |
| `className` | `null` | A string to set as the HTML `class` attribute |
| `style` | `{}` | Styles to set on the `button` element. |
| `children` | `null` | Child elements. |

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

The `<Slider />` helps you build things like volume controls and progress bars. Slightly conterintuitively, **it does not take a `value` prop**, but expect you to keep track of this yourself, and then render whatever you want inside it.

*What this component actually does is that it renders an element inside itself, after its children, which listens to mouse events and invokes change and intent callbacks with relative, normalised values based on those events.*

```js
<Slider
  direction={Direction.HORIZONTAL}
  isEnabled
  onIntent={intent => console.log(`hovered at ${intent}`)}
  onChange={newValue => console.log(`clicked at ${newValue}`)}
  onChangeStart={startValue => console.log(`started dragging at ${startValue}`)}
  onChangeEnd={endValue => console.log(`stopped dragging at ${endValue}`)}
>
  {/* Here we render whatever we want */}
</Slider>
```

| Prop name | Default value | Description |
|-----------|---------------|-------------|
| `direction` | `Direction.HORIZONTAL` | The slider's direction |
| `isEnabled` | `true` | Whether the slider is interactable |
| `onIntent` | `() => {}` | A function that is invoked with the relative, normalised value at which the user is hovering. |
| `onChange` | `() => {}` | A function that is invoked with the latest relative, normalised value that the user has set by either clicking or dragging. |
| `onChangeStart` | `() => {}` | A function that is invoked with the relative, normalised value at which the user started changing the slider's value. |
| `onChangeEnd` | `() => {}` | A function that is invoked with the relative, normalised value at which the user stopped changing the slider's value. |
| `children` | `null` | Child elements. |
| `className` | `null` | A string to set as the HTML `class` attribute. |
| `style` | `{}` | Styles to set on the wrapping `div` element. |


## Recipies

...


## Contribute

Contributions are very welcome, no matter your experience! Please submit a PR and we'll take it from there.
