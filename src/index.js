import "babel-polyfill"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

const React = require("react")
const ReactDOM = require("react-dom")
const { parse, transform, h } = require("./processor")
const MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default
const mql = window.matchMedia("(min-width: 800px)")
const Menu = require("./Menu").default
const debounce = require("lodash.debounce")
const text = `
# Hello
dsajkl
dsakl;daskl;
dsa;lkdas
dsa;lkdsa
# Table of Contents
dsajkdjsaklj
# vvvv
Hi hellow project
sss
# @Wreulicke
## fffsakl;dsajkdjsaklj
# xxx
bbbb`
  .split("\n")
  .map(s => s.trim())
  .join("\n")
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text,
      showingDrawer: false,
    }
  }
  componentWillMount() {
    mql.addListener(() => this.mediaQueryChanged())
    this.setState({
      showingDrawer: mql.matches,
    })
  }
  mediaQueryChanged() {
    this.setState({
      showingDrawer: mql.matches,
    })
  }
  onChange = ev => {
    this.commitChange(ev.target.value)
  }
  commitChange = debounce(text => {
    this.setState({
      text,
    })
  }, 200)
  render() {
    const style = {
      transform: this.state.showingDrawer ? "translateX(256px)" : "",
      width: this.state.showingDrawer ? "calc(100% - 256px)" : "100%",
      display: "flex",
      justifyContent: "space-between",
      height: "100%",
    }
    const ast = parse(this.state.text)
    const headings = ast.children.filter(
      node => node.type === "heading" && node.depth === 1
    )
    return (
      <MuiThemeProvider>
        <div style={{ height: "100%" }}>
          <Menu
            showingDrawer={this.state.showingDrawer}
            headings={headings}
            text={this.state.text}
          />
          <div
            style={{
              transform: this.state.showingDrawer ? "translateX(256px)" : "",
              width: "30px",
              height: "30px",
              backgroundColor: "black",
            }}
            onClick={() =>
              this.setState({ showingDrawer: !this.state.showingDrawer })}
          />
          <div key="content" style={style}>
            <div style={{ width: "50%", margin: "4px" }}>
              <textarea
                key="editor"
                defaultValue={text}
                onChange={this.onChange}
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div style={{ width: "50%", margin: "4px" }}>
              <div id="preview">
                {h(transform(ast))}
              </div>
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
