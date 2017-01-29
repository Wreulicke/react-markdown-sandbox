import "babel-polyfill"
const React = require("react")
const ReactDOM = require("react-dom")
const unified = require("unified")
const markdown = require("remark-parse")
const toc = require("remark-toc")
const github = require("remark-github")
const remark2rehype = require("remark-rehype")
const highlight = require("rehype-highlight")
const rehype2react = require("rehype-react")
const collector = require("./collector")

const processor = unified()
  .use(markdown, {
    commonmark: true,
    breaks: true
  })
  .use(toc)
  .use(github, {
    repository: "https://github.com/rhysd/rehype-react"
  })
  .use(collector)
  .use(remark2rehype, {
    commonmark: true,
  })
  .use(highlight)
  .use(rehype2react, {
    createElement: React.createElement
  })

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