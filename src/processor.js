const unified = require("unified")
const markdown = require("remark-parse")
const toc = require("remark-toc")
const github = require("remark-github")
const remark2rehype = require("remark-rehype")
const has = require("has")
const toH = require("hast-to-hyperscript")
const React = require("react")
const ComponentWrapper = require("./ComponentWrapper")
const wrapper = Object.keys(React.DOM).reduce(
  (r, key) => ((r[key] = ComponentWrapper(key, React.DOM[key])), r),
  {}
)
const processor = unified()
  .use(markdown)
  .use(toc)
  .use(github, {
    repository: "https://github.com/rhysd/rehype-react",
  })
  .use(remark2rehype)
const parse = text => processor.parse(text)
const transform = ast => processor.run(ast)
const createElement = React.createElement

function compile(node) {
  if (node.type === "root") {
    if (node.children.length === 1 && node.children[0].type === "element") {
      return toH(h, node.children[0])
    } else {
      return toH(h, {
        type: "element",
        tagName: "div",
        properties: {},
        children: node.children,
      })
    }
  }
}

function h(name, props, children) {
  const component = has(wrapper, name) ? wrapper[name] : name
  return createElement(component, props, children)
}
module.exports = {
  parse,
  transform,
  h: compile,
}
