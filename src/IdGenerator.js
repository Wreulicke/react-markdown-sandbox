const g = function*() {
  let current = 0
  for (;;)
    yield ++current
}
const generator = g()

module.exports = generator
