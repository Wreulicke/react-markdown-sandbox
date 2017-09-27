const React = require("react")

const MenuItem = require("material-ui/MenuItem").default
const Drawer = require("material-ui/Drawer").default

class Menu extends React.Component {
  constructor() {
    super()
    this.state = { toggle: false }
  }
  render() {
    const menus = this.props.headings
      .map(head => {
        const text = head.children[0]
        if (text != null) {
          return {
            text: this.props.text.substring(
              text.position.start.offset,
              text.position.end.offset
            ),
          }
        }
        return { text: "No Name" }
      })
      .map((head, i) => <MenuItem key={`header-${i}`}>{head.text}</MenuItem>)
    return (
      <Drawer key="drawer" open={this.props.showingDrawer || this.state.toggle}>
        {menus}
      </Drawer>
    )
  }
}

export default Menu
