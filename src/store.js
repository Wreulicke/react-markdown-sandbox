
const emitter = require("eventemitter2")
class Store extends emitter.EventEmitter2 {
  set=[]
  constructor() {
    super()
    this.on("toggle", ::this.toggle)
  }
  isHeader =(tagName) => tagName.indexOf("h") === 0
  headerNumber = (tagName) => parseInt(tagName.slice(1), 10)
  toggle(id, tagName) {
    if (this.isHeader(tagName)) {
      const n = this.headerNumber(tagName)
      let flag = true
      const [header, ...others] = this.set
        .filter(([_id]) => _id >= id)
      if (header != null)
        header[1].setState({
          hide: !header[1].state.hide
        })
      if (others != null) others
          .filter((set) => {
            if (flag) {
              const tagName = set[2]
              if (this.isHeader(tagName) && this.headerNumber(tagName) <= n) {
                flag = false
              }
            }
            return flag
          }).forEach(([targetId, component]) => {
          if (targetId != id) component.setState({
              show: !component.state.show
            })
        })
    }
  }
  init() {
    this.set = []
  }
  bind(component, id, tagName) {
    this.set.push([id, component, tagName])
  }
}
module.exports = Store