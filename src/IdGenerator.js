
const generator = (function*() {
  let current = 0
  for (;;) yield ++current
}())

module.exports = generator