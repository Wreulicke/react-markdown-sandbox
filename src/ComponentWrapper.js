
const React = require("react")
const generator = require("./IdGenerator")
module.exports = (tagName, tag) => {
  const className = tagName.indexOf("h") == 0 ? "markdown-header" : ""
  class Wrap extends React.Component {
    componentWillMount() {
      this.state = {
        id: generator.next().value,
        show: true,
        hide: false,
      }
    }
    componentWillUpdate() {}
    render() {
      const {id} = this.state
      const props = {
        key: `content-${id}`,
        className: className,
        ...this.props
      }
      return <span className={this.state.id}>{tag(props)}</span>
    }
  }
  return Wrap
}