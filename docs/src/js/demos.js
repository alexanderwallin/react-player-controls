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

ReactDOM.render(<demos.PlayButton />, document.querySelector('.component-demo'))

