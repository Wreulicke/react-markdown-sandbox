import "babel-polyfill"
const React = require("react")
const ReactDOM = require("react-dom")
const processor = require("./processor")
class App extends React.Component {
  componentWillMount() {
    this.state = {
      text: `# Hello
dsajkl
dsakl;daskl;
dsa;lkdas
dsa;lkdsa
# Table of Contents
dsajkdjsaklj
# vvvv
Hi hellow project
sss
# @rhysd
## fffsakl;dsajkdjsaklj
# xxx
bbbb`
    }
  }
  onChange(ev) {
    this.setState({
      text: ev.target.value
    })
  }
  render() {
    return (<div>
      <textarea
      value={this.state.text}
      onChange={::this.onChange} />
      <div id='preview'>
        {processor.process(this.state.text).contents}
      </div>
    </div>)
  }
}
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})