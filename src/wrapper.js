const Store = require("./store")
const store = new Store()
const Wrap = require("./WrapComponent")(store)
const wrapper = function(key) {
  const tag = this
  return (props) => <Wrap original={props} tag={tag} tagName={key}></Wrap>
}

module.exports = (DOM) => Object.keys(DOM).reduce((r, key) => (r[key] = DOM[key]::wrapper(key), r), {})
exports.store = store