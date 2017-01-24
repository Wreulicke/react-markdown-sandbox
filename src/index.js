const React = require("react");
const ReactDOM = require("react-dom")
const unified = require("unified");
const markdown = require("remark-parse");
const toc = require("remark-toc");
const github = require("remark-github");
const remark2rehype = require("remark-rehype");
const highlight = require("rehype-highlight");
const rehype2react = require("rehype-react");

const processor = unified()
  .use(markdown)
  .use(toc)
  .use(github, {
    repository: "https://github.com/rhysd/rehype-react"
  })
  .use(remark2rehype)
  .use(highlight)
  .use(rehype2react, {
    createElement: React.createElement
  });

class App extends React.Component {
  componentWillMount() {
    this.state = {
      text: `# Hello
## Table of Contents
## @rhysd`
    };
  }
  onChange(ev) {
    this.setState({
      text: ev.target.value
    });
  }
  render() {
    return (<div>
      <textarea
      value={this.state.text}
      onChange={::this.onChange} />
      <div id='preview'>
        {processor.process(this.state.text).contents}
      </div>
    </div>);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
})