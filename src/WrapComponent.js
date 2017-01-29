const Store = require("./store")
const store = new Store()
const React = require("react")
const generator = require("./IdGenerator")
class Wrap extends React.Component {
  componentWillMount() {
    this.state = {
      id: generator.next().value,
      show: true,
      hide: false,
    }
    if (this.isBlock(this.props.tagName)) store.bind(this, this.state.id, this.props.tagName)
  }
  componentWillUpdate() {
    if (this.isBlock(this.props.tagName)) store.bind(this, this.state.id, this.props.tagName)
  }
  isBlock(tagName) {
    if (tagName === "p") return true
    if (tagName === "div") return true
    if (tagName === "ul") return true
    if (tagName === "li") return true
    if (tagName.indexOf("h") === 0) return true
    return false
  }
  render() {
    const {tag, tagName, original} = this.props
    const {id, show} = this.state
    if (typeof original.children[0] === "string") {
      console.log(original.children[0])
    }
    const props = {
      key: `content-${id}`,
      onClick: tagName.indexOf("h") == 0 ? () => {
        store.emit("toggle", id, tagName)
      } : null,
      style: {
        backgroundColor: tagName.indexOf("h") != 0 ? "" : this.state.hide ? "#151313" : "#530d0d",
        display: show ? "" : "none"
      },
      ...original
    }
    return <span className={this.state.id}>{tag(props)}</span>
  }
}

module.exports = Wrap