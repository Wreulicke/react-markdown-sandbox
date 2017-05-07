import "babel-polyfill"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

const React = require("react")
const ReactDOM = require("react-dom")
const processor = require("./processor")
const MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default
const mui = require("material-ui")
const mql = window.matchMedia("(min-width: 800px)")
class App extends React.Component {
  componentWillMount() {
    mql.addListener(() => this.mediaQueryChanged())
    const text = `# Hello
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
      .split("\n")
      .map(s => s.trim())
      .join("\n")
    this.state = {
      text,
      showingDrawer: mql.matches
    }
  }
  mediaQueryChanged() {
    this.setState({
      showingDrawer: mql.matches
    })
  }
  onChange(ev) {
    this.setState({
      text: ev.target.value
    })
  }
  render() {
    const style = {
      transform: this.state.showingDrawer ? "translateX(256px)" : ""
    }
    return (
      <MuiThemeProvider>
        <div>
          <mui.Drawer open={this.state.showingDrawer}>
            <mui.Menu>
              <mui.MenuItem>test</mui.MenuItem>
            </mui.Menu>
          </mui.Drawer>
          <div style={style}>
            <textarea
              value={this.state.text}
              onChange={::this.onChange}
              test=""
            />
            <div id="preview">
              {processor.process(this.state.text).contents}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})
