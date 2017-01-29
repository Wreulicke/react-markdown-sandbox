
const unified = require("unified")
const markdown = require("remark-parse")
const toc = require("remark-toc")
const github = require("remark-github")
const remark2rehype = require("remark-rehype")
const highlight = require("rehype-highlight")
const rehype2react = require("rehype-react")
const collector = require("./collector")
const React = require("react")

module.exports = unified()
  .use(markdown)
  .use(toc)
  .use(github, {
    repository: "https://github.com/rhysd/rehype-react"
  })
  .use(collector)
  .use(remark2rehype)
  .use(highlight)
  .use(rehype2react, {
    createElement: React.createElement
  })