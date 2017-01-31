
const unified = require("unified")
const markdown = require("remark-parse")
const toc = require("remark-toc")
const github = require("remark-github")
const remark2rehype = require("remark-rehype")
const highlight = require("rehype-highlight")
const rehype2react = require("rehype-react")
const {collector} = require("./collector")
const Collector = collector.Collector
const React = require("react")
const Immutable = require("immutable")
let map = Immutable.List.of()
let head = -1
const descriptor = (parent) => {
  parent.children.forEach((node) => {
    if (node.type == "heading") {
      head++
      map = map.push(Immutable.List.of(node))
    } else
      map = map.insert(head, map.get(head).push(node))
  })
}
module.exports = unified()
  .use(markdown)
  .use(toc)
  .use(github, {
    repository: "https://github.com/rhysd/rehype-react"
  })
  .use(collector, {
    collector: new Collector((node) => {
      descriptor(node)
      console.log(map.toJS())
    })
  })
  .use(remark2rehype)
  .use(highlight)
  .use(rehype2react, {
    createElement: React.createElement
  })