const unified = require("unified")
const markdown = require("remark-parse")
const toc = require("remark-toc")
const github = require("remark-github")
const remark2rehype = require("remark-rehype")
const highlight = require("rehype-highlight")
const rehype2react = require("rehype-react")
const React = require("react")
const ComponentWrapper = require("./ComponentWrapper")
const wrapper = Object.keys(React.DOM).reduce(
  (r, key) => ((r[key] = ComponentWrapper(key, React.DOM[key])), r),
  {}
)

module.exports = unified()
  .use(markdown)
  .use(toc)
  .use(github, {
    repository: "https://github.com/rhysd/rehype-react",
  })
  .use(remark2rehype)
  .use(highlight)
  .use(rehype2react, {
    createElement: React.createElement,
    components: wrapper,
  })
